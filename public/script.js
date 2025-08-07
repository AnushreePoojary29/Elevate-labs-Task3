// Fetch all books and display them
async function fetchBooks() {
  const response = await fetch('http://localhost:3000/books');
  const books = await response.json();
  const bookList = document.getElementById('books');
  bookList.innerHTML = '';

  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}`;
    bookList.appendChild(li);
  });
}

// Add a new book
async function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  if (!title || !author) {
    alert('Title and author are required!');
    return;
  }

  await fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author }),
  });

  // Clear inputs and refresh the list
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  fetchBooks();
}

// Load books when page opens
fetchBooks();