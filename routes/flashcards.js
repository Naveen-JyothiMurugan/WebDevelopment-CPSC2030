const express = require('express');
const router = express.Router();
const {
  createFlashcard,
  getAllFlashcards,
  getMyFlashcards,
  updateFlashcard,
  deleteFlashcard
} = require('../controllers/flashcardController');
const authenticateToken = require('../middleware/auth');
const translateText = require('../utils/translate');
const axios = require('axios');

// Flashcard Routes
router.get('/', getAllFlashcards);
router.get('/my', authenticateToken, getMyFlashcards);
router.post('/', authenticateToken, createFlashcard);
router.put('/:id', authenticateToken, updateFlashcard);
router.delete('/:id', authenticateToken, deleteFlashcard);

// Translation Routes
router.post('/translate', authenticateToken, async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    const translatedText = await translateText(text, targetLang);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ message: 'Translation failed' });
  }
});

router.get('/translate/languages', authenticateToken, async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=en`;
    const response = await axios.get(url);
    res.json({ languages: response.data.data.languages });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load languages' });
  }
});

module.exports = router;
