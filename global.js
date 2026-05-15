/* ===== GLOBAL.JS — Shared Logic Across All Pages ===== */

// ────────────────────────────────────────
// NAV SCROLL BEHAVIOR
// ────────────────────────────────────────
const navbar = document.getElementById('site-navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ────────────────────────────────────────
// MOBILE MENU
// ────────────────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const menuClose = document.getElementById('menu-close');

function openMenu() {
  mobileMenu?.classList.add('open');
  mobileOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu?.classList.remove('open');
  mobileOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburgerBtn?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
mobileOverlay?.addEventListener('click', closeMenu);

// ────────────────────────────────────────
// SCROLL ANIMATION OBSERVER
// ────────────────────────────────────────
window.animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      window.animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

window.triggerAnimations = () => {
  document.querySelectorAll('.animate-in:not(.visible)').forEach(el => window.animObserver.observe(el));
};

window.triggerAnimations();

// ────────────────────────────────────────
// DYNAMIC SETTINGS & GOLD RATES
// ────────────────────────────────────────
window.mgsSettings = {};
window.liveGoldRates = { 22: 14225, 24: 14936, silver: 285 };

// Global API Base URL resolver
window.getApiBase = () => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return window.location.port === '8000' ? `${protocol}//${hostname}:5000` : '';
};

// Global Image URL resolver
window.resolveImageUrl = (url) => {
  if (!url) return 'assets/placeholder.png';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  if (url.startsWith('/uploads') || url.startsWith('uploads')) {
    const cleanUrl = url.startsWith('/') ? url : '/' + url;
    return window.getApiBase() + cleanUrl;
  }
  return url;
};

function formatINR(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

async function fetchSettings() {
  try {
    const res = await fetch(window.getApiBase() + '/api/settings');
    const data = await res.json();
    window.mgsSettings = data;
    applySettings(data);
  } catch (e) {
    console.error('Failed to fetch settings', e);
  }
}

function applySettings(s) {
  // Apply Hero Title/Subtitle if on homepage
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroTitle && s.heroTitle) heroTitle.innerHTML = s.heroTitle.replace(/\n/g, '<br>');
  if (heroSubtitle && s.heroSubtitle) heroSubtitle.textContent = s.heroSubtitle;
}

async function updateTicker() {
  try {
    const res = await fetch(window.getApiBase() + '/api/rates');
    const data = await res.json();
    
    const updateRate = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = formatINR(val);
      const elDup = document.getElementById(id + '-dup');
      if (elDup) elDup.textContent = formatINR(val);
    };

    updateRate('gold22', data.gold22 * 10);
    updateRate('gold24', data.gold24 * 10);
    updateRate('silver', data.silver * 1000);

    if (data.tickerText) {
      const el = document.getElementById('ticker-custom');
      if (el) el.textContent = '✦ ' + data.tickerText + ' ✦';
      const elDup = document.getElementById('ticker-custom-dup');
      if (elDup) elDup.textContent = '✦ ' + data.tickerText + ' ✦';
    }

    window.liveGoldRates = { 22: data.gold22, 24: data.gold24, silver: data.silver };
    
    if (window.calcMiniGold) window.calcMiniGold();
  } catch (error) {
    console.error('Ticker update error:', error);
  }
}


// Initial fetch
fetchSettings();
updateTicker();
setInterval(updateTicker, 60000); // Every 1 minute

// ────────────────────────────────────────
// TOAST NOTIFICATION
// ────────────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.mgs-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'mgs-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: ${type === 'success' ? 'rgba(26,26,26,0.95)' : 'rgba(50,0,0,0.95)'};
    border: 1px solid ${type === 'success' ? 'var(--gold)' : '#e74c3c'};
    color: ${type === 'success' ? 'var(--gold-bright)' : '#e74c3c'};
    padding: 1rem 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    z-index: 9999;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    animation: slideInToast 0.4s ease;
    max-width: 350px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `@keyframes slideInToast { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
  document.head.appendChild(style);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
