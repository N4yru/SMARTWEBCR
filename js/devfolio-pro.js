/* ============================================================
   devfolio-pro.js
   ============================================================ */

// ── THEME
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const saved    = localStorage.getItem('df-theme');
let isDark     = saved ? saved === 'dark' : true;

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (themeBtn) themeBtn.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('df-theme', dark ? 'dark' : 'light');
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

// ── ACTIVE NAV ON SCROLL
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

// ── REVEAL ON SCROLL
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        // Also trigger skill bars
        entry.target.querySelectorAll('.skill-card').forEach(card => {
          card.classList.add('visible');
        });
      }, i * 80);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Skill cards individual observer for bar animation
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(el => skillObs.observe(el));

// ── TYPING EFFECT
const roles = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'JavaScript Expert',
  'Web Craftsman',
];
let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typingEl = document.querySelector('.typing-text');

function type() {
  if (!typingEl) return;
  const current = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(type, isDeleting ? 60 : 90);
}
type();

// ── SKILLS FILTER
const tabs = document.querySelectorAll('.skills-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// ── EXPERIENCE TABS
const expItems  = document.querySelectorAll('.exp-item');
const expDetail = document.getElementById('exp-detail');

const expData = [
  {
    period:  '2023 — Presente',
    role:    'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    desc:    'Lideré el rediseño completo de la plataforma principal usando React y TypeScript. Mejoré el rendimiento en un 60% y reduje el tiempo de carga de 4.2s a 1.1s. Mentoré a 3 desarrolladores junior.',
    techs:   ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL', 'Jest'],
  },
  {
    period:  '2021 — 2023',
    role:    'Frontend Developer',
    company: 'Startup Innovate',
    desc:    'Desarrollé e implementé más de 15 features en el producto SaaS desde cero. Trabajé en estrecha colaboración con diseño y producto para traducir wireframes en interfaces funcionales.',
    techs:   ['React', 'Redux', 'SCSS', 'Node.js', 'PostgreSQL'],
  },
  {
    period:  '2020 — 2021',
    role:    'Junior Web Developer',
    company: 'Digital Agency CR',
    desc:    'Construí sitios web y landing pages para más de 20 clientes de distintos sectores. Implementé integraciones con APIs de terceros y optimicé el SEO técnico.',
    techs:   ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP'],
  },
];

function setActiveExp(index) {
  expItems.forEach((item, i) => item.classList.toggle('active', i === index));
  const d = expData[index];
  expDetail.innerHTML = `
    <div class="exp-detail-period">${d.period}</div>
    <h3>${d.role}</h3>
    <div class="exp-detail-company">${d.company}</div>
    <p>${d.desc}</p>
    <div class="exp-detail-techs">
      ${d.techs.map(t => `<span class="exp-tech">${t}</span>`).join('')}
    </div>
  `;
}
expItems.forEach((item, i) => {
  item.addEventListener('click', () => setActiveExp(i));
});
setActiveExp(0);

// ── CONTACT FORM
const form    = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando…';

    // Simulate send — reemplazá con tu endpoint real (Formspree, etc.)
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
