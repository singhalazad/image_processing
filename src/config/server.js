const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('../../routes/apiRoutes');

const app = express();
app.use(bodyParser.json());
app.use('', apiRoutes);

module.exports = app;
