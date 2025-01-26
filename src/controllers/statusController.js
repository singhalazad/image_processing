const { getRequestStatus } = require('../models/requestModel');

async function getStatus(req, res) {
  const { requestId } = req.params;
  try {
    const status = await getRequestStatus(requestId);
    if (!status) {
      return res.status(404).json({ error: 'Request ID not found' });
    }
    res.json({ status });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getStatus };
