const form = document.getElementById('registerForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5050/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registered successfully! Please log in.');
      window.location.href = 'login.html';
    } else {
      document.getElementById('message').innerText = data.message || 'Registration failed';
    }
  } catch (err) {
    document.getElementById('message').innerText = 'Error connecting to server';
  }
});