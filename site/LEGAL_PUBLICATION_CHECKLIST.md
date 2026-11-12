# Germany website publication checklist — 12 November 2026

**Not a legal certification.** Confirm with a German legal professional when needed.

- [ ] Complete full serviceable postal address and postcode in `impressum/index.html` (and controller information in `privacy/index.html`). A PO box alone may not suffice.
- [ ] Check whether additional DDG § 5 / MStV § 18 notices apply to the site's actual commercial or editorial context, including VAT ID where issued.
- [ ] Verify the actual production provider (README mentions Cloudflare Pages), server location, request logs, retention, legitimate interests, processors, transfer safeguards, and contractual arrangements. Do not infer this from repository code.
- [ ] Confirm email service (previous setup mentions Zoho Mail), handling of inquiries, data retention, and applicable lawful basis.
- [ ] Audit **deployed** HTML, requests, browser cookies/local storage, analytics, embeds, web fonts, CDNs, anti-spam, and GitHub/Netlify/Cloudflare configuration for third-party data flows. The current static code has a theme preference but no analytics scripts.
- [ ] Ensure links to Impressum and privacy notice are visible from every page (including mobile and article pages).
- [ ] Decide how to handle theme storage under §25 TDDDG and record the necessity assessment. Obtain prior consent for any future non-essential tracking/storage.
- [ ] Do not enable an AI chatbot, newsletter signup, or form collection without updated privacy disclosures, security/privacy review, and where relevant opt-in consent.
- [ ] Update sitemap after publication, test HTTP response codes and accessibility on the deployed domain.
- [ ] Review editorial content and links before publishing. The two new articles are authored drafts proposed for publication; they have not been manually approved by the website owner.

Official reading: https://www.gesetze-im-internet.de/ddg/__5.html , https://www.gesetze-im-internet.de/ttdsg/__25.html , https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng .
