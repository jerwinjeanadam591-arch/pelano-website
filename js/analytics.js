(() => {
    window.PelanoAnalyticsConfig = window.PelanoAnalyticsConfig || Object.freeze({
        measurementId: ''
    });
    const config = window.PelanoAnalyticsConfig;
    const configuredMeasurementId = typeof config.measurementId === 'string'
        ? config.measurementId.trim()
        : '';
    const measurementId = /^G-[A-Z0-9]{6,20}$/i.test(configuredMeasurementId)
        && !/(?:TEST|EXAMPLE|PLACEHOLDER|X{4,})/i.test(configuredMeasurementId)
        ? configuredMeasurementId
        : '';
    const consentKey = 'pelano-analytics-consent';
    let measurementLoaded = false;

    const getConsent = () => {
        try {
            return localStorage.getItem(consentKey) || 'unknown';
        } catch (error) {
            console.error('Analytics consent could not be read from browser storage.', error);
            return 'unknown';
        }
    };

    const updateProviderConsent = consent => {
        if (typeof window.gtag !== 'function') return;
        window.gtag('consent', 'update', {
            analytics_storage: consent === 'granted' ? 'granted' : 'denied'
        });
    };

    const loadMeasurement = () => {
        if (!measurementId || measurementLoaded) return;
        measurementLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function gtag() {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('consent', 'default', { analytics_storage: 'denied' });
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        window.gtag('config', measurementId, {
            anonymize_ip: true,
            allow_google_signals: false
        });

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        script.onerror = () => {
            measurementLoaded = false;
            console.error('Google Analytics failed to load after analytics consent was granted.');
        };
        document.head.append(script);
    };

    const consentNotice = () => {
        let notice = document.getElementById('analytics-consent-notice');
        if (notice) return notice;
        notice = document.createElement('aside');
        notice.id = 'analytics-consent-notice';
        notice.className = 'analytics-consent-notice';
        notice.setAttribute('role', 'region');
        notice.setAttribute('aria-label', 'Analytics privacy choices');
        notice.innerHTML = [
            '<p>Allow optional Google Analytics to help us understand site visits and improve the website? Enquiry details are never included.</p>',
            '<div class="analytics-consent-actions">',
            '<button type="button" data-analytics-consent="denied">Reject analytics</button>',
            '<button type="button" data-analytics-consent="granted">Allow analytics</button>',
            '</div>'
        ].join('');
        notice.addEventListener('click', event => {
            const button = event.target instanceof Element
                ? event.target.closest('[data-analytics-consent]')
                : null;
            if (!button) return;
            setConsent(button.dataset.analyticsConsent);
        });
        document.body.append(notice);
        return notice;
    };

    const setConsent = consent => {
        if (!['granted', 'denied'].includes(consent)) return;
        try {
            localStorage.setItem(consentKey, consent);
        } catch (error) {
            console.error('Analytics consent could not be saved to browser storage.', error);
        }
        const notice = document.getElementById('analytics-consent-notice');
        if (notice) notice.hidden = true;
        updateProviderConsent(consent);
        if (consent === 'granted') loadMeasurement();
    };

    const safeParameters = parameters => {
        const safe = {};
        const allowed = new Set(['channel', 'product_id', 'form', 'asset_name', 'content_slug', 'region']);
        Object.entries(parameters || {}).forEach(([key, value]) => {
            if (!allowed.has(key) || typeof value !== 'string') return;
            const normalized = value.trim().slice(0, 80);
            if (/^[\w./-]+$/.test(normalized)) safe[key] = normalized;
        });
        return safe;
    };

    window.PelanoAnalytics = Object.freeze({
        isConfigured: Boolean(measurementId),
        hasConsent: () => getConsent() === 'granted',
        track(event, parameters = {}) {
            if (!measurementId || getConsent() !== 'granted' || !/^[a-z][a-z0-9_]{1,39}$/.test(event)) return false;
            const payload = {
                event,
                page_path: window.location.pathname,
                ...safeParameters(parameters)
            };
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ...payload, event: `pelano_${event}` });
            if (typeof window.gtag === 'function') {
                const { event: ignoredEvent, ...eventParameters } = payload;
                window.gtag('event', event, eventParameters);
            }
            return true;
        },
        showPreferences() {
            if (!measurementId) return;
            const notice = consentNotice();
            notice.hidden = false;
            notice.querySelector('[data-analytics-consent="denied"]')?.focus();
        }
    });

    document.addEventListener('click', event => {
        const target = event.target instanceof Element ? event.target.closest('a, button') : null;
        if (!target) return;

        if (target.matches('[data-rfq-channel]')) {
            window.PelanoAnalytics.track('quote_channel_selected', { channel: target.dataset.rfqChannel });
        } else if (target.matches('.btn-details')) {
            window.PelanoAnalytics.track('product_view', {
                product_id: target.dataset.product || target.closest('.product-card')?.dataset.product || ''
            });
        } else if (target.matches('.rfq-add-button')) {
            window.PelanoAnalytics.track('product_added_to_quote', {
                product_id: target.dataset.productId || ''
            });
        } else if (target.matches('a[href^="https://wa.me/"]')) {
            window.PelanoAnalytics.track('contact_click', { channel: 'whatsapp' });
        } else if (target.matches('a[href^="mailto:"]')) {
            window.PelanoAnalytics.track('contact_click', { channel: 'email' });
        } else if (target.matches('a[href^="tel:"]')) {
            window.PelanoAnalytics.track('contact_click', { channel: 'phone' });
        }

        if (target.matches('a[download]')) {
            const url = new URL(target.href, window.location.href);
            const assetName = target.getAttribute('download') || url.pathname.split('/').pop() || 'download';
            window.PelanoAnalytics.track('lead_magnet_download', { asset_name: assetName });
        }

        if (target.dataset.trackEvent) {
            window.PelanoAnalytics.track(target.dataset.trackEvent, {
                content_slug: target.dataset.contentSlug || ''
            });
        }
    });

    document.getElementById('search-input')?.addEventListener('input', event => {
        const queryLength = event.target.value.trim().length;
        if (queryLength === 0 || queryLength % 3 === 0) {
            window.PelanoAnalytics.track('product_search', { form: 'products' });
        }
    });

    document.querySelectorAll('[data-analytics-settings]').forEach(button => {
        button.hidden = !measurementId;
        button.addEventListener('click', () => window.PelanoAnalytics.showPreferences());
    });

    if (measurementId && getConsent() === 'granted') {
        loadMeasurement();
    } else if (measurementId && getConsent() === 'unknown') {
        consentNotice();
    }
})();
