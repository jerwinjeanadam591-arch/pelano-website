const siteUrl = Deno.env.get('SITE_URL');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

export function response(body: Record<string, unknown>, status = 200, origin = '') {
    return new Response(status === 204 ? null : JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
            Vary: 'Origin'
        }
    });
}

export function requestOrigin(request: Request) {
    if (!siteUrl || !supabaseUrl || !serviceKey) {
        throw new Error('Newsletter service is not configured.');
    }
    const configuredOrigin = new URL(siteUrl).origin;
    const origin = request.headers.get('Origin') || '';
    if (origin !== configuredOrigin) throw new Error('Request origin is not allowed.');
    return origin;
}

export function randomToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function hashToken(token: string) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function allowSignup(request: Request) {
    const salt = Deno.env.get('NEWSLETTER_RATE_LIMIT_SALT');
    const forwardedFor = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '';
    const address = forwardedFor.split(',')[0].trim();
    if (!salt || !address) throw new Error('Newsletter rate limiting is not configured.');
    const requestKeyHash = await hashToken(`${salt}:${address}`);
    return databaseRequest('rpc/consume_newsletter_signup_limit', {
        method: 'POST',
        body: JSON.stringify({ p_request_key_hash: requestKeyHash })
    });
}

export async function databaseRequest(path: string, init: RequestInit = {}) {
    const headers = new Headers(init.headers);
    headers.set('apikey', serviceKey!);
    headers.set('Authorization', `Bearer ${serviceKey}`);
    headers.set('Content-Type', 'application/json');
    const result = await fetch(`${supabaseUrl!.replace(/\/$/, '')}/rest/v1/${path}`, {
        ...init,
        headers,
        cache: 'no-store'
    });
    if (!result.ok) throw new Error(`Newsletter database request failed with HTTP ${result.status}.`);
    if (result.status === 204) return [];
    return result.json();
}

export async function sendConfirmation(email: string, token: string) {
    const mailKey = Deno.env.get('RESEND_API_KEY');
    const from = Deno.env.get('NEWSLETTER_FROM');
    if (!mailKey || !from || !siteUrl) throw new Error('Newsletter email delivery is not configured.');
    const confirmationUrl = new URL('/newsletter-confirm.html', siteUrl);
    confirmationUrl.searchParams.set('action', 'confirm');
    confirmationUrl.searchParams.set('token', token);
    const unsubscribeUrl = new URL(confirmationUrl);
    unsubscribeUrl.searchParams.set('action', 'unsubscribe');
    const result = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${mailKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from,
            to: [email],
            subject: 'Confirm your Pelano Resources newsletter subscription',
            html: [
                '<p>We received a request to subscribe this address to Pelano Resources updates.</p>',
                `<p><a href="${confirmationUrl.href}">Confirm subscription</a></p>`,
                '<p>If you did not request this, you can ignore this email. Your address will not be added to the mailing list unless you confirm.</p>',
                `<p><a href="${unsubscribeUrl.href}">Unsubscribe</a></p>`
            ].join('')
        })
    });
    if (!result.ok) throw new Error(`Newsletter confirmation email could not be sent (HTTP ${result.status}).`);
}
