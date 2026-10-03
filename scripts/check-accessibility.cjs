const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const excluded = new Set(['admin.html', 'clear-storage.html', 'test-mobile-viewport.html', 'test-overflow.html']);
const skippedDirectories = new Set(['images', 'css', 'js', 'supabase', 'scripts', '.github']);
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) return skippedDirectories.has(entry.name) ? [] : walk(path.join(directory, entry.name));
    return entry.name.endsWith('.html') && !excluded.has(entry.name) ? [path.join(directory, entry.name)] : [];
});
const failures = [];
const stripMarkup = value => value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ').replace(/\s+/g, ' ').trim();

for (const filename of walk(root)) {
    const relative = path.relative(root, filename).split(path.sep).join('/');
    const html = fs.readFileSync(filename, 'utf8');
    const staticHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    const ids = new Set();
    const labels = new Set();
    const wrappedControls = new Set();
    const headings = [];

    for (const [, id] of staticHtml.matchAll(/\bid=["']([^"']+)["']/gi)) {
        if (ids.has(id)) failures.push(`${relative}: duplicate id "${id}"`);
        ids.add(id);
    }
    for (const [, id] of html.matchAll(/<label\b[^>]*\bfor=["']([^"']+)["']/gi)) labels.add(id);
    for (const [, content] of html.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/gi)) {
        for (const [, id] of content.matchAll(/<(?:input|select|textarea)\b[^>]*\bid=["']([^"']+)["']/gi)) wrappedControls.add(id);
    }
    for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
        if (!/\balt=["'][^"']*["']/i.test(tag)) failures.push(`${relative}: image is missing an alt attribute`);
    }
    for (const [tag, content] of html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)) {
        const attributes = tag.slice(0, tag.indexOf('>'));
        if (!/\baria-label=["'][^"']+["']/i.test(attributes) && !/\baria-labelledby=["'][^"']+["']/i.test(attributes) && !stripMarkup(content)) {
            failures.push(`${relative}: button has no accessible name`);
        }
    }
    for (const [tag] of html.matchAll(/<(?:input|select|textarea)\b[^>]*>/gi)) {
        if (/\btype=["']hidden["']/i.test(tag)) continue;
        const id = tag.match(/\bid=["']([^"']+)["']/i)?.[1];
        if (!/\baria-label=["'][^"']+["']/i.test(tag) && !/\baria-labelledby=["'][^"']+["']/i.test(tag) &&
            (!id || (!labels.has(id) && !wrappedControls.has(id)))) {
            failures.push(`${relative}: form control${id ? ` "${id}"` : ''} has no associated label`);
        }
    }
    for (const [tag, content] of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
        const attributes = tag.slice(0, tag.indexOf('>'));
        if (!/\baria-label=["'][^"']+["']/i.test(attributes) && !/\baria-labelledby=["'][^"']+["']/i.test(attributes) &&
            !stripMarkup(content) && !/<img\b[^>]*\balt=["'][^"']+["']/i.test(content)) {
            failures.push(`${relative}: link has no accessible name`);
        }
    }
    for (const [, level] of staticHtml.matchAll(/<h([1-6])\b[^>]*>/gi)) headings.push(Number(level));
    const h1Count = headings.filter(level => level === 1).length;
    if (h1Count !== 1) failures.push(`${relative}: expected one page-level h1, found ${h1Count}`);
    for (let index = 1; index < headings.length; index += 1) {
        if (headings[index] > headings[index - 1] + 1) {
            failures.push(`${relative}: heading level jumps from h${headings[index - 1]} to h${headings[index]}`);
            break;
        }
    }
}

if (failures.length) {
    console.error(`Found ${failures.length} accessibility issue(s):\n${failures.join('\n')}`);
    process.exitCode = 1;
} else {
    console.log(`Checked accessible names, image alternatives, IDs and heading outlines in ${walk(root).length} public HTML pages.`);
}
