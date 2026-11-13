// Remembers only a visitor-selected display preference; no tracking.
try {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
} catch (_) { /* Storage may be disabled. */ }
