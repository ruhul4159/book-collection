const express = require('express');
const app = express();

// Define the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Define the /books route
const books = [];
app.get('/books', (req, res) => {
  res.json(books);
});

// Define the /books POST route
app.post('/books', (req, res) => {
  const book = {
    id: Date.now().toString(),
    title: req.body.title,
    author: req.body.author,
    publishedDate: req.body.publishedDate || ''
  };
  books.push(book);
  res.json(book);
});

// Define the /books/:id DELETE route
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex >= 0) {
    books.splice(bookIndex, 1);
    res.json({ message: 'Book successfully deleted.' });
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
