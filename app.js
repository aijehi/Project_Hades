const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

// Create MySQL connection
const db = mysql.createConnection({
  host: '192.168.0.252',
  user: 'root',
  password: 'Huawei@2024',
  database: 'martin_db',
  port: 3306,
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const { name, email, age } = req.body;

  const insertQuery = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
  db.query(insertQuery, [name, email, age], (err, results) => {
    if (err) throw err;
    res.send('User added to the database!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://159.138.175.77:${5001}`);
});
