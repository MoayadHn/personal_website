# almohaishi.dev — Portfolio refresh (November 2026)

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
- Available live demos and public repositories link directly from project titles. Projects without a public link display descriptions without a misleading case-study link. Prompt Studio retains its live demo link.

## Blog
`site/data/posts.json` contains two proposed articles, with individual static pages under `site/blog/`. Articles marked `published: true` and not marked `draft: true` are shown in the catalog. Both are explicitly marked `reviewed: false` in this pull request: the owner must review their technical accuracy and editorial voice **before merging into the production branch**. AI drafts and private notes must remain outside the public `site/` folder.

## Newsletter
Currently displays **Coming soon** only; no addresses are collected. Integrate a double-opt-in mailing provider and publish appropriate privacy information before enabling signups.

## About Q&A panel
The optional floating **Ask about my work** panel provides curated, rule-based responses drawn from public biography/project information. It is **not yet a generative AI chatbot**, makes no remote AI calls, and collects no user messages. The new curated questions include research, workflow automation, Prompt Studio, and FireFighter. A true AI assistant would require a separately secured backend, approved knowledge content, rate limits, privacy disclosures and an LLM provider.

## Before public launch
Verify the new `/impressum/` and `/privacy/` pages against the deployed infrastructure. The Impressum still **requires a complete postal address** and the privacy statement needs the actual host, retention, and processing details; see `site/LEGAL_PUBLICATION_CHECKLIST.md`. These pages are not a legal certification. Check desktop/mobile layouts and the accessibility of navigation, image descriptions and interactive controls.

## Changes in this refresh
- Shorter landing-page copy, prominent work links, and simpler supporting text.
- Two article pages on prompting/Prompt Studio and n8n/agentic idea evaluation.
- FireFighter archive placeholder in Project Lab, linked to its existing repository. No changes made to FireFighter.
- Expanded curated Q&A; dark/light theme retained.
- Privacy and Impressum navigation, with outstanding legally necessary details documented.

## Review before merging
Review blog claims and personal voice, the legal publication checklist, responsive navigation, all links, and the production deployment. The GitHub branch is a proposed update and is not evidence that the live domain has been deployed or visually browser-tested.
