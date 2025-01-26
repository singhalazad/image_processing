const fs = require('fs');
const csvParser = require('csv-parser');

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

function validateCSV(data) {
  return data.every((row) => row['S. No.'] && row['Product Name'] && row['Input Image Urls']);
}

module.exports = { parseCSV, validateCSV };
