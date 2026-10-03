import { allowSignup, databaseRequest, hashToken, randomToken, requestOrigin, response, sendConfirmation } from '../_shared/newsletter.ts';

Deno.serve(async request => {
    let origin = '';
    try {
        origin = requestOrigin(request);
    } catch (error) {
        console.error('Newsletter subscription request was rejected.', error);
        return response({ error: 'Newsletter service is unavailable.' }, 503);
    }
    if (request.method === 'OPTIONS') return response({}, 204, origin);
    if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405, origin);

    try {
        const body = await request.json();
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
        if (body.consent !== true || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return response({ error: 'Enter a valid email address and provide consent.' }, 400, origin);
        }
        if (await allowSignup(request) !== true) {
            return response({ error: 'Too many subscription requests. Please try again later.' }, 429, origin);
        }

        const query = new URLSearchParams({
            select: 'id,status',
            email: `eq.${email}`,
            limit: '1'
        });
        const existing = await databaseRequest(`newsletter_subscribers?${query}`);
        if (Array.isArray(existing) && existing[0]?.status === 'confirmed') {
            return response({ submitted: true }, 200, origin);
        }

        const token = randomToken();
        const tokenHash = await hashToken(token);
        const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        await databaseRequest(`newsletter_subscribers?on_conflict=email`, {
            method: 'POST',
            headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
            body: JSON.stringify({
                email,
                consent: true,
                consented_at: new Date().toISOString(),
                source: 'website',
                status: 'pending',
                confirmation_token_hash: tokenHash,
                confirmation_expires_at: expiry,
                unsubscribe_token_hash: tokenHash,
                confirmed_at: null,
                unsubscribed_at: null
            })
        });
        await sendConfirmation(email, token);
        return response({ submitted: true }, 200, origin);
    } catch (error) {
        console.error('Newsletter subscription could not be completed.', error);
        return response({ error: 'Newsletter sign-up could not be completed. Please try again later.' }, 502, origin);
    }
});
