const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const baseUrl = 'https://pelanoresources.co.tz';
const excluded = new Set(['admin.html', 'clear-storage.html', 'test-mobile-viewport.html', 'test-overflow.html', 'newsletter-confirm.html']);
const skippedDirectories = new Set(['images', 'css', 'js', 'supabase', 'scripts', '.github']);
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) return skippedDirectories.has(entry.name) ? [] : walk(path.join(directory, entry.name));
    const relative = path.relative(root, path.join(directory, entry.name)).split(path.sep).join('/');
    return entry.name.endsWith('.html') && !excluded.has(path.basename(relative)) ? [relative] : [];
});
async function main() {
const pages = walk(root);
const failures = [];
const readMeta = (html, name, attribute = 'name') => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = html.match(new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${escaped}["'])[^>]*\\bcontent=["']([^"']*)["'][^>]*>`, 'i'));
    return match?.[1] || '';
};

for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const expectedUrl = page === 'index.html' ? `${baseUrl}/` : `${baseUrl}/${page}`;
    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim();
    const description = readMeta(html, 'description');
    const canonical = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1]
        || html.match(/<link\b(?=[^>]*\bhref=["'][^"']+["'])[^>]*\brel=["']canonical["'][^>]*>/i)?.[0]?.match(/\bhref=["']([^"']+)/i)?.[1]
        || '';
    const ogTitle = readMeta(html, 'og:title', 'property');
    const ogDescription = readMeta(html, 'og:description', 'property');
    const ogImage = readMeta(html, 'og:image', 'property');
    const ogUrl = readMeta(html, 'og:url', 'property');

    for (const [label, value] of Object.entries({ title, description, canonical, 'Open Graph title': ogTitle, 'Open Graph description': ogDescription, 'Open Graph image': ogImage, 'Open Graph URL': ogUrl })) {
        if (!value) failures.push(`${page}: missing ${label}`);
    }
    if (canonical && canonical !== expectedUrl) failures.push(`${page}: canonical should be ${expectedUrl}, found ${canonical}`);
    if (canonical && /index\.html(?:$|[?#])/i.test(canonical)) failures.push(`${page}: canonical contains unnecessary index.html`);
    if (ogUrl && ogUrl !== expectedUrl) failures.push(`${page}: Open Graph URL should be ${expectedUrl}, found ${ogUrl}`);

    for (const schema of html.matchAll(/<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)) {
        try {
            JSON.parse(schema[1].trim());
        } catch {
            failures.push(`${page}: invalid JSON-LD`);
        }
    }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const page of pages) {
    const expectedUrl = page === 'index.html' ? `${baseUrl}/` : `${baseUrl}/${page}`;
    if (page !== 'blog-detail.html' && !sitemap.includes(`<loc>${expectedUrl}</loc>`)) failures.push(`sitemap.xml: missing ${expectedUrl}`);
}
for (const html of pages.map(page => fs.readFileSync(path.join(root, page), 'utf8'))) {
    for (const [, href] of html.matchAll(/\bhref=["']([^"']*blog-detail\.html\?[^"']+)["']/gi)) {
        const normalizedHref = href.replace(/&amp;/g, '&');
        try {
            const articleUrl = new URL(normalizedHref, `${baseUrl}/`);
            if (articleUrl.origin === baseUrl && (articleUrl.searchParams.has('slug') || articleUrl.searchParams.has('id'))
                && !sitemap.includes(`<loc>${articleUrl.href}</loc>`)) {
                failures.push(`sitemap.xml: missing article URL ${articleUrl.href}`);
            }
        } catch {
            failures.push(`invalid blog article link in sitemap source: ${href}`);
        }
    }
    }
    const blogSourcePath = path.join(root, 'js', 'blog.js');
    if (fs.existsSync(blogSourcePath)) {
        const blogSource = fs.readFileSync(blogSourcePath, 'utf8');
        for (const [, slug] of blogSource.matchAll(/\bslug:\s*['"]([a-z0-9-]+)['"]/gi)) {
            const articleUrl = new URL(`blog-detail.html?slug=${encodeURIComponent(slug)}`, `${baseUrl}/`).href;
            if (!sitemap.includes(`<loc>${articleUrl}</loc>`)) failures.push(`sitemap.xml: missing article URL ${articleUrl}`);
        }
    }
    const supabaseUrl = process.env.PELANO_SUPABASE_URL;
    const supabaseAnonKey = process.env.PELANO_SUPABASE_ANON_KEY;
    if (supabaseUrl || supabaseAnonKey) {
        if (!supabaseUrl || !supabaseAnonKey) throw new Error('Set both PELANO_SUPABASE_URL and PELANO_SUPABASE_ANON_KEY to verify managed article URLs.');
        const projectUrl = new URL(supabaseUrl);
        if (!['http:', 'https:'].includes(projectUrl.protocol)) throw new Error('The Supabase sitemap URL must use HTTP or HTTPS.');
        const response = await fetch(`${projectUrl.origin}/rest/v1/cms_posts?select=slug&status=eq.published`, {
            headers: { apikey: supabaseAnonKey, authorization: `Bearer ${supabaseAnonKey}` }
        });
        if (!response.ok) throw new Error(`Supabase SEO check failed with HTTP ${response.status}.`);
        const managedPosts = await response.json();
        if (!Array.isArray(managedPosts)) throw new Error('Supabase SEO query did not return a post list.');
        for (const post of managedPosts) {
            if (!post || typeof post.slug !== 'string' || !/^[a-z0-9-]+$/.test(post.slug)) {
                throw new Error('Supabase returned a published post with an invalid slug.');
            }
            const articleUrl = new URL(`blog-detail.html?slug=${encodeURIComponent(post.slug)}`, `${baseUrl}/`).href;
            if (!sitemap.includes(`<loc>${articleUrl}</loc>`)) failures.push(`sitemap.xml: missing managed article URL ${articleUrl}`);
        }
    }

if (failures.length) {
    console.error(`Found ${failures.length} SEO issue(s):\n${failures.join('\n')}`);
    process.exitCode = 1;
} else {
    console.log(`Checked metadata, canonical URLs, JSON-LD and sitemap coverage for ${pages.length} public pages.`);
}
}

main().catch(error => {
    console.error('SEO check failed:', error.message);
    process.exitCode = 1;
});
