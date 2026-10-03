(() => {
    if (!('PerformanceObserver' in window)) return;
    const metrics = { lcp: 0, cls: 0, inp: 0 };
    const supported = PerformanceObserver.supportedEntryTypes || [];
    const observers = [];

    const observe = (type, callback) => {
        if (!supported.includes(type)) return;
        const observer = new PerformanceObserver(list => list.getEntries().forEach(callback));
        observer.observe({ type, buffered: true });
        observers.push(observer);
    };

    observe('largest-contentful-paint', entry => { metrics.lcp = entry.startTime; });
    observe('layout-shift', entry => {
        if (!entry.hadRecentInput) metrics.cls += entry.value;
    });
    observe('event', entry => {
        if (entry.interactionId) metrics.inp = Math.max(metrics.inp, entry.duration);
    });

    let reported = false;
    const report = () => {
        if (reported) return;
        reported = true;
        const navigation = performance.getEntriesByType('navigation')[0];
        const payload = {
            ...metrics,
            ttfb: navigation ? Math.round(navigation.responseStart - navigation.requestStart) : 0,
            page_path: location.pathname
        };
        if (window.PelanoAnalytics?.hasConsent()) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'pelano_web_vitals', ...payload });
        }
        window.dispatchEvent(new CustomEvent('pelano:webvitals', { detail: payload }));
        observers.forEach(observer => observer.disconnect());
    };

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') report();
    }, { once: true });
    window.addEventListener('pagehide', report, { once: true });
})();
