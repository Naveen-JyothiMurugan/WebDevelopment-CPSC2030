const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      window.location.href = '/index.html';
    }

    document.getElementById('roleDisplay').textContent = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.clear();
      window.location.href = '/index.html';
    });

    async function loadLanguages() {
      const res = await fetch('/api/flashcards/translate/languages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const createSelect = document.getElementById('languageSelect');
      const editSelect = document.getElementById('editLanguageSelect');

      data.languages.forEach(lang => {
        const option1 = document.createElement('option');
        option1.value = lang.language;
        option1.textContent = lang.name;
        createSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = lang.language;
        option2.textContent = lang.name;
        editSelect.appendChild(option2);
      });
    }


    async function loadFlashcards() {
      const endpoint = role === 'admin' ? '/api/flashcards' : '/api/flashcards/my';
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const container = document.getElementById('cardsContainer');
      container.innerHTML = '';
      data.forEach(card => {
        const div = document.createElement('div');
        div.className = 'border rounded p-3 mb-2 bg-white d-flex justify-content-between align-items-center';
        div.innerHTML = `
        <strong>${card.question} ➜ ${card.answer}</strong>
        <div>
          <button class="btn btn-sm btn-primary edit-btn" 
            data-id="${card._id}" 
            data-question="${card.question}" 
            data-answer="${card.answer}">Edit</button>
          ${role === 'admin' ? `<button class="btn btn-sm btn-danger ms-2 delete-btn" data-id="${card._id}">Delete</button>` : ''}
        </div>
      `;
        container.appendChild(div);
      });
    }

    document.getElementById('translateBtn').addEventListener('click', async () => {
      const word = document.getElementById('wordInput').value;
      const lang = document.getElementById('languageSelect').value;

      const res = await fetch('/api/flashcards/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: word, targetLang: lang })
      });

      const data = await res.json();
      document.getElementById('translatedWord').value = data.translatedText || '';
    });

    document.getElementById('createBtn').addEventListener('click', async () => {
      const question = document.getElementById('wordInput').value;
      const answer = document.getElementById('translatedWord').value;

      const res = await fetch('/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ question, answer })
      });

      if (res.ok) {
        Swal.fire('✅ Flashcard Created!');
        loadFlashcards();
        document.getElementById('wordInput').value = '';
        document.getElementById('translatedWord').value = '';
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const id = e.target.dataset.id;
        const question = e.target.dataset.question;
        const answer = e.target.dataset.answer;

        document.getElementById('editId').value = id;
        document.getElementById('editQuestion').value = question;
        document.getElementById('editAnswer').value = answer;

        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
      }
    });

    document.getElementById('editForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const id = document.getElementById('editId').value;
      const question = document.getElementById('editQuestion').value;
      const targetLang = document.getElementById('editLanguageSelect').value;

      // Translate the updated question
      const translationRes = await fetch('/api/flashcards/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: question, targetLang })
      });

      const translationData = await translationRes.json();
      const answer = translationData.translatedText;

      // Now update the flashcard
      const res = await fetch(`/api/flashcards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ question, answer })
      });

      if (res.ok) {
        Swal.fire('✅ Flashcard Updated with Translation!');
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
        loadFlashcards();
      } else {
        Swal.fire('❌ Failed to update');
      }
    });


    document.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        if (confirm('Are you sure you want to delete this flashcard?')) {
          await fetch(`/api/flashcards/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          });
          loadFlashcards();
        }
      }
    });

    loadLanguages();
    loadFlashcards();