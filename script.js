// ============================================================
//  INFAQ APP – JAVASCRIPT
// ============================================================

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Scroll reveal ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.step-card, .cause-card, .testi-card, .impact-card, .dist-cause-item, .donation-input-wrap'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Counter animation ─────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2200;
  const start = performance.now();

  function formatNum(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return Math.round(n / 1_000) + 'K';
    return Math.round(n).toString();
  }

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatNum(Math.round(target * ease));
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = formatNum(target);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.impact-section, .hero-stats').forEach(el =>
  counterObserver.observe(el)
);

// ── Donut Chart ────────────────────────────────────────────
const causes = [
  { label: 'Masjid Fund',    pct: 30, color: '#2E6F40', emoji: '🕌' },
  { label: 'Education',      pct: 25, color: '#D4A017', emoji: '📚' },
  { label: 'Food Relief',    pct: 25, color: '#C0622B', emoji: '🍲' },
  { label: 'Clean Water',    pct: 20, color: '#5BA0C8', emoji: '💧' },
];

const canvas = document.getElementById('donutChart');
const ctx = canvas.getContext('2d');
const donutTotal = document.getElementById('donutTotal');
const distCauses = document.getElementById('distCauses');
const slider = document.getElementById('donationSlider');
const donationDisplay = document.getElementById('donationDisplay');

function drawDonut(amount) {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.42, inner = r * 0.58;
  let startAngle = -Math.PI / 2;

  causes.forEach(c => {
    const slice = (c.pct / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = c.color;
    ctx.fill();
    startAngle += slice;
  });

  // Inner white circle
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, 2 * Math.PI);
  ctx.fillStyle = '#f0f7f3';
  ctx.fill();

  donutTotal.textContent = '₹' + amount.toLocaleString('en-IN');
}

function buildCauseList(amount) {
  distCauses.innerHTML = '';
  causes.forEach(c => {
    const rupees = Math.round((c.pct / 100) * amount);
    const item = document.createElement('div');
    item.className = 'dist-cause-item';
    item.style.setProperty('--c', c.color);
    item.innerHTML = `
      <div class="dist-cause-icon">${c.emoji}</div>
      <div class="dist-cause-body">
        <h4>${c.label}</h4>
        <div class="dist-bar-wrap">
          <div class="dist-bar">
            <div class="dist-bar-fill" style="width:${c.pct}%;background:${c.color}"></div>
          </div>
          <span class="dist-pct">${c.pct}%</span>
        </div>
      </div>
      <div class="dist-amount" style="color:${c.color}">₹${rupees}</div>
    `;
    distCauses.appendChild(item);
  });
}

function updateSliderBackground(val) {
  const pct = ((val - 100) / (5000 - 100)) * 100;
  slider.style.background = `linear-gradient(to right, #2E6F40 ${pct}%, #ddd ${pct}%)`;
}

function refreshDistribution() {
  const val = parseInt(slider.value, 10);
  donationDisplay.textContent = val.toLocaleString('en-IN');
  updateSliderBackground(val);
  drawDonut(val);
  buildCauseList(val);
}

slider.addEventListener('input', refreshDistribution);
refreshDistribution(); // init

// ── Progress bars animate on scroll ───────────────────────
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.cause-progress-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 100);
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.cause-card').forEach(el => progressObserver.observe(el));

// ── Smooth active nav link highlight ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` && navbar.classList.contains('scrolled')
      ? '#2E6F40' : '';
  });
}, { passive: true });
