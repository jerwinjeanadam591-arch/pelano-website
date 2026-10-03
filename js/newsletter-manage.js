(() => {
    const status = document.getElementById('newsletter-manage-status');
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    const token = params.get('token');
    window.history.replaceState(null, '', `${window.location.pathname}`);

    const config = window.PelanoSupabaseConfig;
    if (!status) {
        console.error('Newsletter status region is missing.');
        return;
    }
    if (!config?.url || !config.anonKey || !config.newsletterManageEndpoint) {
        status.textContent = 'Newsletter preferences are not configured. Please contact Pelano Resources for help.';
        return;
    }
    if (!['confirm', 'unsubscribe'].includes(action) || !token || !/^[a-f0-9]{64}$/i.test(token)) {
        status.textContent = 'This newsletter link is invalid or incomplete.';
        return;
    }
    let endpoint;
    let project;
    try {
        endpoint = new URL(config.newsletterManageEndpoint);
        project = new URL(config.url);
    } catch (error) {
        console.error('Newsletter endpoint configuration is invalid.', error);
        status.textContent = 'Newsletter preferences are not configured correctly. Please contact Pelano Resources.';
        return;
    }
    if (endpoint.protocol !== 'https:' || endpoint.origin !== project.origin ||
        !endpoint.pathname.endsWith('/functions/v1/newsletter-manage')) {
        status.textContent = 'Newsletter preferences are not configured correctly. Please contact Pelano Resources.';
        return;
    }

    fetch(endpoint.href, {
        method: 'POST',
        headers: {
            apikey: config.anonKey,
            Authorization: `Bearer ${config.anonKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, token }),
        credentials: 'omit'
    }).then(async response => {
        if (!response.ok) {
            const result = await response.json().catch(error => {
                console.error('Newsletter service returned an unreadable error response.', error);
                return {};
            });
            throw new Error(typeof result.error === 'string' ? result.error : `Newsletter request failed with HTTP ${response.status}.`);
        }
        const result = await response.json();
        if (result.updated !== true || result.action !== action) {
            throw new Error('Newsletter service did not confirm the requested change.');
        }
        status.textContent = action === 'confirm'
            ? 'Your newsletter subscription is confirmed. Thank you.'
            : 'Your email has been unsubscribed from Pelano Resources updates.';
    }).catch(error => {
        console.error('Newsletter preference could not be updated.', error);
        status.textContent = error.message || 'Your request could not be completed. Please contact Pelano Resources.';
    });
})();
