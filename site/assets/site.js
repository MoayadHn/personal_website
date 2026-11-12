(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (themeButton) {
      themeButton.textContent = theme === 'dark' ? '☀' : '☾';
      themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (_) { /* Optional preference only. */ }
  });
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menu-toggle');
  menuToggle?.addEventListener('click', () => {
    const expanded = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(expanded));
    menuToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  });
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;'
  }[char]));
  const script = document.querySelector('script[src*="site.js"]');
  const base = new URL('../', script.src);
  const pageUrl = path => new URL(String(path).replace(/^\//, ''), base).href;
  const safePost = path => /^blog\/[a-z0-9-]+\/$/.test(path || '');
  const externalLink = url => /^https:\/\/[a-z0-9.-]+(?:\/|$)/i.test(url || '');
  const safeSlug = text => /^[a-z0-9-]+$/.test(text || '') ? text : 'unknown';
  async function loadCatalog(name) {
    if (window.SITE_CATALOG && Array.isArray(window.SITE_CATALOG[name])) return window.SITE_CATALOG[name];
    const response = await fetch(pageUrl('data/' + name + '.json'));
    if (!response.ok) throw new Error('Catalog unavailable');
    return response.json();
  }
  const publicPosts = entries => entries.filter(post => post.published === true && post.draft !== true);
  function entryLink(type, item) {
    if (type === 'blog') return safePost(item.url) ? pageUrl(item.url) : pageUrl('blog/');
    if (type === 'projects' && externalLink(item.demo)) return item.demo;
    if (type === 'lab' && externalLink(item.repo)) return item.repo;
    return pageUrl(type === 'projects' ? 'projects/' : 'lab/');
  }
  function recentLinks(id, type, catalog) {
    const region = document.getElementById(id);
    if (!region) return;
    loadCatalog(catalog).then(items => {
      if (type === 'blog') items = publicPosts(items);
      const selected = [...items].sort((a, b) =>
        String(b.date || b.updated || '').localeCompare(String(a.date || a.updated || ''))).slice(0, 2);
      if (!selected.length) {
        region.innerHTML = '<span class="recent-placeholder">New writing soon.</span>';
        return;
      }
      region.innerHTML = selected.map(item => {
        const href = entryLink(type, item);
        const external = href.startsWith('https://') && !href.startsWith(base.origin + '/');
        const symbol = type === 'blog' ? '✎' : type === 'lab' ? '⌁' : '◈';
        return `<a href="${escapeHtml(href)}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}><span class="recent-glyph" aria-hidden="true">${symbol}</span><span class="recent-content"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.highlight || item.category || '')}</small></span></a>`;
      }).join('');
    }).catch(() => { region.textContent = 'Content is temporarily unavailable.'; });
  }
  recentLinks('recent-projects', 'projects', 'projects');
  recentLinks('recent-lab', 'lab', 'lab');
  recentLinks('recent-posts', 'blog', 'posts');
  const list = document.getElementById('content-list');
  if (list) {
    const type = list.dataset.type;
    loadCatalog(type === 'lab' ? 'lab' : type === 'blog' ? 'posts' : 'projects').then(entries => {
      if (type === 'blog') {
        entries = publicPosts(entries).sort((a, b) => String(b.date).localeCompare(String(a.date)));
      }
      if (!entries.length) {
        list.innerHTML = '<div class="empty"><h2>Nothing published yet</h2><p>Check back for updates.</p></div>';
        return;
      }
      list.innerHTML = entries.map(item => {
        if (type === 'blog') {
          const href = entryLink(type, item);
          const date = item.date ? new Date(item.date + 'T12:00:00Z').toLocaleDateString('en-GB', {year:'numeric', month:'short', day:'numeric'}) : '';
          return `<article class="item-card blog-card"><span class="kicker">${escapeHtml(item.category || 'Writing')}</span><h2><a href="${escapeHtml(href)}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.summary || '')}</p><div class="blog-card-footer"><span>${escapeHtml(date)}${item.readingTime ? ' · ' + escapeHtml(item.readingTime) : ''}</span><a href="${escapeHtml(href)}">Read article →</a></div></article>`;
        }
        const img = /^assets\/projects\/[a-z0-9-]+\.svg$/.test(item.image || '') ? item.image : 'assets/projects/default.svg';
        const demo = externalLink(item.demo) ? item.demo : null;
        const repo = externalLink(item.repo) ? item.repo : null;
        const primary = demo || repo;
        const title = primary ? `<a href="${escapeHtml(primary)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>` : escapeHtml(item.title);
        const tags = (item.skills || []).slice(0, 3).map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
        const actions = [demo && `<a href="${escapeHtml(demo)}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`, repo && `<a href="${escapeHtml(repo)}" target="_blank" rel="noopener noreferrer">Source code ↗</a>`].filter(Boolean).join('');
        return `<article class="project-row"><div class="project-copy"><span class="kicker">${escapeHtml(item.category || 'Software')}</span><h2>${title}</h2><p>${escapeHtml(item.summary || '')}</p><div class="mini-tags">${tags}</div><div class="project-bottom"><span class="status">${escapeHtml(item.status || 'In progress')}</span>${actions}</div></div><div class="project-media"><img src="${escapeHtml(pageUrl(img))}" alt="${escapeHtml(item.title)} project illustration" width="540" height="330" loading="lazy"></div></article>`;
      }).join('');
    }).catch(() => { list.innerHTML = '<div class="empty">Could not load content. Please try again later.</div>'; });
  }
  const coming = document.getElementById('coming-project');
  if (coming) {
    const project = new URLSearchParams(location.search).get('project');
    Promise.all([loadCatalog('projects'), loadCatalog('lab')]).then(([a, b]) => {
      const item = [...a, ...b].find(x => x.slug === safeSlug(project));
      if (item) { coming.textContent = item.title; document.title = item.title + ' | Moayad Almohaishi'; }
    }).catch(() => {});
  }
  const askFab = document.getElementById('ask-fab');
  const askPanel = document.getElementById('ask-panel');
  const askLog = document.getElementById('ask-log');
  const askClose = document.getElementById('ask-close');
  function toggleAsk(open) {
    if (!askPanel) return;
    askPanel.hidden = !open;
    askFab?.setAttribute('aria-expanded', String(open));
    if (open) askClose?.focus(); else askFab?.focus();
  }
  askFab?.addEventListener('click', () => toggleAsk(Boolean(askPanel?.hidden)));
  askClose?.addEventListener('click', () => toggleAsk(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !askPanel?.hidden) toggleAsk(false);
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
  const answers = {
    projects: {text:'Selected work includes Prompt Studio, PeopleFlow, StoryNest and knowledge graph experiments.', link:'projects/', label:'Explore projects'},
    background: {text:'My background combines software engineering, academic research at the University of Bayreuth and computer science teaching at Auburn University.', link:'about/', label:'About me'},
    skills: {text:'I work with Python, knowledge graphs, LLM applications, n8n, Make.com and agent-based automation.', link:'about/', label:'Skills and experience'},
    research: {text:'Research into semantics, structured data and knowledge graphs informs how I build grounded, testable AI systems.', link:'about/', label:'Research background'},
    automation: {text:'I design workflows that coordinate data, AI tools and human decisions, with logging and failure handling in mind.', link:'blog/agentic-workflows/', label:'Read the workflow article'},
    'prompt-studio': {text:'Prompt Studio helps structure goals, context, examples, constraints and output formats when working with AI models.', link:'blog/better-prompts/', label:'Read about prompting'},
    firefighter: {text:'FireFighter is an earlier UDP/MANET-style first-responder telemetry prototype. A real ESP32-based version is a possible future experiment.', link:'lab/', label:'Project Lab'},
    contact: {text:'For collaboration or software/AI engineering discussions, email moayad@almohaishi.dev.', link:'mailto:moayad@almohaishi.dev', label:'Send an email'}
  };
  document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => {
    if (!askLog) return;
    const answer = answers[button.dataset.question];
    if (!answer) return;
    askLog.replaceChildren();
    const p = document.createElement('p'); p.className = 'ask-answer'; p.textContent = answer.text;
    const a = document.createElement('a'); a.className = 'ask-answer-link';
    a.href = answer.link.startsWith('mailto:') ? answer.link : pageUrl(answer.link);
    a.textContent = answer.label + ' →';
    askLog.append(p, a);
  }));
})();
