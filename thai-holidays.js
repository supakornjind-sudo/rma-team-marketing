/**
 * ============================================================
 * Thai Holiday — โมดูลวันสำคัญ/วันหยุด (แยกจากระบบเดิม 100%)
 * - ไม่แตะ Calendar เดิม / ระบบงาน / สมาชิก / Google Sheets / API
 * - ตัวแปร ฟังก์ชัน และ CSS ใช้ prefix thaiHoliday / thai-holiday- ทั้งหมด
 * - เป็นหน้าอ่านอย่างเดียว ข้อมูลอยู่ในไฟล์นี้ ไม่ใช้ Local Storage
 * - วันที่มีหมายเหตุ (ตามจันทรคติ)/(โดยประมาณ) ควรเช็คประกาศทางการอีกครั้ง
 * ============================================================
 */

/* ---------- ประเภท ---------- */
const THAI_HOLIDAY_TYPES = {
  gov:  { label: 'วันหยุดราชการ/วันสำคัญไทย', color: '#c0392b', emoji: '🔴' },
  mkt:  { label: 'วันสำคัญทางการตลาด',        color: '#1c7c47', emoji: '🟢' },
  fest: { label: 'เทศกาล',                     color: '#2c5d9e', emoji: '🔵' },
  intl: { label: 'วันสากล',                    color: '#e0641f', emoji: '🟠' },
};

