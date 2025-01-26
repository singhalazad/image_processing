const db = require('../config/database'); 

const storeProductData = async ({ productName, inputImageUrls, outputImageUrls }, requestId) => {
  const query = `
    INSERT INTO products (product_name, input_image_urls, output_image_urls,request_id)
    VALUES (?, ?, ?, ?)
  `;
  const values = [productName || null, inputImageUrls || null, outputImageUrls || null, requestId];

  try {
    await db.execute(query, values);  
  } catch (error) {
    console.error('Error inserting product data:', error);
    throw error;
  }
};

async function updateProductStatus(productId, outputImageUrls) {
  const query = `
    UPDATE products
    SET output_image_urls = ?, status = "completed"
    WHERE id = ?
  `;
  await db.execute(query, [outputImageUrls.join(','), productId]);
}

module.exports = { storeProductData, updateProductStatus };
