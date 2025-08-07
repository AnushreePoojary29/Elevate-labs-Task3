# Book Management API

A simple REST API for managing a list of books, built with Node.js and Express.

## Features

- CRUD operations for books
- In-memory data storage
- JSON request/response format
- Basic error handling

## API Endpoints

- `GET /books` - Get all books
- `POST /books` - Add a new book
- `PUT /books/:id` - Update a book by ID
- `DELETE /books/:id` - Delete a book by ID

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start` (or `npm run dev` for development with nodemon)

## Testing

Use Postman or any API client to test the endpoints:

- GET: `http://localhost:3000/books`
- POST: `http://localhost:3000/books` with JSON body `{ "title": "New Book", "author": "Author Name" }`
- PUT: `http://localhost:3000/books/1` with updated JSON body
- DELETE: `http://localhost:3000/books/1`
