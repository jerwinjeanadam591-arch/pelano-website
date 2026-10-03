/**
 * Public Supabase configuration.
 *
 * Only the project's URL and publishable/anon key belong here. Never put a
 * service-role key in browser code. Leave these values empty to keep the
 * existing email/WhatsApp-only enquiry flow.
 */
window.PelanoSupabaseConfig = Object.freeze({
    url: '',
    anonKey: '',
    quoteTable: 'quote_requests',
    profileTable: 'profiles',
    postsTable: 'cms_posts',
    newsletterTable: 'newsletter_subscribers',
    newsletterEndpoint: '',
    newsletterManageEndpoint: ''
});
