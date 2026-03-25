// ══════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════
function doLogin() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('adminApp').style.display = 'block';
  initDashboard();
}
function doLogout() {
  document.getElementById('adminApp').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
}
// Auto-login since admin is assumed signed in
window.onload = () => {
  document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('en-GB', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  doLogin();
};

// ══════════════════════════════════════════
// NAV
// ══════════════════════════════════════════
function showSection(id, el) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  const titles = {dashboard:'Dashboard', bookings:'All Bookings', users:'User Management', pending:'Pending Approvals', packages:'Tour Package Management', promos:'Promotional Codes', inquiries:'Customer Inquiries', analytics:'Booking Analytics', reports:'Revenue & Occupancy Reports'};
  document.getElementById('topbarTitle').textContent = titles[id] || id;
}
function setFilter(el) {
  el.closest('.filter-bar').querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ══════════════════════════════════════════
// MODALS
// ══════════════════════════════════════════
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.addEventListener('click', e => { if (e.target.classList.contains('modal-bg')) e.target.classList.remove('open'); });

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => t.style.transform = 'translateX(-50%) translateY(80px)', 3000);
}

// ══════════════════════════════════════════
// DATA
// ══════════════════════════════════════════
const bookingsData = [
  { ref:'TB-2026-04821', guest:'Charlotte W.', type:'Direct Customer', hotel:'Amanwella Tangalle', dates:'Apr 5–8, 2026', amount:'$2,550', status:'confirmed' },
  { ref:'TB-2026-04820', guest:'Rajiv Mehta (Corp)', type:'Corporate', hotel:'Cinnamon Grand Colombo', dates:'Apr 3–5, 2026', amount:'$840', status:'pending' },
  { ref:'TB-2026-04819', guest:'Emma & James T.', type:'Honeymooner', hotel:'Kahanda Kanda', dates:'Apr 12–19, 2026', amount:'$1,740', status:'confirmed' },
  { ref:'TB-2026-04818', guest:'Stefan Müller', type:'Direct Customer', hotel:'Ella Jungle Resort', dates:'Apr 9–12, 2026', amount:'$435', status:'processing' },
  { ref:'TB-2026-04817', guest:'Fathima Ismail', type:'Direct Customer', hotel:'Santani Wellness', dates:'Apr 7–10, 2026', amount:'$1,260', status:'confirmed' },
  { ref:'TB-2026-04816', guest:'Jetwing Travels (Agent)', type:'Travel Agent', hotel:'Sigiriya Water Garden ×12', dates:'Apr 10–13, 2026', amount:'$7,440', status:'confirmed' },
  { ref:'TB-2026-04815', guest:'David & Family', type:'Family Group', hotel:'Shangri-La Hambantota', dates:'Apr 15–20, 2026', amount:'$3,100', status:'pending' },
  { ref:'TB-2026-04814', guest:'Aitken Spence (Agent)', type:'Travel Agent', hotel:'Heritance Kandalama ×8', dates:'Apr 20–23, 2026', amount:'$5,120', status:'cancelled' },
];

const usersData = [
  { name:'Charlotte Whitfield', email:'c.whitfield@email.com', type:'Direct Customer', joined:'Jan 2025', bookings:7, loyalty:3200, status:'approved' },
  { name:'Rajiv Mehta', email:'r.mehta@techcorp.com', type:'Corporate Partner', joined:'Mar 2025', bookings:12, loyalty:5400, status:'approved' },
  { name:'Emma & James Taylor', email:'emma.t@email.com', type:'Honeymooner', joined:'Feb 2026', bookings:1, loyalty:450, status:'approved' },
  { name:'Stefan Müller', email:'stefan.m@gmail.com', type:'Direct Customer', joined:'Nov 2024', bookings:3, loyalty:1100, status:'approved' },
  { name:'Jetwing Travels', email:'bookings@jetwing.com', type:'Travel Agent', joined:'Jan 2024', bookings:184, loyalty:0, status:'approved' },
  { name:'Aitken Spence Tours', email:'trade@aitkenspence.lk', type:'Travel Agent', joined:'Feb 2024', bookings:247, loyalty:0, status:'approved' },
  { name:'TechSolutions Lanka', email:'admin@techsol.lk', type:'Corporate Partner', joined:'Apr 2025', bookings:28, loyalty:0, status:'review' },
  { name:'Fathima Ismail', email:'fathima.i@email.com', type:'Direct Customer', joined:'Jun 2024', bookings:5, loyalty:2800, status:'approved' },
];

