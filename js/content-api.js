(() => {
    const config = window.PelanoSupabaseConfig || {};
    const configured = Boolean(config.url && config.anonKey);
    const newsletterConfigured = (() => {
        if (!configured || typeof config.newsletterEndpoint !== 'string' || !config.newsletterEndpoint.trim()) return false;
        try {
            const endpoint = new URL(config.newsletterEndpoint);
            const project = new URL(config.url);
            return endpoint.protocol === 'https:' && endpoint.origin === project.origin &&
                endpoint.pathname.endsWith('/functions/v1/newsletter-subscribe');
        } catch (error) {
            console.error('Newsletter service endpoint is invalid.', error);
            return false;
        }
    })();

    async function request(table, query, body, method = 'GET') {
        const response = await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}${query}`, {
            method,
            headers: {
                apikey: config.anonKey,
                Authorization: `Bearer ${config.anonKey}`,
                'Content-Type': 'application/json',
                Prefer: method === 'POST' ? 'return=representation,resolution=ignore-duplicates' : 'return=representation'
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'omit'
        });
        if (!response.ok) throw new Error(`Content request failed with HTTP ${response.status}.`);
        if (response.status === 204) return [];
        return response.json();
    }

    window.PelanoContentApi = Object.freeze({
        isConfigured: configured,
        isNewsletterConfigured: newsletterConfigured,
        async getPublishedPosts() {
            if (!configured) return null;
            return request(config.postsTable || 'cms_posts', '?select=id,slug,title,excerpt,content,image,author,category,tags,date,read_time,status&status=eq.published&order=date.desc');
        },
        async getApprovedSocialPosts() {
            if (!configured) return [];
            return request('social_posts', '?select=id,platform,caption,image_url,post_url&status=eq.approved&order=created_at.desc&limit=12');
        },
        async subscribe(email, consent) {
            if (!configured) return { submitted: false };
            if (!newsletterConfigured) {
                throw new Error('Newsletter confirmation service is not configured.');
            }
            const endpoint = new URL(config.newsletterEndpoint);
            const project = new URL(config.url);
            if (endpoint.protocol !== 'https:' || endpoint.origin !== project.origin ||
                !endpoint.pathname.endsWith('/functions/v1/newsletter-subscribe')) {
                throw new Error('Newsletter confirmation service must be the configured HTTPS Supabase function.');
            }
            const response = await fetch(endpoint.href, {
                method: 'POST',
                headers: {
                    apikey: config.anonKey,
                    Authorization: `Bearer ${config.anonKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, consent }),
                credentials: 'omit'
            });
            if (!response.ok) throw new Error(`Newsletter confirmation request failed with HTTP ${response.status}.`);
            const result = await response.json();
            if (result?.submitted !== true) throw new Error('Newsletter confirmation request did not return a successful status.');
            return { submitted: true };
        }
    });
})();
