# almohaishi.dev — Version 4

A focused, responsive portfolio with restrained light/dark design, animated code illustration, dynamic project catalogs, an About split-card silhouette, and a guided Q&A panel.

## Preview
Open `site/index.html` directly, or serve `site` locally with `python3 -m http.server 8080` while working from within `site`.

## Deploy via GitHub + Cloudflare Pages
1. Commit this folder to `moayadhn/personal-website` (or another repository). Do not add credentials.
2. Create a new **Cloudflare Pages** project from GitHub, branch `main`.
3. Framework: None; build command: blank; **output directory: `site`**; root directory: `/`.
4. Inspect the `pages.dev` preview, then connect `almohaishi.dev`. Keep Zoho MX records and the Netlify `prompt` CNAME untouched.

## Adding a project
Edit `site/data/projects.json` or `site/data/lab.json` and add an entry with fields `slug`, `title`, `category`, `summary`, `status`, `skills`, and optional `demo`, `date`, `updated`, and `image`.
- Use a local image such as `assets/projects/storynest.svg`. Add the corresponding file under `site/assets/projects/`.
- If no image is supplied, a default abstract software illustration is used.
- Run **`python3 update_catalog.py`** to update the self-contained catalog for file previews and deployments.
- Two most recent entries appear on the homepage automatically (based on date/updated, or catalog order if missing).
- Project titles link to a Coming soon case-study page until dedicated case studies are written. Prompt Studio retains its live demo link.

## Blog
`site/data/posts.json` contains only articles approved for publication. An article is visible only if `reviewed: true`, `published: true` and `draft` is not true. AI drafts must remain outside the public `site/` folder. No articles have been invented.

## Newsletter
Currently displays **Coming soon** only; no addresses are collected. Integrate a double-opt-in mailing provider and publish appropriate privacy information before enabling signups.

## About Q&A panel
The optional floating **Ask about my work** panel provides curated, rule-based responses drawn from public biography/project information. It is **not a generative AI chatbot**, makes no remote API calls, and collects no user messages. A true AI assistant would require a separately secured backend, approved knowledge content, rate limits, privacy disclosures and an LLM provider.

## Before public launch
Add and verify an Impressum and Datenschutzerklärung appropriate for the site's use in Germany. The source ZIP does not include legally reviewed notices. Check desktop/mobile layouts and the accessibility of navigation, image descriptions and interactive controls.
