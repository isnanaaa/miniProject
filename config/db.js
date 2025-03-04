const mysql = require('mysql');
const conn = mysql.connect({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'kuliah',
    charset: 'utf8mb4',
    timezone: '+00:00',
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = conn;