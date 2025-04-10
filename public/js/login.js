const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Error connecting to server');
  }
});