// Google Translate API logic here



const axios = require('axios');

async function translateText(text, targetLang = 'en') {
  const apiKey = process.env.GOOGLE_API_KEY;

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLang,
      format: 'text'
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);
    throw new Error('Translation failed');
  }
}

module.exports = translateText;
