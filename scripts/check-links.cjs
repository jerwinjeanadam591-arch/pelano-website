const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const ignored = new Set(['admin.html', 'clear-storage.html', 'test-mobile-viewport.html', 'test-overflow.html']);
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) return entry.name === 'images' || entry.name === 'css' || entry.name === 'js' || entry.name === 'supabase' || entry.name === 'scripts' ? [] : walk(path.join(directory, entry.name));
    return entry.name.endsWith('.html') ? [path.join(directory, entry.name)] : [];
});
const pages = walk(root).filter(file => !ignored.has(path.basename(file)));
const htmlByPath = new Map(pages.map(file => [file, fs.readFileSync(file, 'utf8')]));
const failures = [];
const decodeEntities = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");

for (const [page, html] of htmlByPath) {
    const references = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)];
    for (const [, reference] of references) {
        if (reference.includes('${')) continue;
        if (!reference || /^(?:https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(reference)) continue;
        const decodedReference = decodeEntities(reference);
        const [pathAndQuery, fragment] = decodedReference.split('#');
        const pathname = pathAndQuery.split('?')[0];
        if (!pathname) {
            if (fragment && !new RegExp(`(?:id|name)=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(html)) {
                failures.push(`${path.relative(root, page)}: missing #${fragment}`);
            }
            continue;
        }
        let decoded;
        try { decoded = decodeURIComponent(pathname); } catch { decoded = pathname; }
        const target = path.resolve(path.dirname(page), decoded.replace(/^\//, ''));
        if (!target.startsWith(root) || !fs.existsSync(target)) {
            failures.push(`${path.relative(root, page)}: missing ${reference}`);
            continue;
        }
        if (fragment && target.endsWith('.html')) {
            const targetHtml = htmlByPath.get(target) || fs.readFileSync(target, 'utf8');
            if (!new RegExp(`(?:id|name)=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(targetHtml)) {
                failures.push(`${path.relative(root, page)}: missing ${reference}`);
            }
        }
    }
}

if (failures.length) {
    console.error(`Found ${failures.length} broken local link(s):\n${failures.join('\n')}`);
    process.exitCode = 1;
} else {
    console.log(`Checked ${pages.length} HTML pages. No broken local links or anchors.`);
}
