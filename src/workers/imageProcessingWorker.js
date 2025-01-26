const { compressImage } = require('../utils/imageUtils');
const { updateProductStatus } = require('../models/productModel');

async function processImages(productId, inputImageUrls) {
  const outputImageUrls = [];
  for (const url of inputImageUrls.split(',')) {
    const outputPath = `./uploads/compressed_${Date.now()}.jpg`;
    const outputUrl = await compressImage(url.trim(), outputPath);
    outputImageUrls.push(outputUrl);
  }

  await updateProductStatus(productId, outputImageUrls);
}

module.exports = { processImages };
