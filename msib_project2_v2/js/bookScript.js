let myLibrary = [];

document.addEventListener('DOMContentLoaded', function(){
const storedBooks = localStorage.getItem('myLibrary');
if (storedBooks) {
    myLibrary = JSON.parse(storedBooks);
    renderBooks();
}

function addBook() {
    const id = creatingId();
    const title = document.getElementById('inputTitle').value;
    const author = document.getElementById('inputAuthor').value;
    const year = parseInt(document.getElementById('inputYear').value, 10);
    const readCheckbox = document.getElementById('inputIsComplete');
    const isComplete = readCheckbox.checked;

    const newBook = { id, title, author, year, isComplete};

    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    console.log(newBook);
    renderBooks();
    submitForm.reset();
}

function creatingId() {
    return +new Date();
}

function renderBooks() {
const incomplete = document.getElementById('incomplete');
const complete = document.getElementById('complete');

incomplete.innerHTML = '';
complete.innerHTML = '';

    myLibrary.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book_items');
        bookItem.innerHTML = `
            <h3 style="color: rgb(84, 52, 160);">${book.title}</h3>
            <p>Author : ${book.author}</p>
            <p>Year : ${book.year}</p>
            <div class="action">
                <button class="${book.isComplete ? 'purple' : 'purple'}" onclick="toggleBooksStatus(${book.id})">
                    ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
                </button>
                <button class="aliceblue" onclick="deleteBook(${book.id})">Hapus buku</button>
            </div>
        `;

        if (book.isComplete) {
            complete.appendChild(bookItem);
        } else {
            incomplete.appendChild(bookItem);
        }
    });

    console.log(myLibrary);
}

window.toggleBooksStatus = function(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary[index].isComplete = !myLibrary[index].isComplete;
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        console.log(myLibrary[index]);
        renderBooks();
    }
}

const submitForm = document.getElementById('inputBook');
submitForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    addBook();
});

const clearSearchButton = document.getElementById('clearSearch');
clearSearchButton.addEventListener('click', function() {
    document.getElementById('searchByTitle').value = '';
    document.getElementById('searchResult').innerHTML = '';
});

const searchForm = document.getElementById('searchBook');
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTitle = document.getElementById('searchByTitle').value.trim().toLowerCase();
    const searchResult = myLibrary.filter(book => book.title.toLowerCase().includes(searchTitle));
    renderSearchResult(searchResult);
});

function renderSearchResult(searchResult) {
    const searchResultContainer = document.getElementById('searchResult');
    searchResultContainer.innerHTML = '';
    if (searchResult.length > 0) {
        searchResult.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book_items');
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author : ${book.author}</p>
                <p>Year : ${book.year}</p>
            `;
            searchResultContainer.appendChild(bookItem);
        });
    } else {
        searchResultContainer.innerHTML = '<p>Unknown</p>';
    }
}

window.deleteBook = function(id) {
    const confirmation = confirm('Delete Book?');
    if (confirmation) {
        myLibrary = myLibrary.filter(book => book.id !== id);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        renderBooks();
    }
}
});