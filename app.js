const addbookBtn = document.querySelector('#add-book');
const bookTitl = document.querySelector('#title');
const bookAutho = document.querySelector('#author');

class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
}

class Store {
  getBooks = () => {
    let books;
    if (JSON.parse(localStorage.getItem('bookShop')) === null) {
      books = [];
    }else {
      books = JSON.parse(localStorage.getItem('bookShop'));
    }
    return books;
  }

  addBook = (book) => {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem('bookShop', JSON.stringify(books));
  }

  removeBook = (button) => {
    const books = JSON.parse(localStorage.getItem('bookShop'));
    const parentDiv = button.parentNode;
    const myTitle = parentDiv.querySelector('.title').textContent;
    const myAuthor = parentDiv.querySelector('.author').textContent;
    const booksLeft = books.filter(
      (book) => book.title !== myTitle && book.author !== myAuthor,
    );
    window.localStorage.setItem('bookShop', JSON.stringify(booksLeft));
  }
}

class UI {
  displayBooks = () => {
    const store = new Store();
    const books = store.getBooks();
    books.forEach((book) => {
      this.createBook(book);
    });
  }

  createBook = (book) => {
    const booksContainer = document.querySelector('#books-list');
    const bookContainer = document.createElement('div');
    bookContainer.className = 'single-book';
    const authorContainer = document.createElement('div');
    authorContainer.className = 'author-name';
    const span = document.createElement('span');
    span.textContent = 'by';
    const bookTitle = document.createElement('h3');
    bookTitle.className = 'title';
    const bookAuthor = document.createElement('h3');
    bookAuthor.className = 'author';
    const removeButton = document.createElement('button');
    removeButton.className = 'delete';
    removeButton.textContent = 'Remove';
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    authorContainer.append(bookTitle, span, bookAuthor);
    bookContainer.append(authorContainer, removeButton);

    booksContainer.appendChild(bookContainer);
  }

  addBook = (book) => {
    this.createBook(book);
  }

  removeBook = (button) => {
    const parentDiv = button.parentNode;
    parentDiv.remove();
  }

  clearInputs = () => {
    bookTitl.value = '';
    bookAutho.value = '';
  }
}

const viewBook = new UI();
const store = new Store();
document.addEventListener('DOMContentLoaded', viewBook.displayBooks());

addbookBtn.addEventListener('click', () => {
  const title = bookTitl.value;
  const author = bookAutho.value;
  const newBook = new Book(title, author);

  viewBook.addBook(newBook);
  store.addBook(newBook);
  viewBook.clearInputs();
});

document.addEventListener('click', (e) => {
  const button = e.target;
  if (button.className === 'delete') {
    viewBook.removeBook(button);
    store.removeBook(button);
  }
});
