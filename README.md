# almohaishi.dev — corrected static website

This corrected package fixes the original missing CSS/image problem in local file previews. **Open `site/index.html` directly** to preview the homepage, light/dark theme, and internal pages. There is no npm build step.

## Cloudflare Pages connected to GitHub

1. Add the entire repository (this folder's contents) to GitHub.
2. Create a Cloudflare **Pages** project with Git integration, choose `main`.
3. Framework preset: **None**. Build command: **leave empty**. Output directory: **`site`**.
4. Deploy to the temporary `*.pages.dev` address first. Verify styles, illustration, navigation, and project cards.
5. Add `almohaishi.dev` as the custom domain only after successful preview. Do not change Zoho MX or `prompt` Netlify CNAME records.

**Alternative manual preview:** `cd site && python3 -m http.server 8080` then open http://localhost:8080 . The source also works opened directly as local files.

## Updating projects and lab

Edit `site/data/projects.json` or `site/data/lab.json`, then run `python3 update_catalog.py` before committing. Both pages render the updated entries automatically and route to case-study **Coming soon** pages. The `demo` field can add an additional live demo link. Never publish secrets in JSON.

## Blog

Only add items to `site/data/posts.json` after **manual editorial and factual review**, with `reviewed: true`, `published: true` and `draft: false`; then run `python3 update_catalog.py`. Article-detail pages are not yet implemented and currently point to Coming soon. Do not publish AI draft content without review.

## Newsletter

The newsletter card is explicitly **Coming soon** and accepts no addresses. Connect a newsletter provider with double opt-in, unsubscribe functionality and privacy policy before implementing a real form.

## Before public launch

Add and verify legally appropriate Impressum and Datenschutzerklärung for your German-facing professional website. These are not included. Test mobile, verify all links, and provide genuine content before making public claims about projects or services.


## Homepage highlights (v2)
The three homepage cards automatically show up to two entries from `site/data/projects.json`, `site/data/lab.json`, and `site/data/posts.json`. Blog entries appear ONLY when `reviewed: true`, `published: true`, and `draft` is not true. When the blog is empty, the homepage shows a Coming Soon note.

Add or edit entries in the JSON files, then run `python update_catalog.py` to regenerate `site/assets/catalog.js` (required for opening pages directly as local files; web-server mode also uses it). `date` or `updated` fields in ISO `YYYY-MM-DD` format control the ordering; without dates, catalog order is retained. The homepage keeps one explicit Contact me button, without a duplicate Contact navigation tab.

The About page now uses the owner-provided silhouette photo at site/assets/silhouette.jpg, along with background information from the owner-supplied original About HTML. The image is displayed intentionally as a silhouette, not as an identifying portrait.
