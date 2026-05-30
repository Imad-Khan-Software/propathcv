// ── Auth System (localStorage-based) ──

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;
  const errorEl = document.getElementById('regError');

  const users = JSON.parse(localStorage.getItem('cvcraft_users') || '{}');

  if (users[email]) {
    showAuthError(errorEl, 'An account with this email already exists.');
    return;
  }

  users[email] = { name, email, password, createdAt: Date.now() };
  localStorage.setItem('cvcraft_users', JSON.stringify(users));

  // Auto-login
  loginUser({ name, email });
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');

  const users = JSON.parse(localStorage.getItem('cvcraft_users') || '{}');
  const user = users[email];

  if (!user) {
    showAuthError(errorEl, 'No account found with this email.');
    return;
  }
  if (user.password !== password) {
    showAuthError(errorEl, 'Incorrect password. Please try again.');
    return;
  }

  loginUser(user);
}

function loginUser(user) {
  localStorage.setItem('cvcraft_session', JSON.stringify({ name: user.name, email: user.email }));
  updateNavForUser(user);
  showPage('form');
}

function logout() {
  localStorage.removeItem('cvcraft_session');
  updateNavForGuest();
  showPage('home');
}

function getSession() {
  const s = localStorage.getItem('cvcraft_session');
  return s ? JSON.parse(s) : null;
}

function updateNavForUser(user) {
  document.getElementById('navAuth').classList.add('hidden');
  document.getElementById('navUser').classList.remove('hidden');
  document.getElementById('userGreeting').textContent = `Hi, ${user.name.split(' ')[0]} 👋`;
}

function updateNavForGuest() {
  document.getElementById('navAuth').classList.remove('hidden');
  document.getElementById('navUser').classList.add('hidden');
}

function showAuthError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

function togglePw(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

// Init on load
(function initAuth() {
  const session = getSession();
  if (session) {
    updateNavForUser(session);
  } else {
    updateNavForGuest();
  }
})();
