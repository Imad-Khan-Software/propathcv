// ── App Router ──

function showPage(name) {
  // Auth guard: certain pages require login
  const protected_pages = ['form', 'templates', 'preview'];
  if (protected_pages.includes(name)) {
    const session = getSession();
    if (!session) {
      showPage('login');
      return;
    }
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + name);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Page-specific init
  if (name === 'form') {
    loadSavedData();
  }
  if (name === 'templates') {
    renderTemplateGrid();
  }

  // Navbar scroll position
  document.getElementById('navbar').style.background =
    name === 'home'
      ? 'rgba(12,14,20,0.85)'
      : 'rgba(12,14,20,0.98)';
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(12,14,20,0.98)';
    nav.style.borderBottomColor = 'rgba(255,255,255,0.1)';
  } else {
    nav.style.background = 'rgba(12,14,20,0.85)';
    nav.style.borderBottomColor = 'rgba(255,255,255,0.07)';
  }
});

// Init app
(function init() {
  const session = getSession();
  const hash = window.location.hash.replace('#', '');
  const validPage = ['home', 'login', 'register', 'form', 'templates', 'preview'];

  if (hash && validPage.includes(hash)) {
    showPage(hash);
  } else if (session) {
    showPage('home');
  } else {
    showPage('home');
  }
})();
