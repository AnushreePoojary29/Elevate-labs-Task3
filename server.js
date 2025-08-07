const express = require('express');
const path = require('path'); // Needed to serve static files
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory "database" for books
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET /books - Get all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    
    books[bookIndex] = { id, title, author };
    res.status(200).json(books[bookIndex]);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    books.splice(bookIndex, 1);
    res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Endpoint: http://localhost:${PORT}/books`);
    console.log(`Frontend: http://localhost:${PORT}/index.html`);
});