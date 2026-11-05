(function(){
 const root=document.documentElement;
 const themeButton=document.getElementById('theme-toggle');
 function applyTheme(t){root.dataset.theme=t;root.style.colorScheme=t; if(themeButton){themeButton.textContent=t==='dark'?'☀':'☾';themeButton.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode')}}
 try{applyTheme(localStorage.getItem('theme')||'light')}catch{applyTheme('light')}
 themeButton?.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';applyTheme(next);try{localStorage.setItem('theme',next)}catch{}});
 const nav=document.getElementById('nav');document.getElementById('menu-toggle')?.addEventListener('click',()=>{const open=nav.classList.toggle('open');document.getElementById('menu-toggle').setAttribute('aria-expanded',String(open))});
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const slug=s=>/^[a-z0-9-]+$/.test(String(s||''))?s:'unknown';
 const scriptEl=document.querySelector('script[src*="site.js"]');
 const base=new URL('../',scriptEl.src);
 function pageUrl(route){return new URL(String(route).replace(/^\//,''),base).href}
 async function loadJson(file){if(window.SITE_CATALOG && window.SITE_CATALOG[file])return window.SITE_CATALOG[file];const r=await fetch(new URL('data/'+file+'.json',base));if(!r.ok)throw new Error('Content unavailable');return r.json()}
 // Homepage highlights are generated from the same catalogs as the full pages.
 // The bundled catalog also supports opening index.html directly from disk.
 function recentHref(type,item){
   if(type==='projects' && item.demo) return item.demo;
   return pageUrl(type==='blog'?'blog/coming-soon/':'coming-soon/?project='+encodeURIComponent(slug(item.slug)));
 }
 function renderRecent(id,key,type){
   const region=document.getElementById(id);if(!region)return;
   loadJson(key).then(items=>{
     if(type==='blog')items=items.filter(p=>p.reviewed===true && p.published===true && p.draft!==true);
     const selected=[...items].sort((a,b)=>String(b.date||b.updated||'').localeCompare(String(a.date||a.updated||''))).slice(0,2);
     if(!selected.length){region.innerHTML='<span class="recent-placeholder">First reviewed articles coming soon.</span>';return}
     region.innerHTML=selected.map(p=>{
       const href=recentHref(type,p),external=type==='projects'&&Boolean(p.demo);
       const icon = type==='projects'?'◈':type==='lab'?'⌁':'✎';
       return `<a href="${esc(href)}" ${external?'target="_blank" rel="noopener noreferrer"':''}><span class="recent-glyph" aria-hidden="true">${icon}</span><span class="recent-content"><strong>${esc(p.title)}</strong><small>${esc(p.highlight||p.category||'Explore')}</small></span></a>`;
     }).join('');
   }).catch(()=>{});
 }
 renderRecent('recent-projects','projects','projects');
 renderRecent('recent-lab','lab','lab');
 renderRecent('recent-posts','posts','blog');
 const list=document.getElementById('content-list');
 if(list){const type=list.dataset.type;loadJson(type==='lab'?'lab':type==='blog'?'posts':'projects').then(entries=>{
  if(type==='blog')entries=entries.filter(p=>p.reviewed===true&&p.published===true&&p.draft!==true).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  if(!entries.length){list.innerHTML='<div class="empty"><h2>No published articles yet</h2><p>AI-assisted articles will appear here only after my manual fact-checking, editing, and approval.</p></div>';return}
  list.innerHTML=entries.map(p=>{
   const safeImage=/^assets\/projects\/[a-z0-9-]+\.svg$/.test(p.image||'')?p.image:'assets/projects/default.svg';
   const url=pageUrl(type==='blog'?'blog/coming-soon/':'coming-soon/?project='+encodeURIComponent(slug(p.slug)));
   const tags=(p.skills||p.tags||[]).map(x=>`<span>${esc(x)}</span>`).join('');
   if(type==='blog')return `<article class="item-card"><span class="kicker">${esc(p.category||'Writing')}</span><h2><a href="${url}">${esc(p.title)}</a></h2><p>${esc(p.summary||'')}</p><span class="status">Human reviewed</span></article>`;
   return `<article class="project-row"><div class="project-copy"><span class="kicker">${esc(p.category||'Software')}</span><h2><a href="${url}">${esc(p.title)}</a></h2><p>${esc(p.summary||'')}</p><div class="mini-tags">${tags}</div><div class="project-bottom"><span class="status">${esc(p.status||'In progress')}</span><a href="${url}">Case study ↗</a>${/^https:\/\//.test(p.demo||'')?`<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`:''}</div></div><div class="project-media"><img src="${pageUrl(safeImage)}" alt="Illustration for ${esc(p.title)}" width="540" height="330" loading="lazy"></div></article>`;
  }).join('');
 }).catch(()=>{list.innerHTML='<div class="empty">Could not load content. Please try again later.</div>'})}
 const projectName=document.getElementById('coming-project');if(projectName){const value=new URLSearchParams(location.search).get('project');Promise.all([loadJson('projects'),loadJson('lab')]).then(([a,b])=>{const project=[...a,...b].find(x=>x.slug===value);if(project){projectName.textContent=project.title;document.title=project.title+' — Coming soon | Moayad Almohaishi'}}).catch(()=>{})}
 const newsletter=document.getElementById('newsletter-form');newsletter?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('newsletter-status').textContent='Newsletter subscriptions are not open yet. This form does not collect or store your address.'});
 const askFab=document.getElementById('ask-fab'),askPanel=document.getElementById('ask-panel'),askClose=document.getElementById('ask-close'),askLog=document.getElementById('ask-log');
 function toggleAsk(open){if(!askPanel)return;askPanel.hidden=!open;askFab?.setAttribute('aria-expanded',String(open));if(open)askClose?.focus();else askFab?.focus()}
 askFab?.addEventListener('click',()=>toggleAsk(askPanel.hidden));
 askClose?.addEventListener('click',()=>toggleAsk(false));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!askPanel?.hidden)toggleAsk(false)});
 const answers={
   projects:'I work on StoryNest (children\'s reading), PeopleFlow (HR onboarding automation), Prompt Studio (a prompt builder), and experiments connecting knowledge graphs and LLMs. Explore the Projects page for details.',
   background:'My background includes software development, research at the University of Bayreuth on NFDIxCS, and teaching computer science at Auburn University.',
   skills:'My main focus is Python, software engineering, knowledge graphs and Neo4j, generative AI, n8n, Make.com and workflow automation.',
   contact:'You can reach me at moayad@almohaishi.dev. I\'m based in Bayreuth, Germany.'
 };
 document.querySelectorAll('[data-question]').forEach(btn=>btn.addEventListener('click',()=>{askLog.textContent='';const p=document.createElement('p');p.className='ask-answer';p.textContent=answers[btn.dataset.question]||'Please explore the site for more details.';askLog.appendChild(p)}));
})();
