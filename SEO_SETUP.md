# Content, CMS and SEO operations

## Supabase-managed content

The public blog retains its built-in static content when Supabase is not configured. To enable managed publishing and server-backed newsletter subscriptions:

1. Run `supabase/schema.sql` in the project's Supabase SQL editor.
2. Configure the project URL and publishable/anon key in `js/supabase-config.js`. Never use a service-role key in browser code.
3. Create a Supabase Auth user for each staff member, then insert a matching `profiles` row with role `admin` or `sales`. Do this through the trusted Supabase SQL editor; do not expose profile-role editing to the public dashboard.
4. Sign in at `/admin.html`. Editors can create drafts and change publication status. Staff can submit social posts as pending, then approve or reject them.
5. Public pages only fetch published articles and approved social posts. Newsletter addresses are stored as `pending` until the recipient confirms by email; newsletter subscribers are not publicly writable.

Supabase is optional. Until the newsletter service is fully configured, the blog uses static content and clearly reports that subscriptions are inactive without saving submitted email addresses.

### Newsletter confirmation and unsubscribe service

The repository includes deployable Supabase Edge Functions for double opt-in and unsubscribe. They are deliberately inactive until the company configures its own Supabase and email-provider accounts.

1. Apply the updated `supabase/schema.sql`. This adds pending/confirmed/unsubscribed states, token hashes, and a server-side IP rate-limit table. The schema revokes anonymous newsletter-table writes.
2. Deploy `supabase/functions/newsletter-subscribe` and `supabase/functions/newsletter-manage` with `supabase/functions/_shared/newsletter.ts`.
3. Configure the Edge Function secrets `SITE_URL=https://pelanoresources.co.tz`, `RESEND_API_KEY`, `NEWSLETTER_FROM` (a sender on a provider-verified company domain), and a high-entropy `NEWSLETTER_RATE_LIMIT_SALT`. Keep the service-role key in Supabase's protected function environment only; never put it in the site or a repository file.
4. Set the project `url`, `anonKey`, `newsletterEndpoint` (`https://<project-ref>.supabase.co/functions/v1/newsletter-subscribe`) and `newsletterManageEndpoint` (`https://<project-ref>.supabase.co/functions/v1/newsletter-manage`) in `js/supabase-config.js`.
5. Test new, repeated, expired, invalid and unsubscribed addresses in a non-production project. Check edge logs/email delivery, privacy notice, consent wording, sender authentication and suppression behavior before announcing a mailing list.

The signup function limits requests per hashed client IP. The mailing system must also include the unsubscribe link in every later marketing email and must suppress contacts immediately after unsubscribe. Existing rows created under the earlier schema are not automatically considered confirmed; verify their consent before any import or campaign.

## Guides and campaign content

The resources centre links to printable buyer guides in `downloads/`. The files provide general procurement checklists, not engineering advice, product certificates, guaranteed availability, pricing or export eligibility. Confirm order-specific details with Pelano Resources.

`campaign.html` is the evergreen campaign template. Duplicate it for an approved campaign, update the canonical, Open Graph metadata, copy, CTA and sitemap; do not publish unverified claims or time-limited offers.

Project stories should only be published after customer permission and verification of specifications, delivery information and outcomes. Use `projects.html` as the profile template.

## Sitemap and quality checks

Run:

```sh
node scripts/generate-sitemaps.cjs
node scripts/check-links.cjs
```

The generator creates page, image and video sitemap XML. Video sitemap entries are emitted only for pages that contain video elements with an MP4 source and a poster. The current site has no published videos, so the generated video sitemap is intentionally empty.

Static published blog slugs are included automatically. To include Supabase-managed published articles, set `PELANO_SUPABASE_URL` and `PELANO_SUPABASE_ANON_KEY` to the project URL and public anon key when generating before deployment. The repository quality workflow can use the same names as GitHub Actions secrets; never provide a service-role key.

The broken-link checker verifies local HTML, script, style, image and in-page anchor references. SEO checks validate metadata, canonical URLs, JSON-LD syntax and sitemap coverage. The static accessibility check covers names, image alternatives, heading outline and duplicate IDs. These checks run in the repository quality workflow. A separate live-site monitor checks the production sitemap and same-origin links every six hours; run `node scripts/check-live-links.cjs` to test another HTTPS deployment via `PELANO_SITE_URL`.

## Search Console, Bing and Google Business Profile

Search Console, Bing Webmaster Tools and Google Business Profile require ownership verification and authorized company accounts; they cannot be activated from this repository without the company's account access. Verify `pelanoresources.co.tz` as a domain property using a DNS TXT record where possible, or use the platform's supplied HTML/meta verification token. Never commit a private API key or account credential.

After verification:

1. Submit `https://pelanoresources.co.tz/sitemap.xml` in Google Search Console and Bing Webmaster Tools. The site's `robots.txt` also lists the page, image and video sitemaps separately.
2. Review indexing, crawl errors, search queries and page performance at least monthly; resolve issues and compare changes after landing-page or content updates.
3. Claim or verify the existing Google Business Profile through the company's authorized account. Confirm the public name, Mafinga address, phone, hours, map pin and website before changing LocalBusiness data.
4. Keep the company profile and website contact details consistent. Do not add unverified locations, service areas, opening hours or profile links.

The homepage LocalBusiness structured data uses the published Mafinga, Iringa contact location. Confirm address, telephone, map pin, opening hours and profile URLs against the company's verified listing before expanding or changing it.

## Analytics, conversion events and performance

Optional GA4 is disabled by default. After the company has created a GA4 property and approved its privacy notice, set the `measurementId` in `js/analytics.js` to the property's `G-...` ID. On the homepage, allow the Google Analytics endpoints in any hosting-level Content Security Policy as well as the in-page policy. Visitors must opt in before the analytics library is requested; a preference control is available on the privacy page. No form values, email addresses, phone numbers or search terms are sent.

The site records privacy-safe events for product interest, contact handoffs, quote actions, lead-magnet downloads, newsletter subscriptions that reach the configured service, and opted-in Core Web Vitals. An email/WhatsApp handoff event only means the visitor opened a prepared message; it does not confirm that the visitor sent it or Pelano received it. Run the automated repository checks on every change and review real-user Core Web Vitals in Search Console or the opted-in GA4 property.

The language switch stores a user preference and applies curated Kiswahili text in the browser; coverage is incomplete. The selector's `?lang=sw` state is not advertised as a distinct search-indexable translation. To avoid claiming a translated page that does not exist, SEO output exposes English and x-default only. Add a `hreflang="sw"` alternate only after a fully translated, reviewed Swahili URL is published and its reciprocal English alternate is in place; mark that link with `data-reviewed-translation="true"` for the SEO script to preserve it.
