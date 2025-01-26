const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs').promises;

async function compressImage(imageUrl, outputPath) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageBuffer = response.data;

  await sharp(imageBuffer)
    .resize({ width: 800 })
    .jpeg({ quality: 50 })
    .toFile(outputPath);

  return outputPath;
}

module.exports = { compressImage };
