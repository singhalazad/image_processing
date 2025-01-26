const { parseCSV, validateCSV } = require('../utils/csvUtils');
const { generateRequestId } = require('../utils/requestUtils');
const { createRequest } = require('../models/requestModel');
const { storeProductData } = require('../models/productModel');

async function uploadCSV(req, res) {
    const { file } = req;
    if (!file) {
        return res.status(400).json({ error: 'CSV file is required' });
    }
  
    try {
        const data = await parseCSV(file.path);
        console.log('CSV Data:', data);
  
        if (!validateCSV(data)) {
            return res.status(400).json({ error: 'Invalid CSV format' });
        }
  
        const requestId = generateRequestId();
        console.log('Request ID:', requestId);
  
        await createRequest(requestId);
  
        for (const row of data) {
            const productName = row['Product Name']?.trim();
            let inputImageUrls = row['Input Image Urls']?.trim();
  
            console.log("Product Name:", productName);
            console.log("Input Image Urls:", inputImageUrls);
  
            if (!productName || !inputImageUrls) {
                console.log('Skipping row due to missing data:', row);
                continue;
            }
  
            const outputImageUrls = inputImageUrls.replace(/(\.\w+)$/, '_output$1');
            console.log('Output Image Url:', outputImageUrls);
  
            await storeProductData(
                { productName, inputImageUrls, outputImageUrls },
                requestId
            );
        }
  
        res.json({ request_id: requestId });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { uploadCSV };
