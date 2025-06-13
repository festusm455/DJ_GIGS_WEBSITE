// dj_gigs_db.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'X7r#qP!93vLc$eTz', // Use your actual password
  database: 'dj_gigs_db'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    return;
  }
  console.log('✅ Connected to dj_gigs_db!');
  connection.end(); // Close connection after test
});
