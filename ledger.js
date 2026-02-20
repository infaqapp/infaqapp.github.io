// ============================================================
//  INFAQ APP – PUBLIC LEDGER PAGE JAVASCRIPT
// ============================================================

// ── Mobile menu ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
}

// ── Allocation bars animate on scroll ─────────────────────
const allocBars = document.querySelectorAll('.alloc-bar-fill');
const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.w + '%';
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
allocBars.forEach(b => barObserver.observe(b));

// ── Leaderboard Data ──────────────────────────────────────
const causeColors = {
    '🕌 Masjid': { bg: '#2E6F4018', color: '#2E6F40' },
    '📚 Education': { bg: '#D4A01718', color: '#B8880E' },
    '🍲 Food': { bg: '#C0622B18', color: '#C0622B' },
    '💧 Water': { bg: '#5BA0C818', color: '#3a7ea8' },
};

const allTimeData = [
    { name: 'Mohammed Al-Rashid', city: 'Hyderabad', total: '₹2,18,400', months: 36, cause: '🕌 Masjid', joined: 'Jan 2023', initials: 'M', color: '#2E6F40' },
    { name: 'Fatima Begum', city: 'Mumbai', total: '₹1,94,700', months: 33, cause: '📚 Education', joined: 'Apr 2023', initials: 'F', color: '#D4A017' },
    { name: 'Ibrahim Khan', city: 'Delhi', total: '₹1,62,000', months: 27, cause: '🕌 Masjid', joined: 'Jul 2023', initials: 'I', color: '#1a5070' },
    { name: 'Aisha Siddiqui', city: 'Bengaluru', total: '₹1,38,500', months: 30, cause: '💧 Water', joined: 'Mar 2023', initials: 'A', color: '#5BA0C8' },
    { name: 'Omar Farooq', city: 'Chennai', total: '₹1,21,000', months: 24, cause: '🍲 Food', joined: 'Oct 2023', initials: 'O', color: '#C0622B' },
    { name: 'Zainab Hussain', city: 'Lucknow', total: '₹98,400', months: 24, cause: '📚 Education', joined: 'Nov 2023', initials: 'Z', color: '#8B6914' },
    { name: 'Yusuf Malik', city: 'Pune', total: '₹87,600', months: 18, cause: '🕌 Masjid', joined: 'Jun 2024', initials: 'Y', color: '#2E6F40' },
    { name: 'Khadija Ansari', city: 'Kolkata', total: '₹76,200', months: 21, cause: '🍲 Food', joined: 'Mar 2024', initials: 'K', color: '#733d2a' },
    { name: 'Salman Sheikh', city: 'Ahmedabad', total: '₹65,100', months: 15, cause: '💧 Water', joined: 'Nov 2024', initials: 'S', color: '#5BA0C8' },
    { name: 'Nadia Rahman', city: 'Jaipur', total: '₹54,800', months: 13, cause: '📚 Education', joined: 'Jan 2025', initials: 'N', color: '#D4A017' },
];

const monthData = [
    { name: 'Fatima Begum', city: 'Mumbai', total: '₹8,500', months: 33, cause: '📚 Education', joined: 'Apr 2023', initials: 'F', color: '#D4A017' },
    { name: 'Omar Farooq', city: 'Chennai', total: '₹7,200', months: 24, cause: '🍲 Food', joined: 'Oct 2023', initials: 'O', color: '#C0622B' },
    { name: 'Ibrahim Khan', city: 'Delhi', total: '₹6,800', months: 27, cause: '🕌 Masjid', joined: 'Jul 2023', initials: 'I', color: '#1a5070' },
    { name: 'Zainab Hussain', city: 'Lucknow', total: '₹5,400', months: 24, cause: '📚 Education', joined: 'Nov 2023', initials: 'Z', color: '#8B6914' },
    { name: 'Yusuf Malik', city: 'Pune', total: '₹4,900', months: 18, cause: '🕌 Masjid', joined: 'Jun 2024', initials: 'Y', color: '#2E6F40' },
    { name: 'Aisha Siddiqui', city: 'Bengaluru', total: '₹4,500', months: 30, cause: '💧 Water', joined: 'Mar 2023', initials: 'A', color: '#5BA0C8' },
    { name: 'Khadija Ansari', city: 'Kolkata', total: '₹4,100', months: 21, cause: '🍲 Food', joined: 'Mar 2024', initials: 'K', color: '#733d2a' },
    { name: 'Mohammed A.', city: 'Hyderabad', total: '₹4,000', months: 36, cause: '🕌 Masjid', joined: 'Jan 2023', initials: 'M', color: '#2E6F40' },
    { name: 'Salman Sheikh', city: 'Ahmedabad', total: '₹3,800', months: 15, cause: '💧 Water', joined: 'Nov 2024', initials: 'S', color: '#5BA0C8' },
    { name: 'Nadia Rahman', city: 'Jaipur', total: '₹3,500', months: 13, cause: '📚 Education', joined: 'Jan 2025', initials: 'N', color: '#D4A017' },
];

