let myLibrary = [];


const addSafeHTML = function (str) {
	const temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};



function Book(title, author, totalPages,didRead)  {
    this.title = title,
    this.author = author,
    this.totalPages = totalPages,
    this.didRead = didRead
};


function getBookshelves() {
    const body = document.getElementById('body');
    body.innerHTML = "";

    myLibrary.forEach(book => {
    
        const  newBook = document.createElement('div');
        newBook.className = "book";

        const bookTitle = document.createElement('div');
        bookTitle.className = "title";
        bookTitle.innerText = book.title;

        const mainBody = document.createElement('div');
        mainBody.className = "mainContent";

        const authorInfo = document.createElement('div')
        const author =  ` ${book.author}`
        authorInfo.innerHTML += '<b>Author: </b>' + addSafeHTML(author);
    
        const pageInfo = document.createElement('div');
        const pageProgress = `${book.totalPages}`;
        pageInfo.innerHTML += '<b>Pages</b>: ' + addSafeHTML(pageProgress);

        const readInfo = document.createElement('div');
        const didRead = `${book.didRead}`
        readInfo.innerHTML += '<b>Read? </b>' + addSafeHTML(didRead);

        const footer = document.createElement('div');
        footer.className = "footbar";

        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        editButton.className = "bookButton bookEditButton";
        deleteButton.className = "bookButton bookDeleteButton";
        editButton.innerText = "✏️Change Read Status";
        deleteButton.innerText = "🗑️Delete";

        body.appendChild(newBook);

        newBook.appendChild(bookTitle);
    
        newBook.appendChild(mainBody);
        mainBody.appendChild(authorInfo);
        mainBody.appendChild(pageInfo);
        mainBody.appendChild(readInfo);

        newBook.appendChild(footer);
        footer.appendChild(editButton);
        footer.appendChild(deleteButton);

        newBook.setAttribute('data-arraynum', myLibrary.indexOf(book));
        
    })
    addDeleteAbility();
    addReadChangeAbility()
}


function addBookToLibrary(bookName) {
    myLibrary.push(bookName);
    getBookshelves();
};


const form = document.getElementById('form');

document.getElementById('newBookButton').addEventListener('click', () => {
    document.getElementById('addPopup').style = "display: flex";

});

document.getElementById('addPopupCancel').addEventListener('click', () => {
    document.getElementById('addPopup').style = "display: none";
    
});

document.getElementById('addPopupFinalize').addEventListener('click', () => {
    let newBook = new Book(form.bookname.value,form.authorname.value,form.bookpagesTotal.value, "No");
    addBookToLibrary(newBook);
    document.getElementById('addPopup').style = "display: none";
    
});

function addDeleteAbility() {
    document.querySelectorAll('.bookDeleteButton').forEach(deleteButton => { 
        deleteButton.addEventListener("click",(e) => {
            const indexNumber = parseInt(e.target.parentElement.parentElement.getAttribute('data-arraynum'));
            myLibrary.splice(indexNumber, 1);
            getBookshelves();
        });
    }
);
}

function addReadChangeAbility() {
    document.querySelectorAll('.bookEditButton').forEach(editButton => { 
        editButton.addEventListener("click",(e) => {
            const indexNumber = parseInt(e.target.parentElement.parentElement.getAttribute('data-arraynum'));
            if (myLibrary[indexNumber].didRead == 'Yes') {
                myLibrary[indexNumber].didRead = 'No';
            } else if (myLibrary[indexNumber].didRead == 'No') {
                myLibrary[indexNumber].didRead = 'Yes';
            }
            getBookshelves();
        });
    }
);

    
}

