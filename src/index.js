require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

console.log({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE
});

db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/notes', (req, res) => {
  const { title, datetime, note } = req.body;
  const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
  db.query(sql, [title, datetime, note], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId });
  });
});

app.get('/notes', (req, res) => {
  const sql = 'SELECT * FROM notes';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

app.get('/notes/:id', (req, res) => {
  const sql = 'SELECT * FROM notes WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Note not found');
    res.status(200).send(result[0]);
  });
});

app.put('/notes/:id', (req, res) => {
  const { title, datetime, note } = req.body;
  const sql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
  db.query(sql, [title, datetime, note, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Note not found');
    res.status(200).send('Note updated successfully');
  });
});

app.delete('/notes/:id', (req, res) => {
  const sql = 'DELETE FROM notes WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Note not found');
    res.status(200).send('Note deleted successfully');
  });
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
