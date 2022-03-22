const addbookBtn = document.querySelector('#add-book');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookList = JSON.parse(localStorage.getItem('bookShop')) || [];

const addBook = (bookTitle, bookAuthor) => {
  const book = {};
  book.title = bookTitle.value;
  book.author = bookAuthor.value;
  bookList.push(book);
};

addbookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (bookTitle.value === null || bookAuthor.value === null) {
    return;
  }
  addBook(bookTitle, bookAuthor);
  localStorage.setItem('bookShop', JSON.stringify(bookList));
});

const displayBook = (book) => {
  const { title, author } = book;
  const bookContainer = document.createElement('div');
  bookContainer.className = 'book';
  bookContainer.innerHTML = `<span class='title'>${title}</span><br>
    <span class='by'>by</span><br>
    <span class='author'>${author} </span><br>
    <button class='delete'>Remove</button>
    <p>_________________________</p>`;
  return bookContainer;
};

const displayBooks = () => {
  const currentBooks = document.querySelector('#books-list');
  const libraryContainer = document.createElement('div');

  bookList.forEach((book) => {
    libraryContainer.appendChild(displayBook(book));
    currentBooks.appendChild(libraryContainer);
  });
};

window.onload = displayBooks;

// Remove Book
const removeBook = (button) => {
  const bookList = JSON.parse(localStorage.getItem('bookShop'));
  const parentDiv = button.parentNode;
  const myTitle = parentDiv.querySelector('.title').textContent;
  const myAuthor = parentDiv.querySelector('.author').textContent;
  const booksLeft = bookList.filter(
    (book) => book.title !== myTitle && book.author !== myAuthor,
  );
  window.localStorage.setItem('bookShop', JSON.stringify(booksLeft));

  parentDiv.remove();
};

document.addEventListener('click', (e) => {
  const button = e.target;
  if (button.className === 'delete') {
    removeBook(button);
  }
});
