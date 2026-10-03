(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    const englishUrl = new URL(canonical?.href || window.location.href.split('?')[0]);
    englishUrl.search = '';
    englishUrl.hash = '';
    if (englishUrl.pathname.endsWith('/index.html')) englishUrl.pathname = englishUrl.pathname.slice(0, -'index.html'.length);
    const pageUrl = englishUrl.href;
    if (canonical) canonical.href = pageUrl;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = pageUrl;
    const reviewedSwahili = document.querySelector('link[rel="alternate"][hreflang="sw"][data-reviewed-translation="true"]');
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    [
        ['en', englishUrl.href],
        ['x-default', englishUrl.href]
    ].forEach(([language, href]) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = language;
        link.href = href;
        document.head.append(link);
    });
    if (reviewedSwahili) {
        const swahiliHref = new URL(reviewedSwahili.href, englishUrl);
        if (swahiliHref.origin === englishUrl.origin && swahiliHref.href !== englishUrl.href) {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = 'sw';
            link.href = swahiliHref.href;
            link.dataset.reviewedTranslation = 'true';
            document.head.append(link);
        } else {
            console.error('Reviewed Swahili SEO alternate must use a distinct URL on the canonical site origin.');
        }
    }

    const home = { name: 'Home', url: 'https://pelanoresources.co.tz/' };
    const currentName = document.querySelector('main h1, #main-content h1, .page-header h1')?.textContent.trim() || document.title;
    if (!/^(home|pelano resources ltd - mafinga)/i.test(currentName)) {
        const breadcrumb = document.createElement('nav');
        breadcrumb.className = 'seo-breadcrumb container';
        breadcrumb.setAttribute('aria-label', 'Breadcrumb');
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.textContent = home.name;
        const separator = document.createElement('span');
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = ' / ';
        const current = document.createElement('span');
        current.setAttribute('aria-current', 'page');
        current.textContent = currentName;
        breadcrumb.append(homeLink, separator, current);
        document.querySelector('.navbar')?.after(breadcrumb);

        const schema = document.createElement('script');
        schema.id = 'breadcrumb-schema';
        schema.type = 'application/ld+json';
        schema.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: home.name, item: home.url },
                { '@type': 'ListItem', position: 2, name: currentName, item: pageUrl }
            ]
        });
        document.head.append(schema);
    }
})();
