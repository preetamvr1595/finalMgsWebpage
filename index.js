/* ===== INDEX.JS — Homepage Logic ===== */

// Dynamic content loaders
let products = [];
let offers = [];

async function loadInitialData() {
  await Promise.all([
    loadProducts(),
    loadOffers()
  ]);
}

async function loadProducts() {
  try {
    const res = await fetch(window.getApiBase() + '/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    products = data.map(p => ({
      id: p._id || p.id,
      name: p.name || 'Untitled',
      category: p.category || 'uncategorized',
      tag: p.tag || '',
      image: window.resolveImageUrl((p.images && p.images[0]) || p.image),
      images: (p.images || (p.image ? [p.image] : [])).map(img => window.resolveImageUrl(img)),
      hallmark: p.hallmark || 'HUID',
      purity: p.purity || '',
      weight: p.weight || '',
      priceLabel: (p.price ? '₹' + p.price.toLocaleString('en-IN') : (p.priceLabel || 'Inquire for Price')),
      desc: p.description || p.desc || ''
    }));
    
    // renderFilters();
    // renderProducts(activeFilter);
  } catch (e) {
    console.error('Error loading products', e);
  }
}



async function loadOffers() {
  try {
    const res = await fetch(window.getApiBase() + '/api/offers');
    const data = await res.json();
    offers = data.filter(o => o.active);
    if (offers.length > 0) {
      renderActiveOffer(offers[0]);
    }
  } catch (e) {
    console.error('Error loading offers', e);
  }
}

function renderActiveOffer(offer) {
  const section = document.getElementById('festive-offers');
  const container = document.getElementById('active-offer-content');
  if (!section || !container) return;

  section.style.display = 'block';
  container.innerHTML = `
    <div class="offer-poster-main">
      <img src="${offer.poster || 'assets/diwali_poster.png'}" alt="${offer.title}" id="active-poster">
      ${offer.endDate ? `
        <div class="offer-countdown">
          <span class="countdown-label">Offer Ends In</span>
          <div class="countdown-display" id="countdown-display">
            <div class="cd-unit"><span id="cd-days">--</span><span>Days</span></div>
            <div class="cd-sep">:</div>
            <div class="cd-unit"><span id="cd-hours">--</span><span>Hrs</span></div>
            <div class="cd-sep">:</div>
            <div class="cd-unit"><span id="cd-mins">--</span><span>Min</span></div>
            <div class="cd-sep">:</div>
            <div class="cd-unit"><span id="cd-secs">--</span><span>Sec</span></div>
          </div>
        </div>
      ` : ''}
    </div>
    <div class="offer-details-panel">
      <span class="label">SPECIAL FESTIVAL OFFER</span>
      <h3 id="offer-title">${offer.title}</h3>
      <p id="offer-desc">${offer.description}</p>
      <div class="offer-pills">
        <div class="offer-pill gold">${offer.wastage} WASTAGE</div>
        <div class="offer-pill green">${offer.discount} Making OFF</div>
        ${offer.extraValue ? `<div class="offer-pill amber">Extra ${offer.extraValue} on Old Gold</div>` : ''}
      </div>
      <div class="offer-actions">
        <a href="https://wa.me/919876543210?text=Hello!%20I'm%20interested%20in%20the%20${encodeURIComponent(offer.title)}" target="_blank" class="btn btn-whatsapp" id="offer-whatsapp-btn">✦ Claim on WhatsApp</a>
        <a href="offers.html" class="btn btn-outline">All Offers ▸</a>
      </div>
    </div>
  `;

  if (offer.endDate) {
    initCountdown(new Date(offer.endDate));
  }
}


let activeFilter = 'bridal';

function getWhatsAppMsg(productName) {
  return `https://wa.me/919876543210?text=Hello%20MGS%20Jewellery!%20I%27m%20interested%20in%20the%20*${encodeURIComponent(productName)}*.%20Please%20share%20the%20current%20price%20and%20availability.`;
}



// Filter buttons are now handled by renderFilters()

// Initial load
loadInitialData();

// HERO THUMBNAIL SWITCHER
const heroImg = document.getElementById('hero-product-img');
const floatTagName = document.querySelector('.tag-name');
const floatTagPurity = document.querySelector('.tag-purity');

document.querySelectorAll('.hero-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.hero-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    if (heroImg) {
      heroImg.style.opacity = '0';
      heroImg.style.transform = 'scale(1.05)';
      setTimeout(() => {
        heroImg.src = thumb.dataset.img;
        heroImg.alt = thumb.dataset.name + ' — HUID/BIS Hallmark, MGS Jewellery';
        heroImg.style.opacity = '1';
        heroImg.style.transform = 'scale(1)';
      }, 300);
    }
    if (floatTagName) floatTagName.textContent = thumb.dataset.name;
    if (floatTagPurity) floatTagPurity.textContent = thumb.dataset.purity;
  });
});

// OFFER COUNTDOWN TIMER
function initCountdown(endDate) {
  function updateCountdown() {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = pad(val); };
    el('cd-days', days);
    el('cd-hours', hours);
    el('cd-mins', mins);
    el('cd-secs', secs);
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// MINI GOLD CALCULATOR
window.calcMiniGold = function() {
  const weight = parseFloat(document.getElementById('mini-weight')?.value) || 0;
  const purity = parseInt(document.getElementById('mini-purity')?.value) || 22;
  const rate = window.liveGoldRates[purity] || 6842;
  const wastage = (parseFloat(window.mgsSettings.wastageRate) / 100) || 0.0799;
  const total = weight * rate * (1 + wastage);
  const resultEl = document.getElementById('mini-result');
  if (resultEl) {
    resultEl.textContent = '₹' + Math.round(total).toLocaleString('en-IN');
  }
}

document.getElementById('mini-weight')?.addEventListener('input', window.calcMiniGold);
document.getElementById('mini-purity')?.addEventListener('change', window.calcMiniGold);
