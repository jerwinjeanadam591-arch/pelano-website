import { databaseRequest, hashToken, requestOrigin, response } from '../_shared/newsletter.ts';

Deno.serve(async request => {
    let origin = '';
    try {
        origin = requestOrigin(request);
    } catch (error) {
        console.error('Newsletter management request was rejected.', error);
        return response({ error: 'Newsletter service is unavailable.' }, 503);
    }
    if (request.method === 'OPTIONS') return response({}, 204, origin);
    if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405, origin);

    try {
        const body = await request.json();
        const token = typeof body.token === 'string' ? body.token : '';
        const action = body.action;
        if (!/^[a-f0-9]{64}$/i.test(token) || !['confirm', 'unsubscribe'].includes(action)) {
            return response({ error: 'This newsletter link is invalid or expired.' }, 400, origin);
        }

        const tokenHash = await hashToken(token);
        const column = action === 'confirm' ? 'confirmation_token_hash' : 'unsubscribe_token_hash';
        const query = new URLSearchParams({
            select: 'id,status,confirmation_expires_at',
            [column]: `eq.${tokenHash}`,
            limit: '1'
        });
        const matches = await databaseRequest(`newsletter_subscribers?${query}`);
        const subscriber = Array.isArray(matches) ? matches[0] : null;
        if (!subscriber) return response({ error: 'This newsletter link is invalid or expired.' }, 400, origin);

        if (action === 'confirm') {
            if (subscriber.status !== 'confirmed' &&
                (!subscriber.confirmation_expires_at || Date.parse(subscriber.confirmation_expires_at) < Date.now())) {
                return response({ error: 'This confirmation link has expired. Please subscribe again.' }, 400, origin);
            }
            if (subscriber.status !== 'confirmed') {
                const updateQuery = new URLSearchParams({ id: `eq.${subscriber.id}` });
                await databaseRequest(`newsletter_subscribers?${updateQuery}`, {
                    method: 'PATCH',
                    headers: { Prefer: 'return=minimal' },
                    body: JSON.stringify({
                        status: 'confirmed',
                        confirmed_at: new Date().toISOString(),
                        confirmation_token_hash: null,
                        confirmation_expires_at: null
                    })
                });
            }
            return response({ updated: true, action }, 200, origin);
        }

        const updateQuery = new URLSearchParams({ id: `eq.${subscriber.id}` });
        await databaseRequest(`newsletter_subscribers?${updateQuery}`, {
            method: 'PATCH',
            headers: { Prefer: 'return=minimal' },
            body: JSON.stringify({
                status: 'unsubscribed',
                unsubscribed_at: new Date().toISOString(),
                confirmation_token_hash: null,
                confirmation_expires_at: null,
                unsubscribe_token_hash: null
            })
        });
        return response({ updated: true, action }, 200, origin);
    } catch (error) {
        console.error('Newsletter subscription could not be updated.', error);
        return response({ error: 'Your request could not be completed. Please contact Pelano Resources.' }, 502, origin);
    }
});
