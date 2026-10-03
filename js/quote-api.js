/**
 * Optional Supabase quote submission.
 *
 * This module is deliberately fail-open for the existing static-site flow:
 * if configuration is absent or the API is unavailable, callers can continue
 * with the existing email or WhatsApp handoff.
 */
(() => {
    const config = window.PelanoSupabaseConfig || {};

    const isConfigured = Boolean(
        typeof config.url === 'string' &&
        config.url.trim() &&
        typeof config.anonKey === 'string' &&
        config.anonKey.trim()
    );

    const submitQuote = async quote => {
        if (!isConfigured) return { submitted: false, reason: 'not-configured' };

        const response = await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(config.quoteTable || 'quote_requests')}`, {
            method: 'POST',
            headers: {
                apikey: config.anonKey,
                Authorization: `Bearer ${config.anonKey}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },
            body: JSON.stringify(quote),
            credentials: 'omit'
        });

        if (!response.ok) {
            throw new Error(`Quote submission failed with HTTP ${response.status}.`);
        }

        const records = await response.json();
        return {
            submitted: true,
            id: Array.isArray(records) ? records[0]?.id : undefined
        };
    };

    window.PelanoQuoteApi = Object.freeze({
        isConfigured,
        submitQuote
    });
})();