const yearData = allTimeData.map((d, i) => ({
    ...d,
    total: ['₹48,000', '₹42,300', '₹36,000', '₹32,400', '₹28,800', '₹24,000', '₹21,600', '₹18,000', '₹15,300', '₹12,600'][i]
}));

function renderLeaderboard(data) {
    const tbody = document.getElementById('lbBody');
    tbody.innerHTML = '';
    data.forEach((d, i) => {
        const rank = i + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : 'rank-other';
        const rankDisplay = rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank;
        const cause = d.cause;
        const causeStyle = causeColors[cause] || { bg: '#eee', color: '#666' };
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td><span class="rank-badge ${rankClass}">${rankDisplay}</span></td>
      <td>
        <div class="contrib-cell">
          <div class="contrib-avatar" style="background:${d.color}">${d.initials}</div>
          <div>
            <div class="contrib-name">${d.name}</div>
            <div class="contrib-sub">Verified UPI Contributor</div>
          </div>
        </div>
      </td>
      <td>${d.city}</td>
      <td class="amount-cell">${d.total}</td>
      <td class="months-cell"><span class="months-pip">${d.months} mo</span></td>
      <td>
        <span class="cause-chip" style="background:${causeStyle.bg};color:${causeStyle.color}">
          ${cause}
        </span>
      </td>
      <td style="font-size:.8rem;color:var(--text-l)">${d.joined}</td>
    `;
        tbody.appendChild(tr);
    });
}

// Filter buttons
const filters = document.querySelectorAll('.lb-filter');
const datasets = { alltime: allTimeData, month: monthData, year: yearData };

filters.forEach(f => {
    f.addEventListener('click', () => {
        filters.forEach(x => x.classList.remove('active'));
        f.classList.add('active');
        renderLeaderboard(datasets[f.dataset.filter]);
    });
});
renderLeaderboard(allTimeData);

// ── Transaction Feed ──────────────────────────────────────
const txnNames = [
    'A*** Khan', 'F*** Begum', 'M*** Shaikh', 'Z*** Siddiqui', 'S*** Ali',
    'R*** Hussain', 'N*** Ansari', 'Y*** Malik', 'K*** Rahman', 'T*** Sheikh',
    'H*** Qureshi', 'B*** Mirza', 'D*** Patel', 'O*** Farooq', 'J*** Baig',
];
const txnCauses = [
    { emoji: '🕌', label: 'Masjid Fund', color: '#2E6F4018', iconBg: '#2E6F4030' },
    { emoji: '📚', label: 'Education', color: '#D4A01718', iconBg: '#D4A01730' },
    { emoji: '🍲', label: 'Food Relief', color: '#C0622B18', iconBg: '#C0622B30' },
    { emoji: '💧', label: 'Clean Water', color: '#5BA0C818', iconBg: '#5BA0C830' },
];
const txnAmounts = ['₹100', '₹200', '₹300', '₹500', '₹750', '₹1,000', '₹1,500', '₹2,000'];
const txnCities = ['Mumbai', 'Delhi', 'Hyderabad', 'Bengaluru', 'Chennai', 'Pune', 'Kolkata', 'Lucknow', 'Jaipur', 'Ahmedabad'];

let txnOffset = 0;
function generateTxns(count) {
    const items = [];
    for (let i = 0; i < count; i++) {
        const cause = txnCauses[(txnOffset + i) % txnCauses.length];
        const name = txnNames[(txnOffset + i * 3) % txnNames.length];
        const city = txnCities[(txnOffset + i * 7) % txnCities.length];
        const amount = txnAmounts[(txnOffset + i * 5) % txnAmounts.length];
        const minsAgo = Math.floor((txnOffset + i) * 3.7 + 1);
        const timeLabel = minsAgo < 60
            ? `${minsAgo}m ago`
            : minsAgo < 1440
                ? `${Math.floor(minsAgo / 60)}h ago`
                : `${Math.floor(minsAgo / 1440)}d ago`;
        items.push({ cause, name, city, amount, timeLabel });
    }
    txnOffset += count;
    return items;
}

function renderTxns(txns, append = false) {
    const feed = document.getElementById('txnFeed');
    if (!append) feed.innerHTML = '';
    txns.forEach((t, idx) => {
        const item = document.createElement('div');
        item.className = 'txn-item';
        item.style.animationDelay = `${idx * 50}ms`;
        item.innerHTML = `
      <div class="txn-icon" style="background:${t.cause.iconBg}">${t.cause.emoji}</div>
      <div class="txn-body">
        <div class="txn-name">${t.name} · ${t.city}</div>
        <div class="txn-meta">Contributed to → <strong>${t.cause.label}</strong></div>
      </div>
      <div class="txn-amount">${t.amount}</div>
      <span class="txn-upi-badge">UPI</span>
      <div class="txn-time">${t.timeLabel}</div>
    `;
        feed.appendChild(item);
    });
}

renderTxns(generateTxns(8));

document.getElementById('loadMoreBtn').addEventListener('click', () => {
    renderTxns(generateTxns(6), true);
});

// Auto-push new live transaction every 6 seconds
setInterval(() => {
    const [newTxn] = generateTxns(1);
    const feed = document.getElementById('txnFeed');
    const item = document.createElement('div');
    item.className = 'txn-item';
    item.style.background = '#f0fff4';
    item.innerHTML = `
    <div class="txn-icon" style="background:${newTxn.cause.iconBg}">${newTxn.cause.emoji}</div>
    <div class="txn-body">
      <div class="txn-name">${newTxn.name} · ${newTxn.city}</div>
      <div class="txn-meta">Contributed to → <strong>${newTxn.cause.label}</strong></div>
    </div>
    <div class="txn-amount">${newTxn.amount}</div>
    <span class="txn-upi-badge">UPI</span>
    <div class="txn-time">just now 🟢</div>
  `;
    feed.prepend(item);
    setTimeout(() => { item.style.background = ''; }, 3000);
}, 6000);

// ── Monthly Trend Bar Chart (Plain Canvas) ─────────────────
const trendCanvas = document.getElementById('trendBar');
if (trendCanvas) {
    const tctx = trendCanvas.getContext('2d');
    trendCanvas.width = trendCanvas.parentElement.offsetWidth - 64;

    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const values = [820000, 940000, 1050000, 1180000, 1320000, 1490000, 1650000, 1820000, 2010000, 2280000, 2540000, 2820000];
    const maxV = Math.max(...values);

    const W = trendCanvas.width;
    const H = 300;
    trendCanvas.height = H;
    const padL = 70, padR = 20, padT = 30, padB = 50;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const barW = (chartW / months.length) * 0.55;
    const gap = chartW / months.length;

    // Draw grid lines
    const gridLines = 5;
    tctx.strokeStyle = '#e8f0ea';
    tctx.lineWidth = 1;
    for (let i = 0; i <= gridLines; i++) {
        const y = padT + (chartH / gridLines) * i;
        tctx.beginPath();
        tctx.moveTo(padL, y);
        tctx.lineTo(W - padR, y);
        tctx.stroke();
        // Y labels
        const val = maxV - (maxV / gridLines) * i;
        tctx.fillStyle = '#6b8070';
        tctx.font = '11px Outfit,system-ui,sans-serif';
        tctx.textAlign = 'right';
        tctx.fillText('₹' + (val / 100000).toFixed(1) + 'L', padL - 6, y + 4);
    }

    // Animate bars
    let progress = 0;
    function drawBars(prog) {
        tctx.clearRect(padL, padT, chartW, chartH);
        months.forEach((m, i) => {
            const x = padL + gap * i + (gap - barW) / 2;
            const pct = values[i] / maxV;
            const bH = chartH * pct * prog;
            const y = padT + chartH - bH;

            // Gradient fill
            const grad = tctx.createLinearGradient(0, y, 0, padT + chartH);
            grad.addColorStop(0, '#2E6F40');
            grad.addColorStop(1, '#89c99e');

            // Round top corners
            tctx.beginPath();
            const r = Math.min(6, barW / 2);
            tctx.moveTo(x + r, y);
            tctx.lineTo(x + barW - r, y);
            tctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
            tctx.lineTo(x + barW, padT + chartH);
            tctx.lineTo(x, padT + chartH);
            tctx.lineTo(x, y + r);
            tctx.quadraticCurveTo(x, y, x + r, y);
            tctx.closePath();
            tctx.fillStyle = i === months.length - 1 ? '#D4A017' : grad;
            tctx.fill();

            // Month label
            tctx.fillStyle = '#3d5245';
            tctx.font = '11px Outfit,system-ui,sans-serif';
            tctx.textAlign = 'center';
            tctx.fillText(m, x + barW / 2, H - padB + 18);

            // Value label on top (only when fully animated)
            if (prog === 1) {
                tctx.fillStyle = i === months.length - 1 ? '#D4A017' : '#2E6F40';
                tctx.font = 'bold 10px Outfit,system-ui,sans-serif';
                tctx.fillText('₹' + (values[i] / 100000).toFixed(1) + 'L', x + barW / 2, y - 5);
            }
        });
    }

    // Initial grid draw
    drawBars(0);

    const trendObs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            const start = performance.now();
            function animate(now) {
                const p = Math.min((now - start) / 1000, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                drawBars(ease);
                if (p < 1) requestAnimationFrame(animate);
                else drawBars(1);
            }
            requestAnimationFrame(animate);
            trendObs.disconnect();
        }
    }, { threshold: 0.2 });
    trendObs.observe(trendCanvas);
}

// ── Scroll reveal on ledger page ──────────────────────────
document.querySelectorAll('.alloc-card, .ledger-stat-card, .txn-item').forEach((el, i) => {
    el.classList.add('reveal');
});
const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
