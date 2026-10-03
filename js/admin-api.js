(() => {
    const config = window.PelanoSupabaseConfig || {};
    let accessToken = '';

    const request = async (path, options = {}) => {
        if (!config.url || !config.anonKey || !accessToken) {
            throw new Error('Supabase staff authentication is not configured.');
        }
        const response = await fetch(`${config.url.replace(/\/$/, '')}${path}`, {
            ...options,
            headers: {
                apikey: config.anonKey,
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                ...(options.headers || {})
            },
            credentials: 'omit'
        });
        if (!response.ok) throw new Error(`Staff request failed with HTTP ${response.status}.`);
        return response.status === 204 ? null : response.json();
    };

    const signIn = async (email, password) => {
        const response = await fetch(`${config.url.replace(/\/$/, '')}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: { apikey: config.anonKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'omit'
        });
        if (!response.ok) throw new Error('Sign-in failed. Check your staff credentials.');
        const session = await response.json();
        accessToken = session.access_token || '';
        if (!accessToken) throw new Error('Sign-in succeeded without a staff access token.');
        return session.user;
    };

    const listQuotes = () => request(`/rest/v1/${encodeURIComponent(config.quoteTable || 'quote_requests')}?select=*&order=created_at.desc`);
    const listPosts = () => request(`/rest/v1/${encodeURIComponent(config.postsTable || 'cms_posts')}?select=*&order=created_at.desc`);
    const createPost = post => request(`/rest/v1/${encodeURIComponent(config.postsTable || 'cms_posts')}`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: { Prefer: 'return=representation' }
    });
    const updatePostStatus = (id, status) => request(`/rest/v1/${encodeURIComponent(config.postsTable || 'cms_posts')}?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status, updated_at: new Date().toISOString() })
    });
    const listSocialPosts = () => request('/rest/v1/social_posts?select=*&order=created_at.desc');
    const createSocialPost = post => request('/rest/v1/social_posts', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(post)
    });
    const updateSocialStatus = (id, status) => request(`/rest/v1/social_posts?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status, updated_at: new Date().toISOString() })
    });
    const updateQuoteStatus = (id, status) => request(`/rest/v1/${encodeURIComponent(config.quoteTable || 'quote_requests')}?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status, updated_at: new Date().toISOString() })
    });
    const signOut = () => { accessToken = ''; };

    window.PelanoAdminApi = Object.freeze({ signIn, listQuotes, updateQuoteStatus, listPosts, createPost, updatePostStatus, listSocialPosts, createSocialPost, updateSocialStatus, signOut });
})();
