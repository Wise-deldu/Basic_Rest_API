import express from 'express';
import { json } from 'body-parser';

const app = express();
const PORT = 3000;

app.use(json());

let books = [];

// Create a new book
app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).send('Book added successfully');
});

// Get all books
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = req.body;
    res.send('Book updated successfully');
  } else {
    res.status(404).send('Book not found');
  }
});

// Delete a book by ID
app.delete('/books/:id', (res, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.send('Books deleted successfully');
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
