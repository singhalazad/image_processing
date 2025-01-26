const mysql = require('mysql2');
const pool = mysql.createPool({
  host: '1.23.242.234',
  user: 'guestfolionew',
  password: 'L4nU0pGw6TK9NLz',
  database: 'guestfolio_new',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
