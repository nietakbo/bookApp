const select = {
  listOfBooks: '.books-list',
  bookTemplate: '#template-book',
};

const templates = {
  bookTemplate: Handlebars.compile(document.querySelector(select.bookTemplate).innerHTML),
};
class BooksList{
  constructor(){
    const thisBooksList = this;
    thisBooksList.favoriteBooks = [];

    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }

  initData(){
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;
  }

  getElements(){
    const thisBooksList = this;
    thisBooksList.dom={};
    thisBooksList.dom.booksList = document.querySelector(select.listOfBooks);
  }

  render(){
    const thisBooksList = this;
  
    for(let book of thisBooksList.data){
      const generatedHTML = templates.bookTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      thisBooksList.dom.booksList.appendChild(generatedDOM);
    }
  }

  initActions(){
    const thisBooksList = this;
    const clickedBooks = document.querySelectorAll('a');
    console.log(clickedBooks);
    for(let clickedBook of clickedBooks){
      clickedBook.addEventListener('dblclick', function(event){
        event.preventDefault();
        let bookId = clickedBook.getAttribute('data-id');
        if(!thisBooksList.favoriteBooks.includes(bookId)){
          clickedBook.classList.add('favorite');
          thisBooksList.favoriteBooks.push(bookId);
          console.log(thisBooksList.favoriteBooks);
        }
        else{
          const bookIndex = thisBooksList.favoriteBooks.indexOf(bookId);
          thisBooksList.favoriteBooks.splice(bookIndex,1);
          clickedBook.classList.remove('favorite');
        }
      });
    }
  }
    
}


const app = new BooksList();
console.log(app);