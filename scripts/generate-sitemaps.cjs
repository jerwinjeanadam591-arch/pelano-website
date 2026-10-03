const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const baseUrl = 'https://pelanoresources.co.tz';
const excluded = new Set(['admin.html', 'clear-storage.html', 'test-mobile-viewport.html', 'test-overflow.html', 'blog-detail.html', 'newsletter-confirm.html']);
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) {
        return ['images', 'css', 'js', 'supabase', 'scripts'].includes(entry.name) ? [] : walk(path.join(directory, entry.name));
    }
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute).split(path.sep).join('/');
    return entry.name.endsWith('.html') && !excluded.has(entry.name) ? [relative] : [];
});

async function main() {
const pages = walk(root);
const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const files = new Map(pages.map(file => [file, fs.readFileSync(path.join(root, file), 'utf8')]));

const sitemapEntries = pages.map(file => {
    const html = files.get(file);
    const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]
        || html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1];
    const location = file === 'index.html' ? `${baseUrl}/` : canonical || `${baseUrl}/${file}`;
    return `<url><loc>${escapeXml(location)}</loc></url>`;
});
const articleUrls = new Set();
for (const html of files.values()) {
    for (const [, href] of html.matchAll(/\bhref=["']([^"']*blog-detail\.html\?[^"']+)["']/gi)) {
        const normalizedHref = href.replace(/&amp;/g, '&');
        let articleUrl;
        try {
            articleUrl = new URL(normalizedHref, `${baseUrl}/`);
        } catch {
            continue;
        }
        if (articleUrl.origin !== baseUrl || (!articleUrl.searchParams.has('slug') && !articleUrl.searchParams.has('id'))) continue;
        articleUrls.add(articleUrl.href);
    }
}
const blogSourcePath = path.join(root, 'js', 'blog.js');
if (fs.existsSync(blogSourcePath)) {
    const blogSource = fs.readFileSync(blogSourcePath, 'utf8');
    for (const [, slug] of blogSource.matchAll(/\bslug:\s*['"]([a-z0-9-]+)['"]/gi)) {
        articleUrls.add(new URL(`blog-detail.html?slug=${encodeURIComponent(slug)}`, `${baseUrl}/`).href);
    }
}
const supabaseUrl = process.env.PELANO_SUPABASE_URL;
const supabaseAnonKey = process.env.PELANO_SUPABASE_ANON_KEY;
let managedArticleCount = 0;
if (supabaseUrl || supabaseAnonKey) {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Set both PELANO_SUPABASE_URL and PELANO_SUPABASE_ANON_KEY to include managed articles.');
    }
    const projectUrl = new URL(supabaseUrl);
    if (!['http:', 'https:'].includes(projectUrl.protocol)) throw new Error('The Supabase sitemap URL must use HTTP or HTTPS.');
    const response = await fetch(`${projectUrl.origin}/rest/v1/cms_posts?select=slug&status=eq.published`, {
        headers: { apikey: supabaseAnonKey, authorization: `Bearer ${supabaseAnonKey}` }
    });
    if (!response.ok) throw new Error(`Supabase sitemap query failed with HTTP ${response.status}.`);
    const managedPosts = await response.json();
    if (!Array.isArray(managedPosts)) throw new Error('Supabase sitemap query did not return a post list.');
    for (const post of managedPosts) {
        if (!post || typeof post.slug !== 'string' || !/^[a-z0-9-]+$/.test(post.slug)) {
            throw new Error('Supabase returned a published post with an invalid slug.');
        }
        articleUrls.add(new URL(`blog-detail.html?slug=${encodeURIComponent(post.slug)}`, `${baseUrl}/`).href);
    }
    managedArticleCount = managedPosts.length;
}
for (const articleUrl of articleUrls) sitemapEntries.push(`<url><loc>${escapeXml(articleUrl)}</loc></url>`);

const imageEntries = [];
const videoEntries = [];
for (const [file, html] of files) {
    const pageUrl = file === 'index.html' ? `${baseUrl}/` : `${baseUrl}/${file}`;
    const pageImages = new Set();
    for (const [tag] of html.matchAll(/<(?:img|source)\b[^>]*>/gi)) {
        const attributes = [...tag.matchAll(/\b(src|srcset)=["']([^"']+)["']/gi)];
        for (const [, attribute, value] of attributes) {
            const candidates = attribute.toLowerCase() === 'srcset'
                ? value.split(',').map(candidate => candidate.trim().split(/\s+/)[0])
                : [value];
            for (const candidate of candidates) {
                if (!candidate || /^(https?:|data:|\/\/)/i.test(candidate)) continue;
                const local = path.resolve(root, candidate.split('?')[0].replace(/^\//, ''));
                if (!local.startsWith(`${root}${path.sep}`) || !fs.existsSync(local)) continue;
                pageImages.add(new URL(candidate, `${baseUrl}/`).href);
            }
        }
    }
    if (pageImages.size) {
        const imageXml = [...pageImages].map(imageUrl => `<image:image><image:loc>${escapeXml(imageUrl)}</image:loc></image:image>`).join('');
        imageEntries.push(`<url><loc>${escapeXml(pageUrl)}</loc>${imageXml}</url>`);
    }
    for (const match of html.matchAll(/<video\b([^>]*)>([\s\S]*?)<\/video>/gi)) {
        const video = match[1] + match[2];
        const contentUrl = video.match(/<source\b[^>]*src=["']([^"']+\.mp4(?:\?[^"']*)?)/i)?.[1];
        const thumbnail = video.match(/poster=["']([^"']+)/i)?.[1];
        const title = video.match(/title=["']([^"']+)/i)?.[1] || path.basename(contentUrl || 'Pelano Resources video');
        if (!contentUrl || !thumbnail) continue;
        videoEntries.push(`<url><loc>${escapeXml(pageUrl)}</loc><video:video><video:thumbnail_loc>${escapeXml(new URL(thumbnail, baseUrl).href)}</video:thumbnail_loc><video:title>${escapeXml(title)}</video:title><video:content_loc>${escapeXml(new URL(contentUrl, baseUrl).href)}</video:content_loc></video:video></url>`);
    }
}

fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(root, 'image-sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${imageEntries.join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(root, 'video-sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${videoEntries.join('\n')}\n</urlset>\n`);
console.log(`Generated ${sitemapEntries.length} page entries (${articleUrls.size} articles; ${managedArticleCount} from CMS), ${imageEntries.length} image entries and ${videoEntries.length} video entries.`);
}

main().catch(error => {
    console.error('Sitemap generation failed:', error.message);
    process.exitCode = 1;
});