const packagesData = [
  { name:'Pearl of the Indian Ocean', type:'Direct Customer', duration:'7 Days / 6 Nights', price:'$1,290', bookings:48, status:'published' },
  { name:'Southern Coast Escape', type:'Direct Customer', duration:'5 Days / 4 Nights', price:'$890', bookings:62, status:'published' },
  { name:'Honeymoon in Paradise', type:'Honeymoon', duration:'10 Days / 9 Nights', price:'$3,200', bookings:29, status:'published' },
  { name:'Corporate Team Retreat', type:'Corporate', duration:'3 Days / 2 Nights', price:'$2,800', bookings:11, status:'published' },
  { name:'Family Adventure Package', type:'Family', duration:'8 Days / 7 Nights', price:'$2,100', bookings:19, status:'published' },
  { name:'Wildlife & Jungle Explorer', type:'Direct Customer', duration:'6 Days / 5 Nights', price:'$1,450', bookings:35, status:'published' },
  { name:'Wellness & Ayurveda Retreat', type:'Direct Customer', duration:'7 Days / 6 Nights', price:'$1,890', bookings:22, status:'draft' },
  { name:'Agent Group Tour Package', type:'Travel Agent', duration:'12 Days / 11 Nights', price:'$4,800', bookings:8, status:'draft' },
];

const promosData = [
  { code:'COASTAL10', discount:'10%', type:'All Users', uses:142, max:500, expires:'30 Apr 2026', status:'published' },
  { code:'SUMMER20', discount:'20%', type:'Direct Customer', uses:89, max:200, expires:'31 May 2026', status:'published' },
  { code:'AGENT15', discount:'15%', type:'Travel Agent', uses:64, max:100, expires:'31 Dec 2026', status:'published' },
  { code:'WELCOME5', discount:'5%', type:'New Users', uses:312, max:1000, expires:'31 Dec 2026', status:'published' },
  { code:'TB2026', discount:'12%', type:'All Users', uses:198, max:300, expires:'31 Mar 2026', status:'draft' },
  { code:'HONEY30', discount:'30%', type:'Honeymooner', uses:14, max:50, expires:'30 Jun 2026', status:'published' },
];

const inquiriesData = [
  { id:'INQ-0081', from:'Charlotte W.', subject:'Cancellation Refund for TB-2026-04821', type:'Direct Customer', received:'25 Mar 2026', priority:'High', status:'open' },
  { id:'INQ-0080', from:'Jetwing Travels', subject:'Group Booking Invoice Request', type:'Travel Agent', received:'24 Mar 2026', priority:'Medium', status:'open' },
  { id:'INQ-0079', from:'Stefan M.', subject:'Room upgrade availability', type:'Direct Customer', received:'23 Mar 2026', priority:'Low', status:'open' },
  { id:'INQ-0078', from:'TechSolutions Lanka', subject:'Corporate account B2B portal access', type:'Corporate', received:'22 Mar 2026', priority:'High', status:'open' },
  { id:'INQ-0077', from:'Emma Taylor', subject:'Honeymoon package customisation', type:'Honeymooner', received:'22 Mar 2026', priority:'Medium', status:'open' },
  { id:'INQ-0076', from:'Aitken Spence', subject:'Trade pricing for April group', type:'Travel Agent', received:'21 Mar 2026', priority:'Medium', status:'processing' },
  { id:'INQ-0075', from:'David S.', subject:'Children meal preferences for Yala', type:'Family', received:'20 Mar 2026', priority:'Low', status:'resolved' },
];

const pendingB2C = [
  { name:'Nisal Perera', email:'nisal.p@email.com', type:'Tourist', submitted:'Today, 9:14 AM' },
  { name:'Anya Sharma', email:'anya.s@gmail.com', type:'Solo Traveller', submitted:'Today, 7:30 AM' },
  { name:'Mohamed Farhan', email:'mfarhan@email.com', type:'Family Group', submitted:'Yesterday, 4:15 PM' },
];
const pendingB2B = [
  { name:'Walker Tours Pvt Ltd', email:'info@walkertours.lk', type:'Travel Agent', submitted:'Today, 10:02 AM' },
  { name:'SLT Digital Corp', email:'hr@sltdigital.lk', type:'Corporate Partner', submitted:'Yesterday, 2:00 PM' },
  { name:'Saffron Travels', email:'saffron@travel.lk', type:'Travel Agent', submitted:'24 Mar 2026' },
  { name:'Colombo Holdings', email:'admin@colombohold.lk', type:'Corporate Partner', submitted:'23 Mar 2026' },
];

