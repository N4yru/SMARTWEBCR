/* ============================================================
   creativecanvas.js
   ============================================================ */

// ── THEME
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const saved    = localStorage.getItem('cc-theme');
let isDark     = saved ? saved === 'dark' : true;

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (themeBtn) themeBtn.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('cc-theme', dark ? 'dark' : 'light');
}
applyTheme(isDark);
if (themeBtn) themeBtn.addEventListener('click', () => { isDark = !isDark; applyTheme(isDark); });

// ── NAV SCROLL
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ── REVEAL ON SCROLL
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── GALLERY FILTER
const filterBtns = document.querySelectorAll('.gf-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.opacity    = match ? '1' : '0';
      item.style.transform  = match ? '' : 'scale(.95)';
      setTimeout(() => { item.style.display = match ? '' : 'none'; }, match ? 0 : 300);
    });
  });
});

// ── LIGHTBOX (simple)
const lightbox     = document.getElementById('lightbox');
const lightboxEmoji = document.getElementById('lightbox-emoji');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCat   = document.getElementById('lightbox-cat');

document.querySelectorAll('.gi-view').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.gallery-item');
    const emoji  = item.querySelector('.gi-img').textContent.trim();
    const title  = item.dataset.title || 'Obra';
    const cat    = item.dataset.cat || '';
    lightboxEmoji.textContent = emoji;
    lightboxTitle.textContent = title;
    lightboxCat.textContent   = cat;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lb-close')) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ── CONTACT FORM
const form    = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando…';
    await new Promise(r => setTimeout(r, 1500));
    sendBtn.textContent = '✓ ¡Mensaje enviado!';
    sendBtn.style.background = '#22C55E';
    form.reset();
    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Enviar mensaje →';
      sendBtn.style.background = '';
    }, 3000);
  });
}

// ── SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── FOOTER YEAR
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
