console.log('This is ES6 version of Project 2');
let bookName, bookAuthor, bookType;
showdetails();
class Book {
    constructor(givenname, givenauthor, giventype) {
        this.name1 = givenname;
        this.author1 = givenauthor;
        this.type1 = giventype;
        let name = localStorage.getItem("name");
        let author = localStorage.getItem("author");
        let type = localStorage.getItem("type");
        if (name == null) {
            bookName = [];
            bookAuthor = [];
            bookType = [];
        } else {
            bookName = JSON.parse(name);
            bookAuthor = JSON.parse(author);
            bookType = JSON.parse(type)
        }
        bookName.push(this.name1);
        bookAuthor.push(this.author1);
        bookType.push(this.type1);
        localStorage.setItem("name", JSON.stringify(bookName));
        localStorage.setItem("author", JSON.stringify(bookAuthor));
        localStorage.setItem("type", JSON.stringify(bookType));
    }
}

class Display {
    add() {
        // console.log("Adding to UI");
        let name = localStorage.getItem("name");
        let author = localStorage.getItem("author");
        let type = localStorage.getItem("type");
        if (name == null) {
            bookName = [];
            bookAuthor = [];
            bookType = [];
        } else {
            bookName = JSON.parse(name);
            bookAuthor = JSON.parse(author);
            bookType = JSON.parse(type)
        }
        let tableBody = document.getElementById('tableBody');
        let uiString = "";
        for (let i = 0; i < bookName.length; i++) {
            uiString += `<tr>
            <td>${bookName[i]}</td>
            <td>${bookAuthor[i]}</td>
            <td>${bookType[i]}</td>
        </tr>`;
        }
        if (bookName.length != null) {
            document.getElementById("tableBody").innerHTML = uiString;
        }
        else {
            document.getElementById("tableBody").innerHTML = `Nothing to show`;
        }
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(name, author) {
        if (name.length < 2 || author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);

    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(name, author)) {

        display.add();
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}

function showdetails() {
    let name = localStorage.getItem("name");
    let author = localStorage.getItem("author");
    let type = localStorage.getItem("type");
    if (name == null) {
        bookName = [];
        bookAuthor = [];
        bookType = [];
    } else {
        bookName = JSON.parse(name);
        bookAuthor = JSON.parse(author);
        bookType = JSON.parse(type)
    }
    let tableBody = document.getElementById('tableBody');
    let uiString = "";
    for (let i = 0; i < bookName.length; i++) {
        uiString += `<tr>
            <td>${bookName[i]}</td>
            <td>${bookAuthor[i]}</td>
            <td>${bookType[i]}</td>
        </tr>`;
    }
    if (bookName.length != null) {
        document.getElementById("tableBody").innerHTML = uiString;
    }
    else {
        document.getElementById("tableBody").innerHTML = `Nothing to show`;
    }
}

// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function(){

//     let inputVal = search.value.toLowerCase();
//     // console.log('Input event fired!', inputVal);
//     let tablegroup = document.getElementsByClassName('tablegroup');
//     Array.from(tablegroup).forEach(function(element){
//         let cardTxt1 = element.getElementsByTagName("td")[0].innerText.toLowerCase();
//         let cardTxt2 = element.getElementsByTagName("td")[1].innerText.toLowerCase();
//         let cardTxt3 = element.getElementsByTagName("td")[2].innerText.toLowerCase();
//         // let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
//         if(cardTxt1.includes(inputVal) || cardTxt2.includes(inputVal) || cardTxt3.includes(inputVal)){
//             element.getElementsByTagName("td").style.color = "Yellow";
//         }
//         else{
//             element.getElementsByTagName("td").style.color = "black";
//         }
//         // console.log(cardTxt);
//     })
// })
