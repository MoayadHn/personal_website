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
   return pageUrl('coming-soon/?project='+encodeURIComponent(slug(item.slug)));
 }
 function renderRecent(id,key,type){
   const region=document.getElementById(id);if(!region)return;
   loadJson(key).then(items=>{
     if(type==='blog')items=items.filter(p=>p.reviewed===true && p.published===true && p.draft!==true);
     const selected=[...items].sort((a,b)=>String(b.date||b.updated||'').localeCompare(String(a.date||a.updated||''))).slice(0,2);
     if(!selected.length){region.innerHTML='<span class="recent-placeholder">First reviewed articles coming soon.</span>';return}
     region.innerHTML=selected.map(p=>{
       const href=recentHref(type,p),external=type==='projects'&&Boolean(p.demo);
       return `<a href="${esc(href)}" ${external?'target="_blank" rel="noopener noreferrer"':''}>${esc(p.title)} <span aria-hidden="true">↗</span></a>`;
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
  list.innerHTML=entries.map(p=>`<article class="item-card"><span class="kicker">${esc(p.category||'AI & software')}</span><h2>${esc(p.title)}</h2><p>${esc(p.summary||p.description||'')}</p><div class="mini-tags">${(p.skills||p.tags||[]).map(x=>`<span>${esc(x)}</span>`).join('')}</div><span class="status">${esc(p.status|| (type==='blog'?'Human reviewed':''))}</span><div class="item-footer" style="margin-top:15px"><a class="btn sm" href="${pageUrl(type==='blog'?'blog/coming-soon/':'coming-soon/?project='+encodeURIComponent(slug(p.slug)))}">Details →</a>${p.demo?`<a class="btn sm secondary" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`:''}</div></article>`).join('');
 }).catch(()=>{list.innerHTML='<div class="empty">Could not load content. Please try again later.</div>'})}
 const projectName=document.getElementById('coming-project');if(projectName){const value=new URLSearchParams(location.search).get('project');Promise.all([loadJson('projects'),loadJson('lab')]).then(([a,b])=>{const project=[...a,...b].find(x=>x.slug===value);if(project){projectName.textContent=project.title;document.title=project.title+' — Coming soon | Moayad Almohaishi'}}).catch(()=>{})}
 const newsletter=document.getElementById('newsletter-form');newsletter?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('newsletter-status').textContent='Newsletter subscriptions are not open yet. This form does not collect or store your address.'});
})();
