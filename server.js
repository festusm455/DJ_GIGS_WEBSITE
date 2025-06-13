const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
const upload = multer();

// MySQL setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'X7r#qP!93vLc$eTz',
  database: 'dj_gigs_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!');
});

// Email transporter setup (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'festusm455@gmail.com',
    pass: 'wiwmpuezfxbekdtf' // <- 16-char password from Google
  }
});

// POST route for form submission
app.post('/api/request', upload.none(), (req, res) => {
  const { name, email, event_date, message } = req.body;

  if (!name || !email || !event_date || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const query = 'INSERT INTO customers (name, email, event_date, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, event_date, message], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ success: false, error: 'Database error' });
    }

    // Send email
    const mailOptions = {
      from: '"DJ Gigs Website" <festusm455@gmail.com>',
      to: 'festusm455@gmail.com',
      subject: 'New Booking Request',
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Event Date:</strong> ${event_date}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    transporter.sendMail(mailOptions, (emailErr, info) => {
      if (emailErr) {
        console.error('Email error:', emailErr);
        return res.status(500).json({ success: false, error: 'Email send failed' });
      }

      console.log('Email sent:', info.response);
      res.json({ success: true });
    });
  });
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
