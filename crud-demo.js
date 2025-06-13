// crud-demo.js

const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'X7r#qP!93vLc$eTz',
  database: 'school_db'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
  
  // 👉 Create
  connection.query(
    'INSERT INTO students (name, dept_id) VALUES (?, ?)',
    ['Eve', 3],
    (err, results) => {
      if (err) throw err;
      console.log('Inserted:', results.insertId);

      // 👉 Read
      connection.query('SELECT * FROM students', (err, rows) => {
        if (err) throw err;
        console.log('All Students:', rows);

        // 👉 Update
        connection.query(
          'UPDATE students SET name = ? WHERE id = ?',
          ['Eve Updated', results.insertId],
          (err, results) => {
            if (err) throw err;
            console.log('Updated:', results.message);

            // 👉 Delete
            connection.query(
              'DELETE FROM students WHERE id = ?',
              [results.insertId],
              (err, results) => {
                if (err) throw err;
                console.log('Deleted:', results.affectedRows);

                // Close the connection
                connection.end();
              }
            );
          }
        );
      });
    }
  );
});