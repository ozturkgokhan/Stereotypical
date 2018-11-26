
//Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

//Add book to the book list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `; 

  list.appendChild(row);
}

UI.prototype.showMessage = function(message, className){
  const div = document.createElement('div');

  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  //Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);
  
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

UI.prototype.clearInputs = function(title, author, isbn){
  title.value = '';
  author.value = '';
  isbn.value = '';
}

UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    // Get book name to show in message before deleting
    const booktitle = target.parentElement.parentElement.childNodes[1].innerHTML;

    target.parentElement.parentElement.remove();

    // cShow succesfull delete message
    this.showMessage(`Book with title  "${booktitle}" is succesfully removed from the library`  , 'success');
  }
  
}


//Event Listeners
//Add book to the list (submit button event) event listener
document.getElementById('book-form').addEventListener('submit', addBook);

const ui = new UI();

// Event listener for adding a book to the list
function addBook(e){
  //Get form values
  const title = document.getElementById('title'),
        author = document.getElementById('author'),
        isbn = document.getElementById('isbn');
  
  const book = new Book(title.value, author.value, isbn.value);

  //Required field validators
  if((title.value && author.value && isbn.value) === ''){
    // Show error message
    ui.showMessage('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);
    ui.clearInputs(title , author, isbn);
    
    // Show success message
    ui.showMessage('Book is succefully added to the library', 'success');
  };

  e.preventDefault();
}


// event listener for deleting a book from the list
document.getElementById('book-list').addEventListener('click', function(e){

  ui.deleteBook(e.target);
  e.preventDefault();
})