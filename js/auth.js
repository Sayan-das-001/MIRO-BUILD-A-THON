// Simulated Authentication Service (matches "Authentication service" in architecture)
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  localStorage.setItem('mindcare_user', JSON.stringify({ email, role: 'student' }));
  window.location.href = 'dashboard.html';
});

document.getElementById('goCounselor').addEventListener('click', function (e) {
  e.preventDefault();
  localStorage.setItem('mindcare_user', JSON.stringify({ email: 'counselor@demo.edu', role: 'counselor' }));
  window.location.href = 'counselor.html';
});
