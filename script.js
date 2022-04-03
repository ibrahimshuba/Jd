// book class reprsent a book
class Book {
  constructor(bookcover, title, subtitle, allauthors, number_of_pages, description, id) {
    this.bookcover = bookcover;
    this.title = title;
    this.subtitle = subtitle;
    this.allauthors = allauthors;
    this.number_of_pages = number_of_pages;
    this.description = description;
    this.id = id;
  }
// store class Hndless storage
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    } return books;
  }

  static addBooks(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Book.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static addBooksToList(book) {
    const list = document.querySelector('#books-list');

    const itemsList = document.createElement('li');

    itemsList.innerHTML = `
	<div class="row">

    <div class="card">
     
      <div class="container">
        <div class="vertical-menu">
		 <img src=" ${book.bookcover}">
		   <br/><label>Title</label> 
		<a>${book.title}</a>
		 <br/><label>Sub Title</label> 
		<a>${book.subtitle}</a>
		 <br/><label>Author(s)</label> 
		<a>${book.allauthors}</a>
		 <br/><label>Number of Pages</label> 
		<a>${book.number_of_pages}</a>
		 <br/><label>Description</label> 
		<a>${book.description}</a>
        <button id=${book.id} type="submit" class="remove">Remove</button>
		</div>
		</div>
	
        `;

    list.appendChild(itemsList);
  }

  static displayBooks() {
    const books = Book.getBooks();

    books.forEach((book) => Book.addBooksToList(book));
  }

  static deleteBook(target) {
    if (target.classList.contains('remove')) {
      target.parentElement.remove();
    }
  }
}
 // this code allow to event display books
document.addEventListener('DOMContentLoaded', Book.displayBooks);
// Event Add a book
const form = document.querySelector('#books-form');
// Get form values
form.addEventListener('submit', () => {
  const bookcover = document.querySelector('#bookcover').value;
  const title = document.querySelector('#title').value;
  const subtitle = document.querySelector('#subtitle').value;
  const allauthors = document.querySelector('#allauthors').value;
  const number_of_pages = document.querySelector('#number_of_pages').value;
  const description = document.querySelector('#description').value;
  const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

  const book = new Book(bookcover,title, subtitle, allauthors, number_of_pages, description, id);

  Book.addBooksToList(book);
  Book.addBooks(book);

  form.reset();
});
// this code allwo to remove code
document.querySelector('#books-list').addEventListener('click', (e) => {
  Book.deleteBook(e.target);

  Book.removeBook(e.target.id);
});

const addBookToList = document.getElementById('book-list');
const openForm = document.getElementById('open-form');
const openfeatured = document.getElementById('open-featured');
const addNew = document.getElementById('add_books');
const bookList = document.getElementById('books-list');
const featured = document.getElementById('featured');

function showForm() {
  addNew.classList.remove('none');
  bookList.classList.add('none');
  featured.classList.add('none');
}

function showBook() {
  bookList.classList.remove('none');
  addNew.classList.add('none');
  featured.classList.add('none');
}

function showfeatured() {
  featured.classList.remove('none');
  bookList.classList.add('none');
  addNew.classList.add('none');
}

openForm.addEventListener('click', showForm);

addBookToList.addEventListener('click', showBook);

openfeatured.addEventListener('click', showfeatured);
