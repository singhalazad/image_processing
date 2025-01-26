const db = require('../config/database');

async function createRequest(requestId) {
  const query = 'INSERT INTO requests (request_id, status) VALUES (?, "pending")';
  await db.execute(query, [requestId]);
}

async function updateRequestStatus(requestId, status) {
  const query = 'UPDATE requests SET status = ? WHERE request_id = ?';
  await db.execute(query, [status, requestId]);
}

async function getRequestStatus(requestId) {
  const query = 'SELECT status FROM requests WHERE request_id = ?';
  const [rows] = await db.execute(query, [requestId]);
  return rows[0]?.status || null;
}

module.exports = { createRequest, updateRequestStatus, getRequestStatus };
