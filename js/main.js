/* ── Parallax engine ── */
const panels = document.querySelectorAll('.parallax-panel');
function updateParallax() {
  const scrollY = window.scrollY;
  const viewH = window.innerHeight;
  panels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    const speed = parseFloat(panel.dataset.speed) || 0.3;
    if (rect.bottom > -viewH && rect.top < viewH * 2) {
      const offset = (scrollY - panel.offsetTop) * speed;
      const bg = panel.querySelector('.bg');
      if (bg) bg.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
  });
}
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { updateParallax(); ticking = false; });
    ticking = true;
  }
}, { passive: true });
updateParallax();

/* ── Reveal on scroll ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
