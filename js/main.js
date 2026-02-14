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

/* ── Exit-intent popup ── */
(function() {
  const overlay = document.getElementById('exitOverlay');
  const closeBtn = document.getElementById('exitClose');
  const form = document.getElementById('exitForm');
  if (!overlay) return;

  let shown = false;
  const STORAGE_KEY = 'exit_popup_shown';

  // Don't show if already dismissed or submitted
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  function showPopup() {
    if (shown) return;
    shown = true;
    overlay.classList.add('active');
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  function hidePopup() {
    overlay.classList.remove('active');
  }

  // Desktop: mouse leaves viewport from the top
  document.addEventListener('mouseout', function(e) {
    if (!e.relatedTarget && e.clientY < 5) {
      showPopup();
    }
  });

  // Mobile: back button or tab switch (visibilitychange)
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      // Mark for showing on return
      if (!shown) sessionStorage.setItem('exit_show_on_return', '1');
    }
    if (document.visibilityState === 'visible' && sessionStorage.getItem('exit_show_on_return')) {
      sessionStorage.removeItem('exit_show_on_return');
      showPopup();
    }
  });

  // Close
  closeBtn.addEventListener('click', hidePopup);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) hidePopup();
  });

  // ConvertKit integration (tag: lead-funil)
  const CK_API_KEY = 'ACToNRKxQcIk8S6Brww_QA';
  const CK_TAG_ID = '15924900';

  // Form submit
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const input = form.querySelector('.exit-input');
    const btn = form.querySelector('.exit-btn');
    const email = input.value.trim();
    if (!email || !email.includes('@')) return;

    // Disable while submitting
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    input.disabled = true;

    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/tags/${CK_TAG_ID}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ api_key: CK_API_KEY, email }),
        }
      );
      if (!res.ok) throw new Error('Erro');

      // Show success state
      const popup = overlay.querySelector('.exit-popup');
      popup.innerHTML = '<div class="exit-success"><p>Pronto. Fique de olho na sua caixa de entrada.</p></div>';
      setTimeout(hidePopup, 2500);
    } catch (err) {
      console.error('ConvertKit error:', err);
      btn.textContent = 'Tente novamente';
      input.disabled = false;
      btn.disabled = false;
      setTimeout(() => { btn.textContent = 'Quero receber'; }, 3000);
    }
  });
})();