/* ---------- ข้อมูลวันสำคัญ (d = วันเริ่ม, end = วันสิ้นสุดถ้ามีหลายวัน) ---------- */
const THAI_HOLIDAY_DATA = [
  /* ===== 2026 ===== */
  { d:'2026-01-01', name:'วันขึ้นปีใหม่', type:'gov' },
  { d:'2026-01-10', name:'วันเด็กแห่งชาติ', type:'mkt' },
  { d:'2026-01-16', name:'วันครู', type:'mkt' },
  { d:'2026-02-14', name:"วันวาเลนไทน์ (Valentine's Day)", type:'intl' },
  { d:'2026-02-17', name:'วันตรุษจีน', type:'fest' },
  { d:'2026-03-03', name:'วันมาฆบูชา', type:'gov' },
  { d:'2026-03-08', name:'วันสตรีสากล', type:'intl' },
  { d:'2026-03-25', end:'2026-04-05', name:'บางกอกมอเตอร์โชว์ (โดยประมาณ)', type:'mkt' },
  { d:'2026-04-01', name:"April Fool's Day", type:'intl' },
  { d:'2026-04-06', name:'วันจักรี', type:'gov' },
  { d:'2026-04-13', end:'2026-04-15', name:'วันสงกรานต์', type:'gov' },
  { d:'2026-04-22', name:'วันคุ้มครองโลก (Earth Day)', type:'intl' },
  { d:'2026-05-01', name:'วันแรงงานแห่งชาติ', type:'gov' },
  { d:'2026-05-04', name:'วันฉัตรมงคล', type:'gov' },
  { d:'2026-05-31', name:'วันวิสาขบูชา', type:'gov' },
  { d:'2026-06-01', name:'หยุดชดเชยวันวิสาขบูชา', type:'gov' },
  { d:'2026-06-03', name:'วันเฉลิมพระชนมพรรษา สมเด็จพระราชินี', type:'gov' },
  { d:'2026-06-05', name:'วันสิ่งแวดล้อมโลก', type:'intl' },
  { d:'2026-06-26', name:'วันสุนทรภู่', type:'mkt' },
  { d:'2026-07-28', name:'วันเฉลิมพระชนมพรรษา ร.10', type:'gov' },
  { d:'2026-07-29', name:'วันอาสาฬหบูชา', type:'gov' },
  { d:'2026-07-30', name:'วันเข้าพรรษา', type:'gov' },
  { d:'2026-08-12', name:'วันแม่แห่งชาติ', type:'gov' },
  { d:'2026-09-09', name:'เทศกาลช้อปปิ้ง 9.9', type:'mkt' },
  { d:'2026-10-10', name:'เทศกาลช้อปปิ้ง 10.10', type:'mkt' },
  { d:'2026-10-13', name:'วันนวมินทรมหาราช', type:'gov' },
  { d:'2026-10-23', name:'วันปิยมหาราช', type:'gov' },
  { d:'2026-10-26', name:'วันออกพรรษา (ตามจันทรคติ)', type:'fest' },
  { d:'2026-10-31', name:'ฮาโลวีน (Halloween)', type:'fest' },
  { d:'2026-11-11', name:'เทศกาลช้อปปิ้ง 11.11', type:'mkt' },
  { d:'2026-11-24', name:'วันลอยกระทง (Loy Krathong)', type:'fest' },
  { d:'2026-11-27', name:'Black Friday', type:'mkt' },
  { d:'2026-11-25', end:'2026-12-06', name:'มอเตอร์เอ็กซ์โป Motor Expo (โดยประมาณ)', type:'mkt' },
  { d:'2026-12-05', name:'วันพ่อแห่งชาติ / วันชาติ', type:'gov' },
  { d:'2026-12-07', name:'หยุดชดเชยวันพ่อแห่งชาติ', type:'gov' },
  { d:'2026-12-10', name:'วันรัฐธรรมนูญ', type:'gov' },
  { d:'2026-12-12', name:'เทศกาลช้อปปิ้ง 12.12', type:'mkt' },
  { d:'2026-12-24', name:'วันคริสต์มาสอีฟ', type:'fest' },
  { d:'2026-12-25', name:'วันคริสต์มาส (Christmas)', type:'fest' },
  { d:'2026-12-31', name:'วันสิ้นปี / New Year Countdown', type:'gov' },

  /* ===== 2027 ===== */
  { d:'2027-01-01', name:'วันขึ้นปีใหม่', type:'gov' },
  { d:'2027-01-09', name:'วันเด็กแห่งชาติ', type:'mkt' },
  { d:'2027-01-16', name:'วันครู', type:'mkt' },
  { d:'2027-02-06', name:'วันตรุษจีน', type:'fest' },
  { d:'2027-02-14', name:"วันวาเลนไทน์ (Valentine's Day)", type:'intl' },
  { d:'2027-02-21', name:'วันมาฆบูชา (ตามจันทรคติ)', type:'gov' },
  { d:'2027-02-22', name:'หยุดชดเชยวันมาฆบูชา (ตามจันทรคติ)', type:'gov' },
  { d:'2027-03-08', name:'วันสตรีสากล', type:'intl' },
  { d:'2027-03-24', end:'2027-04-04', name:'บางกอกมอเตอร์โชว์ (โดยประมาณ)', type:'mkt' },
  { d:'2027-04-01', name:"April Fool's Day", type:'intl' },
  { d:'2027-04-06', name:'วันจักรี', type:'gov' },
  { d:'2027-04-13', end:'2027-04-15', name:'วันสงกรานต์', type:'gov' },
  { d:'2027-04-22', name:'วันคุ้มครองโลก (Earth Day)', type:'intl' },
  { d:'2027-05-01', name:'วันแรงงานแห่งชาติ', type:'gov' },
  { d:'2027-05-03', name:'หยุดชดเชยวันแรงงานแห่งชาติ', type:'gov' },
  { d:'2027-05-04', name:'วันฉัตรมงคล', type:'gov' },
  { d:'2027-05-20', name:'วันวิสาขบูชา (ตามจันทรคติ)', type:'gov' },
  { d:'2027-06-03', name:'วันเฉลิมพระชนมพรรษา สมเด็จพระราชินี', type:'gov' },
  { d:'2027-06-05', name:'วันสิ่งแวดล้อมโลก', type:'intl' },
  { d:'2027-06-26', name:'วันสุนทรภู่', type:'mkt' },
  { d:'2027-07-18', name:'วันอาสาฬหบูชา (ตามจันทรคติ)', type:'gov' },
  { d:'2027-07-19', name:'วันเข้าพรรษา (ตามจันทรคติ)', type:'gov' },
  { d:'2027-07-20', name:'หยุดชดเชยวันอาสาฬหบูชา (ตามจันทรคติ)', type:'gov' },
  { d:'2027-07-28', name:'วันเฉลิมพระชนมพรรษา ร.10', type:'gov' },
  { d:'2027-08-12', name:'วันแม่แห่งชาติ', type:'gov' },
  { d:'2027-09-09', name:'เทศกาลช้อปปิ้ง 9.9', type:'mkt' },
  { d:'2027-10-10', name:'เทศกาลช้อปปิ้ง 10.10', type:'mkt' },
  { d:'2027-10-13', name:'วันนวมินทรมหาราช', type:'gov' },
  { d:'2027-10-15', name:'วันออกพรรษา (ตามจันทรคติ)', type:'fest' },
  { d:'2027-10-23', name:'วันปิยมหาราช', type:'gov' },
  { d:'2027-10-25', name:'หยุดชดเชยวันปิยมหาราช', type:'gov' },
  { d:'2027-10-31', name:'ฮาโลวีน (Halloween)', type:'fest' },
  { d:'2027-11-11', name:'เทศกาลช้อปปิ้ง 11.11', type:'mkt' },
  { d:'2027-11-14', name:'วันลอยกระทง (Loy Krathong)', type:'fest' },
  { d:'2027-11-24', end:'2027-12-05', name:'มอเตอร์เอ็กซ์โป Motor Expo (โดยประมาณ)', type:'mkt' },
  { d:'2027-11-26', name:'Black Friday', type:'mkt' },
  { d:'2027-12-05', name:'วันพ่อแห่งชาติ / วันชาติ', type:'gov' },
  { d:'2027-12-06', name:'หยุดชดเชยวันพ่อแห่งชาติ', type:'gov' },
  { d:'2027-12-10', name:'วันรัฐธรรมนูญ', type:'gov' },
  { d:'2027-12-12', name:'เทศกาลช้อปปิ้ง 12.12', type:'mkt' },
  { d:'2027-12-24', name:'วันคริสต์มาสอีฟ', type:'fest' },
  { d:'2027-12-25', name:'วันคริสต์มาส (Christmas)', type:'fest' },
  { d:'2027-12-31', name:'วันสิ้นปี / New Year Countdown', type:'gov' },
];

