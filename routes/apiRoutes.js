const express = require('express');
const multer = require('multer');
const { uploadCSV } = require('../src/controllers/uploadController');
const { getStatus } = require('../src/controllers/statusController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('csvFile'), uploadCSV);
router.get('/status/:requestId', getStatus);

module.exports = router;
