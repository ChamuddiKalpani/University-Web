const form = document.getElementById('loginForm');
const userId = document.getElementById('userId');
const password = document.getElementById('password');
const idError = document.getElementById('idError');
const pwError = document.getElementById('pwError');
const toggle = document.getElementById('toggle');
const idLabel = document.getElementById('idLabel');
let role = 'student';

// Student / Staff switch
document.querySelectorAll('.roles button').forEach(btn => {
  btn.addEventListener('click', () => {
    role = btn.dataset.role;
    document.querySelectorAll('.roles button').forEach(b => b.setAttribute('aria-pressed', b === btn));
    idLabel.textContent = role === 'student' ? 'Student ID or email' : 'Staff ID or email';
    userId.placeholder = role === 'student' ? 'e.g. 20260123' : 'e.g. j.perera@northfield.edu';
  });
});

// Show / hide password
toggle.addEventListener('click', () => {
  const show = password.type === 'password';
  password.type = show ? 'text' : 'password';
  toggle.textContent = show ? 'Hide' : 'Show';
  toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});

// Validation
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;

  if (!userId.value.trim()) {
    idError.textContent = 'Enter your ID or email.';
    userId.setAttribute('aria-invalid', 'true');
    ok = false;
  } else {
    idError.textContent = '';
    userId.removeAttribute('aria-invalid');
  }

  if (password.value.length < 8) {
    pwError.textContent = 'Password must be at least 8 characters.';
    password.setAttribute('aria-invalid', 'true');
    ok = false;
  } else {
    pwError.textContent = '';
    password.removeAttribute('aria-invalid');
  }

  if (!ok) return;

  // TODO: send to your backend, e.g.
  // fetch('/api/login', { method: 'POST', headers: {'Content-Type':'application/json'},
  //   body: JSON.stringify({ role, id: userId.value, password: password.value }) })
  console.log('Ready to submit as', role);
});