const revenueData = [
  { month:'January', direct:'$68K', agents:'$42K', corporate:'$28K', total:'$138K', occ:'71%', target:'+2%' },
  { month:'February', direct:'$72K', agents:'$48K', corporate:'$31K', total:'$151K', occ:'74%', target:'+5%' },
  { month:'March', direct:'$89K', agents:'$54K', corporate:'$38K', total:'$181K', occ:'78%', target:'+8%' },
  { month:'April (YTD)', direct:'$94K', agents:'$58K', corporate:'$42K', total:'$194K', occ:'79%', target:'+10%' },
];

// ══════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════
function initDashboard() {
  renderBarChart();
  renderActivity();
  renderBookings();
  renderUsers();
  renderPending();
  renderPackages();
  renderPromos();
  renderInquiries();
  renderAnalytics();
  renderRevenue();
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const confirmed = [68,72,89,94,102,118,126,121,108,97,85,0];
const pending   = [12,15,18,21,24,19,22,20,17,14,11,0];

function renderBarChart() {
  const el = document.getElementById('barChart');
  if (!el) return;
  el.innerHTML = months.map((m,i) => `
    <div class="bar-group">
      <div class="bar-wrap">
        <div class="bar" style="height:${confirmed[i]*1.1}px;background:var(--deep-teal)" title="${confirmed[i]} confirmed"></div>
        <div class="bar" style="height:${pending[i]*2}px;background:var(--gold)" title="${pending[i]} pending"></div>
      </div>
      <div class="bar-label">${m}</div>
    </div>
  `).join('');
}

function renderActivity() {
  const items = [
    { icon:'fas fa-user-plus', bg:'#DCFCE7', color:'#16A34A', title:'New user registered: Nisal Perera', time:'2 minutes ago' },
    { icon:'fas fa-suitcase', bg:'#DBEAFE', color:'#1D4ED8', title:'New booking: TB-2026-04821 — Amanwella', time:'14 minutes ago' },
    { icon:'fas fa-exclamation-circle', bg:'#FEF9C3', color:'#854D0E', title:'Inquiry INQ-0081 marked High Priority', time:'28 minutes ago' },
    { icon:'fas fa-check-circle', bg:'#DCFCE7', color:'#16A34A', title:'B2B approval granted: Jetwing Travels', time:'1 hour ago' },
    { icon:'fas fa-tag', bg:'#FCE7F3', color:'#BE185D', title:'Promo code HONEY30 created', time:'2 hours ago' },
    { icon:'fas fa-times-circle', bg:'#FEE2E2', color:'#B91C1C', title:'Booking TB-2026-04814 cancelled', time:'3 hours ago' },
  ];
  document.getElementById('activityFeed').innerHTML = items.map(i => `
    <div class="activity-item">
      <div class="activity-icon" style="background:${i.bg};color:${i.color}"><i class="${i.icon}"></i></div>
      <div class="activity-text">
        <div class="activity-title">${i.title}</div>
        <div class="activity-time">${i.time}</div>
      </div>
    </div>
  `).join('');
}

function statusBadge(s) {
  return `<span class="status-badge status-${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</span>`;
}

function renderBookings() {
  document.getElementById('bookingsTable').innerHTML = bookingsData.map(b => `
    <tr>
      <td><code style="font-size:12px;color:var(--deep-teal)">${b.ref}</code></td>
      <td>${b.guest}</td>
      <td><span style="font-size:11px;color:var(--text-mid)">${b.type}</span></td>
      <td>${b.hotel}</td>
      <td style="font-size:12px;color:var(--text-mid)">${b.dates}</td>
      <td style="font-weight:700">${b.amount}</td>
      <td>${statusBadge(b.status)}</td>
      <td><div style="display:flex;gap:6px">
        <button class="btn-sm btn-outline" onclick="showToast('Viewing booking ${b.ref}')">View</button>
        ${b.status==='pending'?`<button class="btn-sm btn-primary" onclick="showToast('✅ Booking ${b.ref} confirmed!')">Confirm</button>`:''}
        ${b.status==='confirmed'?`<button class="btn-sm btn-danger" onclick="showToast('❌ Booking ${b.ref} cancelled')">Cancel</button>`:''}
      </div></td>
    </tr>
  `).join('');
}

const colors = ['#0B6E4F','#C9A84C','#3B82F6','#E05A40','#7C3AED','#059669','#D97706','#DC2626'];
function renderUsers() {
  document.getElementById('usersTable').innerHTML = usersData.map((u,i) => `
    <tr>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div style="width:34px;height:34px;border-radius:50%;background:${colors[i%colors.length]};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">${u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
        <span style="font-weight:600">${u.name}</span>
      </div></td>
      <td style="color:var(--text-mid);font-size:12px">${u.email}</td>
      <td><span style="font-size:11px;background:#F1F5F9;padding:3px 8px;border-radius:20px;font-weight:600">${u.type}</span></td>
      <td style="color:var(--text-mid);font-size:12px">${u.joined}</td>
      <td style="font-weight:600">${u.bookings}</td>
      <td>${u.loyalty > 0 ? `<span style="color:var(--gold);font-weight:700">👑 ${u.loyalty.toLocaleString()}</span>` : '—'}</td>
      <td>${statusBadge(u.status)}</td>
      <td><div style="display:flex;gap:6px">
        <button class="btn-sm btn-outline" onclick="showToast('Viewing profile: ${u.name}')">View</button>
        <button class="btn-sm btn-danger" onclick="showToast('Account for ${u.name} deleted')">Delete</button>
      </div></td>
    </tr>
  `).join('');
}

function renderPending() {
  const b2cEl = document.getElementById('b2cApprovals');
  const b2bEl = document.getElementById('b2bApprovals');
  if (b2cEl) b2cEl.innerHTML = pendingB2C.map(u => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#FAFBFC;border-radius:10px;margin-bottom:10px">
      <div style="width:40px;height:40px;border-radius:50%;background:var(--deep-teal);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0">${u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
      <div style="flex:1">
        <div style="font-weight:600;font-size:14px">${u.name}</div>
        <div style="font-size:12px;color:var(--text-light)">${u.email} · ${u.type} · ${u.submitted}</div>
      </div>
      <div style="display:flex;gap:7px">
        <button class="btn-sm btn-primary" onclick="this.closest('div').parentElement.remove();showToast('✅ ${u.name} approved!')">Approve</button>
        <button class="btn-sm btn-danger" onclick="this.closest('div').parentElement.remove();showToast('❌ ${u.name} rejected')">Reject</button>
      </div>
    </div>
  `).join('');
  if (b2bEl) b2bEl.innerHTML = pendingB2B.map(u => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#FAFBFC;border-radius:10px;margin-bottom:10px">
      <div style="width:40px;height:40px;border-radius:50%;background:#3B82F6;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0">${u.name.substring(0,2).toUpperCase()}</div>
      <div style="flex:1">
        <div style="font-weight:600;font-size:14px">${u.name}</div>
        <div style="font-size:12px;color:var(--text-light)">${u.email} · ${u.type} · ${u.submitted}</div>
      </div>
      <div style="display:flex;gap:7px">
        <button class="btn-sm btn-primary" onclick="this.closest('div').parentElement.remove();showToast('✅ ${u.name} B2B access approved!')">Approve</button>
        <button class="btn-sm btn-danger" onclick="this.closest('div').parentElement.remove();showToast('❌ ${u.name} rejected')">Reject</button>
      </div>
    </div>
  `).join('');
}

function renderPackages() {
  document.getElementById('packagesTable').innerHTML = packagesData.map(p => `
    <tr>
      <td style="font-weight:600">${p.name}</td>
      <td><span style="font-size:11px;background:#F1F5F9;padding:3px 8px;border-radius:20px;font-weight:600">${p.type}</span></td>
      <td style="color:var(--text-mid);font-size:12px">${p.duration}</td>
      <td style="font-weight:700;color:var(--deep-teal)">${p.price}</td>
      <td style="font-weight:600">${p.bookings}</td>
      <td>${statusBadge(p.status)}</td>
      <td><div style="display:flex;gap:6px">
        <button class="btn-sm btn-outline" onclick="showToast('Editing: ${p.name}')"><i class="fas fa-edit"></i> Edit</button>
        ${p.status==='draft'?`<button class="btn-sm btn-gold" onclick="showToast('🚀 ${p.name} published!')">Publish</button>`:`<button class="btn-sm" style="padding:5px 12px;border:1.5px solid var(--border);border-radius:7px;cursor:pointer;font-size:12px;font-weight:600" onclick="showToast('${p.name} unpublished')">Unpublish</button>`}
        <button class="btn-sm btn-danger" onclick="showToast('🗑 ${p.name} removed')"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>
  `).join('');
}

function renderPromos() {
  document.getElementById('promosTable').innerHTML = promosData.map(p => `
    <tr>
      <td><span class="promo-badge">${p.code}</span></td>
      <td style="font-weight:700;color:var(--deep-teal)">${p.discount}</td>
      <td style="font-size:12px;color:var(--text-mid)">${p.type}</td>
      <td>${p.uses}</td>
      <td>${p.max}</td>
      <td style="font-size:12px;color:var(--text-mid)">${p.expires}</td>
      <td>${statusBadge(p.status)}</td>
      <td><div style="display:flex;gap:6px">
        <button class="btn-sm btn-outline" onclick="showToast('Editing promo: ${p.code}')">Edit</button>
        <button class="btn-sm btn-danger" onclick="showToast('🗑 Code ${p.code} deleted')">Delete</button>
      </div></td>
    </tr>
  `).join('');
}

const priorityColors = { High:'#FEE2E2', Medium:'#FEF9C3', Low:'#F1F5F9' };
const priorityText   = { High:'#B91C1C', Medium:'#854D0E', Low:'#64748B' };
function renderInquiries() {
  document.getElementById('inquiriesTable').innerHTML = inquiriesData.map(i => `
    <tr>
      <td><code style="font-size:12px;color:var(--deep-teal)">${i.id}</code></td>
      <td style="font-weight:600">${i.from}</td>
      <td>${i.subject}</td>
      <td><span style="font-size:11px;background:#F1F5F9;padding:3px 8px;border-radius:20px;font-weight:600">${i.type}</span></td>
      <td style="font-size:12px;color:var(--text-mid)">${i.received}</td>
      <td><span style="font-size:11px;background:${priorityColors[i.priority]};color:${priorityText[i.priority]};padding:3px 8px;border-radius:20px;font-weight:700">${i.priority}</span></td>
      <td>${statusBadge(i.status)}</td>
      <td><button class="btn-sm btn-primary" onclick="openReply('${i.id}','${i.subject}')"><i class="fas fa-reply"></i> Reply</button></td>
    </tr>
  `).join('');
}
function openReply(id, subject) {
  document.getElementById('replySubject').textContent = `Ticket ${id}: ${subject}`;
  openModal('replyModal');
}

const destData = [
  { name:'Galle', val:82, color:'#0B6E4F' }, { name:'Colombo', val:74, color:'#3B82F6' },
  { name:'Kandy', val:68, color:'#C9A84C' }, { name:'Sigiriya', val:61, color:'#7C3AED' },
  { name:'Mirissa', val:57, color:'#E05A40' }, { name:'Ella', val:52, color:'#059669' },
  { name:'Trincomalee', val:44, color:'#D97706' }, { name:'Yala', val:39, color:'#DC2626' },
];
const engData = [
  { name:'Page Views (K)', val:88, color:'#0B6E4F' }, { name:'Search Queries (K)', val:64, color:'#3B82F6' },
  { name:'Hotel Views (K)', val:52, color:'#C9A84C' }, { name:'Wishlist Saves (K)', val:28, color:'#7C3AED' },
  { name:'Bookings Started (K)', val:18, color:'#E05A40' }, { name:'Bookings Completed (K)', val:12, color:'#059669' },
];
function renderAnalytics() {
  const d = document.getElementById('destAnalytics');
  if (d) d.innerHTML = destData.map(r => `
    <div class="analytics-bar-row">
      <div class="analytics-bar-label">${r.name}</div>
      <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:${r.val}%;background:${r.color}"></div></div>
      <div class="analytics-bar-val">${r.val} bkgs</div>
    </div>
  `).join('');
  const e = document.getElementById('engagementAnalytics');
  if (e) e.innerHTML = engData.map(r => `
    <div class="analytics-bar-row">
      <div class="analytics-bar-label">${r.name}</div>
      <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:${r.val}%;background:${r.color}"></div></div>
      <div class="analytics-bar-val">${r.val}K</div>
    </div>
  `).join('');
}

function renderRevenue() {
  const colors2 = { up: '#16A34A', down: '#B91C1C' };
  document.getElementById('revenueTable').innerHTML = revenueData.map(r => `
    <tr>
      <td style="font-weight:700">${r.month}</td>
      <td>${r.direct}</td>
      <td>${r.agents}</td>
      <td>${r.corporate}</td>
      <td style="font-weight:700;color:var(--deep-teal)">${r.total}</td>
      <td><span style="font-weight:700">${r.occ}</span></td>
      <td><span style="color:${colors2.up};font-weight:700">${r.target}</span></td>
    </tr>
  `).join('');
}