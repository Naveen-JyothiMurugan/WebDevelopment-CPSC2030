// controllers/flashcardController.js
const Flashcard = require('../models/Flashcard');

exports.createFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newCard = new Flashcard({ question, answer, createdBy: req.user.id });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ message: 'Error creating flashcard' });
  }
};

exports.getMyFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ createdBy: req.user.id });
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching flashcards' });
  }
};

// controllers/flashcardController.js
exports.getAllFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all flashcards' });
  }
};


exports.updateFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const updated = await Flashcard.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating flashcard' });
  }
};

exports.deleteFlashcard = async (req, res) => {
  try {
    // Only admin can delete
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting flashcard' });
  }
};
