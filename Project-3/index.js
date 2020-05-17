console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes == null) {
    notesObj = [];
    notesTitle = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitle = JSON.parse(title);
  }
  notesObj.push(addTxt.value);
  notesTitle.push(addTitle.value);
  localStorage.setItem("title",JSON.stringify(notesTitle));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value ="";
//   console.log(notesObj);
  showNotes();
});


function showNotes(){
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
      notesObj = [];
      notesTitle = [];
    } else {
      notesObj = JSON.parse(notes);
      notesTitle = JSON.parse(title);
    }
let html ="";
for(let i =0 ;i<notesObj.length;i++){
 html+= `
 <div class="noteCard my-2 mx-2 card col-lg-4 col-md-4 col-12" style="width: 18rem;">
         <div class="card-body">
             <h5 class="card-title">Title "${notesTitle[i]}"</h5>
             <p class="card-text"> ${notesObj[i]}</p>
             <button id="${i}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
         </div>
     </div>`;
}
if( notesObj.length != null)
{
    document.getElementById("notes").innerHTML = html;
}
else{
    document.getElementById("notes").innerHTML = `Nothing to show`;
}
}


// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

let notes = localStorage.getItem("notes");
let title = localStorage.getItem("title");
if (notes == null) {
  notesObj = [];
  notesTitle = [];
} else {
  notesObj = JSON.parse(notes);
  notesTitle = JSON.parse(title);
}

  notesObj.splice(index, 1);
  notesTitle.splice(index,1)
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title",JSON.stringify(notesTitle));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
