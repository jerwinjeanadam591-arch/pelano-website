const baseUrl = new URL(process.env.PELANO_SITE_URL || 'https://pelanoresources.co.tz');
if (baseUrl.protocol !== 'https:') throw new Error('Live site checks require an HTTPS base URL.');

const siteOrigin = baseUrl.origin;
const failures = [];
const responses = new Map();
const excludedPath = /\/(?:admin|clear-storage|test-mobile-viewport|test-overflow)\.html$/i;
const get = async (url, method = 'GET') => {
    const cacheKey = `${method}:${url.href}`;
    if (responses.has(cacheKey)) return responses.get(cacheKey);
    const response = await fetch(url, {
        method,
        redirect: 'follow',
        signal: AbortSignal.timeout(20000),
        headers: { 'User-Agent': 'PelanoSiteQuality/1.0 (+https://pelanoresources.co.tz)' }
    });
    if (new URL(response.url).origin !== siteOrigin) {
        throw new Error(`Request redirected outside the monitored site to ${new URL(response.url).origin}.`);
    }
    responses.set(cacheKey, response);
    return response;
};

async function main() {
    const sitemapUrl = new URL('/sitemap.xml', baseUrl);
    const sitemapResponse = await get(sitemapUrl);
    if (!sitemapResponse.ok) throw new Error(`Live sitemap returned HTTP ${sitemapResponse.status}.`);
    const sitemap = await sitemapResponse.text();
    const pageUrls = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)]
        .map(([, value]) => value.replace(/&amp;/g, '&').trim())
        .map(value => new URL(value, baseUrl))
        .filter(url => url.origin === siteOrigin && !excludedPath.test(url.pathname))
        .map(url => url.href))];
    if (!pageUrls.length) throw new Error('Live sitemap contains no same-origin public pages.');
    if (pageUrls.length > 500) throw new Error(`Live sitemap has an unexpected ${pageUrls.length} pages; cap is 500.`);

    const documents = new Map();
    let nextIndex = 0;
    await Promise.all(Array.from({ length: Math.min(6, pageUrls.length) }, async () => {
        while (nextIndex < pageUrls.length) {
            const pageUrl = new URL(pageUrls[nextIndex++]);
            try {
                const response = await get(pageUrl);
                if (!response.ok) {
                    failures.push(`${pageUrl.href}: HTTP ${response.status}`);
                    continue;
                }
                const contentType = response.headers.get('content-type') || '';
                if (!contentType.includes('text/html')) {
                    failures.push(`${pageUrl.href}: expected text/html, got ${contentType || 'unknown content type'}`);
                    continue;
                }
                documents.set(pageUrl.href, await response.text());
            } catch (error) {
                failures.push(`${pageUrl.href}: ${error.message}`);
            }
        }
    }));

    const links = new Map();
    for (const [source, html] of documents) {
        for (const [, rawUrl] of html.matchAll(/\b(?:href|src)=["']([^"'#]+(?:#[^"']*)?|#[^"']*)["']/gi)) {
            if (/^(?:mailto:|tel:|javascript:|data:|blob:|https?:|\/\/)/i.test(rawUrl)) continue;
            let target;
            try {
                target = new URL(rawUrl.replace(/&amp;/g, '&'), source);
            } catch {
                failures.push(`${source}: invalid local URL "${rawUrl}"`);
                continue;
            }
            if (target.origin !== siteOrigin || excludedPath.test(target.pathname)) continue;
            target.hash = '';
            links.set(target.href, { url: target, source, fragment: new URL(rawUrl, source).hash.slice(1) });
        }
    }

    const destinations = [...links.values()];
    nextIndex = 0;
    await Promise.all(Array.from({ length: Math.min(6, destinations.length) }, async () => {
        while (nextIndex < destinations.length) {
            const { url, source, fragment } = destinations[nextIndex++];
            try {
                const method = url.pathname.endsWith('.html') || url.pathname === '/' ? 'GET' : 'HEAD';
                let response;
                try {
                    response = await get(url, method);
                } catch (error) {
                    if (method !== 'HEAD') throw error;
                    response = await get(url, 'GET');
                }
                if (method === 'HEAD' && !response.ok) response = await get(url, 'GET');
                if (!response.ok) {
                    failures.push(`${source}: ${url.href} returned HTTP ${response.status}`);
                    continue;
                }
                if (fragment && (url.pathname.endsWith('.html') || url.pathname === '/')) {
                    const html = documents.get(url.href) || await response.text();
                    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    if (!new RegExp(`(?:id|name)=["']${escaped}["']`, 'i').test(html)) {
                        failures.push(`${source}: ${url.href} is missing #${fragment}`);
                    }
                }
            } catch (error) {
                failures.push(`${source}: ${url.href} failed (${error.message})`);
            }
        }
    }));

    if (failures.length) {
        console.error(`Live scan found ${failures.length} issue(s):\n${failures.join('\n')}`);
        process.exitCode = 1;
    } else {
        console.log(`Live scan checked ${pageUrls.length} sitemap pages and ${destinations.length} same-origin links/assets.`);
    }
}

main().catch(error => {
    console.error('Live site check failed:', error.message);
    process.exitCode = 1;
});
