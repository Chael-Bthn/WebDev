const PORTFOLIO_URL = 'https://chael-bthn.github.io/';

const ACTIVITIES = [
  { name: 'Bento Layout', href: 'Activity_1/index.html', ready: true },
  { name: '', href: 'Activity_2/index.html', ready: false },
  { name: '', href: 'Activity_3/index.html', ready: false },
  { name: '', href: 'Activity_4/index.html', ready: false }
];

document.getElementById('backBtn').href = PORTFOLIO_URL;
document.getElementById('year').textContent = new Date().getFullYear();

const list = document.getElementById('activityList');
ACTIVITIES.forEach((a, i) => {
  const el = document.createElement(a.ready ? 'a' : 'div');
  el.className = 'activity-card fade-in' + (a.ready ? '' : ' locked');
  el.dataset.delay = i;
  if (a.ready) el.href = a.href;
  const title = `Activity ${i + 1}` + (a.name ? ` - ${a.name}` : '');
  el.innerHTML = `
    <div class="activity-num">${i + 1}</div>
    <div class="activity-body">
      <h2 class="activity-title">${title}</h2>
    </div>
    <span class="activity-action">${a.ready ? 'Open &rarr;' : 'Soon'}</span>`;
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
    el.style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
  });
  list.appendChild(el);
});

const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const d = parseInt(en.target.dataset.delay || '0', 10);
      setTimeout(() => en.target.classList.add('visible'), 80 * d);
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

const toggle = document.getElementById('darkToggle');
try {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }
} catch (e) {}
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
  try { localStorage.setItem('theme', toggle.checked ? 'dark' : 'light'); } catch (e) {}
});

const trigger = document.getElementById('themeTrigger');
const dropdown = document.getElementById('themeDropdown');
const options = document.querySelectorAll('.theme-option');

function applyPreset(theme) {
  document.body.classList.remove('theme-neon', 'theme-emerald', 'theme-sunset', 'theme-slate');
  if (theme !== 'slate') document.body.classList.add('theme-' + theme);
  try { localStorage.setItem('themePreset', theme); } catch (e) {}
  options.forEach(o => o.classList.toggle('active-option', o.dataset.theme === theme));
}
let saved = 'slate';
try { saved = localStorage.getItem('themePreset') || 'slate'; } catch (e) {}
applyPreset(saved);

trigger.addEventListener('click', e => { e.stopPropagation(); dropdown.classList.toggle('active'); });
document.addEventListener('click', () => dropdown.classList.remove('active'));
options.forEach(o => o.addEventListener('click', e => {
  e.stopPropagation();
  applyPreset(o.dataset.theme);
  dropdown.classList.remove('active');
}));

const bar = document.getElementById('scrollProgress');
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

window.addEventListener('mousemove', e => {
  document.body.style.setProperty('--bg-spotlight-x', e.clientX + 'px');
  document.body.style.setProperty('--bg-spotlight-y', e.clientY + 'px');
}, { passive: true });