/* ---------- สถานะภายในโมดูล (แยกจากระบบเดิม) ---------- */
let thaiHolidayState = { y: 0, m: 0, q: '' };

const THAI_HOLIDAY_MONTHS = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
const THAI_HOLIDAY_DAYS = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'];

function thaiHolidayEsc(s) {
  return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function thaiHolidayPad(n) { return (n < 10 ? '0' : '') + n; }
function thaiHolidayTodayISO() {
  const n = new Date();
  return n.getFullYear() + '-' + thaiHolidayPad(n.getMonth() + 1) + '-' + thaiHolidayPad(n.getDate());
}
function thaiHolidayFmt(iso) {
  const p = iso.split('-').map(Number);
  return p[2] + ' ' + THAI_HOLIDAY_MONTHS[p[1] - 1].slice(0, 3) + '. ' + p[0];
}
function thaiHolidayFmtFull(iso) {
  const p = iso.split('-').map(Number);
  const dt = new Date(p[0], p[1] - 1, p[2]);
  return 'วัน' + THAI_HOLIDAY_DAYS[dt.getDay()] + 'ที่ ' + p[2] + ' ' + THAI_HOLIDAY_MONTHS[p[1] - 1] + ' ' + p[0];
}
function thaiHolidayYears() {
  const ys = {};
  THAI_HOLIDAY_DATA.forEach(h => { ys[h.d.slice(0, 4)] = 1; });
  return Object.keys(ys).sort();
}
function thaiHolidayOn(iso) {
  return THAI_HOLIDAY_DATA.filter(h => h.d <= iso && iso <= (h.end || h.d));
}
function thaiHolidayDiffDays(iso) {
  const p = iso.split('-').map(Number), n = new Date();
  const a = new Date(p[0], p[1] - 1, p[2]), b = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  return Math.round((a - b) / 86400000);
}

/* ---------- CSS (ฉีดครั้งเดียว prefix thai-holiday- ทั้งหมด) ---------- */
function thaiHolidayInjectCss() {
  if (document.getElementById('thai-holiday-style')) return;
  const st = document.createElement('style');
  st.id = 'thai-holiday-style';
  st.textContent = `
.thai-holiday-card { background:#fff; border-radius:12px; padding:16px; box-shadow:0 2px 10px rgba(0,0,0,.07); margin-bottom:16px; }
.thai-holiday-next { display:flex; gap:14px; align-items:center; flex-wrap:wrap; border-left:6px solid #4caf7d; }
.thai-holiday-next-big { font-size:20px; font-weight:800; color:#1e3a5f; }
.thai-holiday-next-date { color:#5a6b80; font-size:14px; }
.thai-holiday-count { margin-left:auto; background:#1e3a5f; color:#fff; border-radius:12px; padding:10px 18px; text-align:center; }
.thai-holiday-count b { display:block; font-size:24px; }
.thai-holiday-count span { font-size:11px; opacity:.8; }
.thai-holiday-bar { display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:12px; }
.thai-holiday-bar select, .thai-holiday-bar input { padding:8px 10px; border:1px solid #d7e0ea; border-radius:8px; font-size:14px; }
.thai-holiday-bar input { flex:1; min-width:180px; }
.thai-holiday-legend { display:flex; gap:10px; flex-wrap:wrap; font-size:12px; color:#5a6b80; margin-bottom:10px; }
.thai-holiday-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
.thai-holiday-grid-head div { text-align:center; font-size:12px; font-weight:700; color:#5a6b80; padding:4px 0; }
.thai-holiday-cell { background:#f7fafc; border:1px solid #e6ecf3; border-radius:8px; min-height:74px; padding:4px; overflow:hidden; }
.thai-holiday-out { opacity:.35; }
.thai-holiday-today { border:2px solid #4caf7d; background:#f0f7f3; }
.thai-holiday-num { font-size:11.5px; font-weight:700; color:#5a6b80; margin-bottom:2px; }
.thai-holiday-ev { color:#fff; font-size:10px; border-radius:4px; padding:1px 4px; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.thai-holiday-row { display:flex; gap:10px; align-items:center; padding:9px 6px; border-bottom:1px solid #f0f4f8; font-size:13.5px; flex-wrap:wrap; }
.thai-holiday-row:hover { background:#f7fafc; }
.thai-holiday-row-date { min-width:120px; font-weight:700; color:#1e3a5f; }
.thai-holiday-chip { font-size:11px; color:#fff; border-radius:10px; padding:2px 10px; margin-left:auto; }
.thai-holiday-past { opacity:.45; }
.thai-holiday-note { font-size:11.5px; color:#8fa1b5; margin-top:10px; }
@media (max-width:768px) {
  .thai-holiday-cell { min-height:50px; padding:2px; }
  .thai-holiday-ev { font-size:8px; }
  .thai-holiday-row-date { min-width:96px; }
}`;
  document.head.appendChild(st);
}

/* ---------- เริ่มต้น (เรียกตอนกดเมนู) ---------- */
function initThaiHoliday() {
  thaiHolidayInjectCss();
  if (!thaiHolidayState.y) {
    const n = new Date(), ys = thaiHolidayYears();
    let y = String(n.getFullYear());
    if (ys.indexOf(y) === -1) y = ys[0];
    thaiHolidayState.y = Number(y);
    thaiHolidayState.m = n.getMonth() + 1;
  }
  thaiHolidayRender();
}

function thaiHolidayRender() {
  const el = document.getElementById('thaiHolidayBody');
  if (!el) return;
  const st = thaiHolidayState;
  const today = thaiHolidayTodayISO();

  /* 1) วันสำคัญถัดไป */
  const upcoming = THAI_HOLIDAY_DATA.filter(h => (h.end || h.d) >= today)
    .sort((a, b) => a.d.localeCompare(b.d));
  const next = upcoming[0];
  let nextHtml = '<div class="thai-holiday-card thai-holiday-next"><em>ไม่มีข้อมูลวันสำคัญถัดไปในปีที่มีข้อมูล</em></div>';
  if (next) {
    const t = THAI_HOLIDAY_TYPES[next.type];
    const diff = thaiHolidayDiffDays(next.d);
    const started = next.d <= today;
    nextHtml = `<div class="thai-holiday-card thai-holiday-next" style="border-left-color:${t.color};">
      <div>
        <div style="font-size:12px;color:#7a8aa0;">📌 วันสำคัญถัดไป</div>
        <div class="thai-holiday-next-big">${t.emoji} ${thaiHolidayEsc(next.name)}</div>
        <div class="thai-holiday-next-date">${thaiHolidayFmtFull(next.d)}${next.end ? ' – ' + thaiHolidayFmt(next.end) : ''}</div>
      </div>
      <div class="thai-holiday-count"><b>${started ? '✓' : diff}</b><span>${started ? 'กำลังดำเนินอยู่' : diff === 1 ? 'พรุ่งนี้!' : 'เหลืออีก (วัน)'}</span></div>
    </div>`;
  }

  /* 2) แถบเลือกเดือน/ปี + 4) ค้นหา */
  const ys = thaiHolidayYears();
  const bar = `<div class="thai-holiday-bar">
    <select onchange="thaiHolidayState.m=Number(this.value);thaiHolidayRender()">
      ${THAI_HOLIDAY_MONTHS.map((mn, i) => `<option value="${i + 1}" ${st.m === i + 1 ? 'selected' : ''}>${mn}</option>`).join('')}
    </select>
    <select onchange="thaiHolidayState.y=Number(this.value);thaiHolidayRender()">
      ${ys.map(y => `<option value="${y}" ${st.y === Number(y) ? 'selected' : ''}>${y}</option>`).join('')}
    </select>
    <input type="search" placeholder="🔍 ค้นหาวันสำคัญ เช่น วันแม่ / ปีใหม่ / Halloween / Valentine" value="${thaiHolidayEsc(st.q)}"
      oninput="thaiHolidayState.q=this.value;thaiHolidayRender()">
  </div>`;

  const legend = `<div class="thai-holiday-legend">${Object.keys(THAI_HOLIDAY_TYPES).map(k => {
    const t = THAI_HOLIDAY_TYPES[k];
    return `<span>${t.emoji} ${t.label}</span>`;
  }).join('')}</div>`;

  /* 4) โหมดค้นหา: แสดงผลลัพธ์ทั้งหมดทุกปี */
  if (st.q.trim()) {
    const q = st.q.trim().toLowerCase();
    const hits = THAI_HOLIDAY_DATA.filter(h => h.name.toLowerCase().indexOf(q) !== -1)
      .sort((a, b) => a.d.localeCompare(b.d));
    el.innerHTML = nextHtml + `<div class="thai-holiday-card">${bar}${legend}
      <strong style="color:#1e3a5f;">ผลค้นหา "${thaiHolidayEsc(st.q)}" — ${hits.length} รายการ</strong>
      ${hits.length ? hits.map(h => thaiHolidayRowHtml(h, today)).join('')
        : '<div style="color:#7a8aa0;font-size:13px;margin-top:8px;">ไม่พบวันสำคัญที่ค้นหา ลองคำอื่น เช่น สงกรานต์ / คริสต์มาส</div>'}
    </div>`;
    return;
  }

  /* 2) ปฏิทินเดือนที่เลือก */
  const first = new Date(st.y, st.m - 1, 1);
  const off = (first.getDay() + 6) % 7;
  let cells = '';
  for (let i = 0; i < 42; i++) {
    const d = new Date(st.y, st.m - 1, 1 - off + i);
    const iso = d.getFullYear() + '-' + thaiHolidayPad(d.getMonth() + 1) + '-' + thaiHolidayPad(d.getDate());
    const inMonth = d.getMonth() === st.m - 1;
    const evs = thaiHolidayOn(iso);
    cells += `<div class="thai-holiday-cell ${inMonth ? '' : 'thai-holiday-out'} ${iso === today ? 'thai-holiday-today' : ''}">
      <div class="thai-holiday-num">${d.getDate()}</div>
      ${evs.slice(0, 2).map(h => `<div class="thai-holiday-ev" style="background:${THAI_HOLIDAY_TYPES[h.type].color}" title="${thaiHolidayEsc(h.name)}">${thaiHolidayEsc(h.name)}</div>`).join('')}
      ${evs.length > 2 ? `<div style="font-size:9px;color:#7a8aa0;">+${evs.length - 2}</div>` : ''}
    </div>`;
  }

  /* 3) รายการวันสำคัญของเดือน */
  const mk = st.y + '-' + thaiHolidayPad(st.m);
  const monthList = THAI_HOLIDAY_DATA.filter(h => h.d.slice(0, 7) === mk || (h.end || '').slice(0, 7) === mk)
    .sort((a, b) => a.d.localeCompare(b.d));

  el.innerHTML = nextHtml + `<div class="thai-holiday-card">${bar}${legend}
    <div class="thai-holiday-grid thai-holiday-grid-head"><div>จ.</div><div>อ.</div><div>พ.</div><div>พฤ.</div><div>ศ.</div><div>ส.</div><div>อา.</div></div>
    <div class="thai-holiday-grid">${cells}</div>
  </div>
  <div class="thai-holiday-card">
    <strong style="color:#1e3a5f;">📋 วันสำคัญเดือน${THAI_HOLIDAY_MONTHS[st.m - 1]} ${st.y} (${monthList.length} รายการ)</strong>
    ${monthList.length ? monthList.map(h => thaiHolidayRowHtml(h, today)).join('')
      : '<div style="color:#7a8aa0;font-size:13px;margin-top:8px;">เดือนนี้ไม่มีวันสำคัญในข้อมูล</div>'}
    <div class="thai-holiday-note">หมายเหตุ: วันที่มีคำว่า (ตามจันทรคติ) หรือ (โดยประมาณ) อาจคลาดเคลื่อน โปรดตรวจสอบประกาศทางการอีกครั้ง · หน้านี้เป็นข้อมูลอ่านอย่างเดียว แยกจากปฏิทินทีม</div>
  </div>`;
}

function thaiHolidayRowHtml(h, today) {
  const t = THAI_HOLIDAY_TYPES[h.type];
  const past = (h.end || h.d) < today;
  const diff = thaiHolidayDiffDays(h.d);
  return `<div class="thai-holiday-row ${past ? 'thai-holiday-past' : ''}">
    <span class="thai-holiday-row-date">${thaiHolidayFmt(h.d)}${h.end ? ' – ' + thaiHolidayFmt(h.end) : ''}</span>
    <span>${t.emoji} ${thaiHolidayEsc(h.name)}</span>
    ${!past && diff >= 0 ? `<span style="font-size:11px;color:#7a8aa0;">(${diff === 0 ? 'วันนี้' : 'อีก ' + diff + ' วัน'})</span>` : ''}
    <span class="thai-holiday-chip" style="background:${t.color};">${t.label}</span>
  </div>`;
}
