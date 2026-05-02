/* ============================================================
   startup-hero.js
   ============================================================ */

// ── CONFIG LOADER (para el editor)
(function loadEditorConfig() {
  const urlParams = new URLSearchParams(window.location.search);
  const savedConfig = localStorage.getItem('startup-hero-config');

  if (savedConfig && urlParams.get('preview') === 'true') {
    try {
      const config = JSON.parse(savedConfig);
      window.STARTUP_HERO_CONFIG = config;
      applyConfigToPage(config);
    } catch (e) {
      console.error('Error loading config:', e);
    }
  }
})();

// Helper para actualizar texto o HTML de forma segura
function updateElement(selector, value, isHTML = false) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    if (isHTML) el.innerHTML = value;
    else el.textContent = value;
  });
}

function applyConfigToPage(config) {
  // General
  if (config.general?.productName) {
    document.querySelectorAll('.nav-brand').forEach(el => {
      const dot = el.querySelector('.nav-brand-dot');
      el.textContent = config.general.productName;
      if (dot) el.insertBefore(dot, el.firstChild);
    });
    document.title = `${config.general.productName} — ${config.general.tagline || 'Smart Web CR'}`;
  }
  if (config.general?.logoEmoji) {
    document.querySelectorAll('.nav-brand-dot').forEach(el => {
      const parent = el.parentElement;
      if (parent && parent.classList.contains('nav-brand')) {
        const existingEmoji = parent.querySelector('.brand-emoji');
        if (existingEmoji) existingEmoji.remove();
        const emoji = document.createElement('span');
        emoji.className = 'brand-emoji';
        emoji.textContent = config.general.logoEmoji;
        emoji.style.cssText = 'margin-right:4px;font-size:1.2rem';
        parent.insertBefore(emoji, parent.querySelector('.nav-brand-dot'));
      }
    });
  }

  // Contact
  if (config.contact?.email) {
    document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
      el.href = 'mailto:' + config.contact.email;
      el.textContent = config.contact.email;
    });
  }
  if (config.contact?.whatsapp) {
    document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
      el.href = 'https://wa.me/' + config.contact.whatsapp;
    });
  }

  // Colors
  if (config.colors?.accent) {
    document.documentElement.style.setProperty('--accent', config.colors.accent);
    const rgb = hexToRgb(config.colors.accent);
    if (rgb) {
      document.documentElement.style.setProperty('--accent-rgb', rgb.r + ', ' + rgb.g + ', ' + rgb.b);
    }
  }
  if (config.colors?.gold) {
    document.documentElement.style.setProperty('--gold', config.colors.gold);
  }

  // Nav
  if (config.nav?.links) {
    const navLinksEl = document.getElementById('nav-links');
    if (navLinksEl) {
      navLinksEl.innerHTML = config.nav.links.map(link =>
        `<li><a href="${link.href}">${link.text}</a></li>`
      ).join('');
    }
  }
  if (config.nav?.ctaText) {
    const navCta = document.querySelector('.btn-nav');
    if (navCta) navCta.textContent = config.nav.ctaText;
  }

  // Hero
  if (config.hero?.badgeText) updateElement('.hero-badge', config.hero.badgeText);

  if (config.hero?.title) {
    const em = config.hero.titleEm || '';
    const strong = config.hero.titleStrong || '';
    let html = config.hero.title;
    if (em) html = html.replace(em, `<em>${em}</em>`);
    if (strong) html = html.replace(strong, `<strong>${strong}</strong>`);
    updateElement('.hero-h1', html, true);
  }

  if (config.hero?.description) updateElement('.hero-p', config.hero.description);
  if (config.hero?.ctaPrimary) updateElement('.hero-btns .btn-primary', config.hero.ctaPrimary);
  if (config.hero?.ctaSecondary) updateElement('.hero-btns .btn-ghost', config.hero.ctaSecondary);

  if (config.hero?.socialProofText) {
    const text = document.querySelector('.hero-sp-text');
    if (text) {
      const stars = text.querySelector('.hero-sp-stars');
      text.textContent = config.hero.socialProofText;
      if (stars) text.insertBefore(stars, text.firstChild);
    }
  }
  if (config.hero?.socialProofStars) {
    const stars = document.querySelector('.hero-sp-stars');
    if (stars) stars.textContent = config.hero.socialProofStars;
  }

  // Trust Bar
  if (config.trustBar?.label) {
    const label = document.querySelector('.trust-label');
    if (label) label.textContent = config.trustBar.label;
  }
  if (config.trustBar?.logos) {
    const logosContainer = document.querySelector('.trust-logos');
    if (logosContainer) {
      logosContainer.innerHTML = config.trustBar.logos.map(logo =>
        `<span class="trust-logo">${logo}</span>`
      ).join('');
    }
  }

  // Features
  if (config.features?.eyebrow) {
    const eyebrow = document.querySelector('.features-header .eyebrow');
    if (eyebrow) eyebrow.textContent = config.features.eyebrow;
  }
  if (config.features?.title) {
    const title = document.querySelector('.features-header .section-title');
    if (title) {
      let html = config.features.title;
      if (config.features.titleEm) html = html.replace(config.features.titleEm, `<em>${config.features.titleEm}</em>`);
      title.innerHTML = html;
    }
  }
  if (config.features?.subtitle) {
    const sub = document.querySelector('.features-header .section-sub');
    if (sub) sub.textContent = config.features.subtitle;
  }
  if (config.features?.ctaText) {
    const cta = document.querySelector('.features-header .btn-ghost');
    if (cta) cta.textContent = config.features.ctaText;
  }
  if (config.features?.items) {
    const featCards = document.querySelectorAll('.feat-card');
    config.features.items.forEach((item, i) => {
      if (featCards[i]) {
        const iconEl = featCards[i].querySelector('.feat-ico');
        const titleEl = featCards[i].querySelector('h3');
        const descEl = featCards[i].querySelector('p');
        if (iconEl) iconEl.textContent = item.icon || '✨';
        if (titleEl) titleEl.textContent = item.title || '';
        if (descEl) descEl.textContent = item.description || '';
      }
    });
  }

  // Dashboard
  if (config.dashboard?.title) {
    const title = document.querySelector('.hc-name');
    if (title) title.textContent = config.dashboard.title;
  }
  if (config.dashboard?.subtitle) {
    const role = document.querySelector('.hc-role');
    if (role) role.textContent = config.dashboard.subtitle;
  }
  if (config.dashboard?.avatarEmoji) {
    const avatar = document.querySelector('.hc-avatar');
    if (avatar) avatar.textContent = config.dashboard.avatarEmoji;
  }
  if (config.dashboard?.stats) {
    const stats = document.querySelectorAll('.hc-stat');
    config.dashboard.stats.forEach((stat, i) => {
      if (stats[i]) {
        const valEl = stats[i].querySelector('.hc-stat-n');
        const lblEl = stats[i].querySelector('.hc-stat-l');
        if (valEl) valEl.textContent = stat.value;
        if (lblEl) lblEl.textContent = stat.label;
      }
    });
  }
  if (config.dashboard?.progressBars) {
    const progressContainers = document.querySelectorAll('.hc-progress');
    config.dashboard.progressBars.forEach((prog, i) => {
      if (progressContainers[i]) {
        const labelEl = progressContainers[i].querySelector('.hcp-label span:first-child');
        const percentEl = progressContainers[i].querySelector('.hcp-label span:last-child');
        const fillEl = progressContainers[i].querySelector('.hcp-fill');
        if (labelEl) labelEl.textContent = prog.label;
        if (percentEl) percentEl.textContent = prog.value + '%';
        if (fillEl) fillEl.style.width = prog.value + '%';
      }
    });
  }
  if (config.dashboard?.tags) {
    const tagsContainer = document.querySelector('.hc-tags');
    if (tagsContainer) {
      tagsContainer.innerHTML = config.dashboard.tags.map(tag =>
        `<span class="hc-tag">${tag}</span>`
      ).join('');
    }
  }
  if (config.dashboard?.floatBadges) {
    const floats = document.querySelectorAll('.hero-float');
    config.dashboard.floatBadges.forEach((badge, i) => {
      if (floats[i]) {
        const textNode = floats[i].childNodes[floats[i].childNodes.length - 1];
        if (textNode) textNode.textContent = ' ' + badge.text;
        const dot = floats[i].querySelector('.hf-dot');
        if (dot) {
          dot.classList.remove('green', 'blue');
          dot.classList.add(badge.color);
        }
      }
    });
  }

  // Pricing
  if (config.pricing?.eyebrow) {
    const eyebrow = document.querySelector('.pricing-header .eyebrow');
    if (eyebrow) eyebrow.textContent = config.pricing.eyebrow;
  }
  if (config.pricing?.title) {
    const title = document.querySelector('.pricing-header .section-title');
    if (title) {
      let html = config.pricing.title;
      if (config.pricing.titleEm) html = html.replace(config.pricing.titleEm, `<em>${config.pricing.titleEm}</em>`);
      title.innerHTML = html;
    }
  }
  if (config.pricing?.subtitle) {
    const sub = document.querySelector('.pricing-header .section-sub');
    if (sub) sub.textContent = config.pricing.subtitle;
  }
  if (config.pricing?.plans) {
    const cards = document.querySelectorAll('.price-card');
    config.pricing.plans.forEach((plan, i) => {
      if (cards[i]) {
        const nameEl = cards[i].querySelector('.price-plan');
        const numEl = cards[i].querySelector('.price-num');
        const descEl = cards[i].querySelector('.price-desc');
        const ctaEl = cards[i].querySelector('.btn');
        const badgeEl = cards[i].querySelector('.featured-badge');

        if (nameEl) nameEl.textContent = plan.name;
        if (numEl) {
          numEl.setAttribute('data-monthly', plan.priceMonthly);
          numEl.setAttribute('data-annual', plan.priceAnnual);
          numEl.textContent = plan.priceMonthly;
        }
        if (descEl) descEl.textContent = plan.description;
        if (ctaEl) ctaEl.textContent = plan.cta;

        if (plan.featured) {
          cards[i].classList.add('featured');
          if (badgeEl) badgeEl.textContent = plan.featuredLabel || 'Más popular';
        } else {
          cards[i].classList.remove('featured');
          if (badgeEl) badgeEl.remove();
        }

        // Features
        const featList = cards[i].querySelector('.price-features');
        if (featList && plan.features) {
          featList.innerHTML = plan.features.map(feat => `
            <li>
              <span class="pf-check ${feat.included ? 'yes' : 'no'}">${feat.included ? '✓' : '✗'}</span>
              ${feat.text}
            </li>
          `).join('');
        }
      }
    });
  }
  if (config.pricing?.toggleLabel1) {
    const btns = document.querySelectorAll('.pricing-toggle-btn');
    if (btns[0]) btns[0].textContent = config.pricing.toggleLabel1;
  }
  if (config.pricing?.toggleLabel2) {
    const btns = document.querySelectorAll('.pricing-toggle-btn');
    if (btns[1]) {
      const saveBadge = config.pricing.saveBadge || '-20%';
      btns[1].innerHTML = config.pricing.toggleLabel2 + ` <span class="save-badge">${saveBadge}</span>`;
    }
  }
  if (config.pricing?.footerText) {
    const footerText = document.querySelector('.pricing p:last-of-type');
    if (footerText) footerText.textContent = config.pricing.footerText;
  }

  // CTA
  if (config.cta?.eyebrow) {
    const eyebrow = document.querySelector('.cta-section .eyebrow');
    if (eyebrow) eyebrow.textContent = config.cta.eyebrow;
  }
  if (config.cta?.title) {
    const title = document.querySelector('.cta-section h2');
    if (title) {
      let html = config.cta.title;
      if (config.cta.titleEm) html = html.replace(config.cta.titleEm, `<em>${config.cta.titleEm}</em>`);
      title.innerHTML = html;
    }
  }
  if (config.cta?.description) {
    const p = document.querySelector('.cta-section p');
    if (p) p.textContent = config.cta.description;
  }
  if (config.cta?.ctaPrimary) {
    const btn = document.querySelector('.cta-btns .btn-primary');
    if (btn) btn.textContent = config.cta.ctaPrimary;
  }
  if (config.cta?.ctaSecondary) {
    const btn = document.querySelector('.cta-btns .btn-ghost');
    if (btn) {
      const svg = btn.querySelector('svg');
      btn.innerHTML = '';
      if (svg) btn.appendChild(svg);
      btn.appendChild(document.createTextNode(' ' + config.cta.ctaSecondary));
    }
  }
  if (config.cta?.note) {
    const note = document.querySelector('.cta-note');
    if (note) note.textContent = config.cta.note;
  }

  // Footer
  if (config.footer?.description) {
    const desc = document.querySelector('.footer-brand p');
    if (desc) desc.textContent = config.footer.description;
  }
  if (config.footer?.copyright) {
    const copyright = document.querySelector('.footer-bottom span:first-child');
    if (copyright) copyright.innerHTML = config.footer.copyright.replace('©', '© <span id="footer-year"></span>');
  }
  if (config.footer?.columns?.servicios) {
    const col = document.querySelectorAll('.footer-col')[0];
    if (col) {
      col.querySelector('h4').textContent = 'Servicios';
      col.querySelector('ul').innerHTML = config.footer.columns.servicios.map(link =>
        `<li><a href="#features">${link}</a></li>`
      ).join('');
    }
  }
  if (config.footer?.columns?.empresa) {
    const col = document.querySelectorAll('.footer-col')[1];
    if (col) {
      col.querySelector('h4').textContent = 'Empresa';
      col.querySelector('ul').innerHTML = config.footer.columns.empresa.map(link =>
        `<li><a href="#">${link}</a></li>`
      ).join('');
    }
  }
  if (config.footer?.columns?.contacto) {
    const col = document.querySelectorAll('.footer-col')[2];
    if (col) {
      col.querySelector('h4').textContent = 'Contacto';
      col.querySelector('ul').innerHTML = config.footer.columns.contacto.map(link => {
        if (link.includes('@')) return `<li><a href="mailto:${link}">${link}</a></li>`;
        if (link.toLowerCase().includes('whatsapp')) return `<li><a href="https://wa.me/${config.contact?.whatsapp || ''}" target="_blank">${link}</a></li>`;
        return `<li><span>${link}</span></li>`;
      }).join('');
    }
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// ── THEME
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const saved    = localStorage.getItem('sh-theme');
let isDark     = saved ? saved === 'dark' : true;

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (themeBtn) themeBtn.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('sh-theme', dark ? 'dark' : 'light');
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
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── PRICING TOGGLE (mensual / anual)
const btns   = document.querySelectorAll('.pricing-toggle-btn');
const prices = document.querySelectorAll('.price-num[data-monthly]');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const isAnnual = btn.dataset.period === 'annual';
    prices.forEach(p => {
      p.textContent = isAnnual ? p.dataset.annual : p.dataset.monthly;
    });
  });
});

// ── SMOOTH SCROLL for anchor links
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
