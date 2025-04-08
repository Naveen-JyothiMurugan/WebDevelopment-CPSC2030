// Logger middleware here
const fs = require('fs');
const path = require('path');

const logRequest = (req, res, next) => {
  const log = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  };

  const logFilePath = path.join(__dirname, '../logs/requests.log');

  fs.appendFile(logFilePath, JSON.stringify(log) + '\n', (err) => {
    if (err) console.error('Logging failed:', err);
  });

  next();
};

module.exports = logRequest;
