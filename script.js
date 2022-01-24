const noteAreaDiv = document.querySelector(".note-area");
let noteID = 1;
function Note(id,title,content){
    this.id = id;
    this.title = title;
    this.content = content;
}

// add event listener

function eventlisteners(){
  document.getElementById("addnote-btn").
  addEventListener("click", addNewNote);
  document.addEventListener("DOMContentLoaded", displayNotes);
  noteAreaDiv.addEventListener("click", deleteNote);

}

// get item from local storage

function getDataFromStorage(){
    return localStorage.getItem("notes") ?JSON.parse(localStorage.getItem("notes")): [];
}

eventlisteners();

//add new note

function addNewNote(){
    const noteTitle = document.getElementById("note-title");
    const noteContent = document.getElementById("note-content");

    if(ValidateInput(noteTitle, noteContent)){
        let notes = getDataFromStorage();
        let noteItem = new Note(noteID, noteTitle.value, noteContent.value);
        noteID++
        notes.push(noteItem);
        createNote(noteItem);
        // saving to local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        noteTitle.value="";
        noteContent.value="";

    }
}


// input validation

function ValidateInput(title, content){
    if(title.value !== "" && content.value !== ""){
        return true;
    }else {
        if(title.value === "") {title.classList.add("warning");}
        if(content.value === ""){content.classList.add("Warning");}

    }
    setTimeout(() => {
        title.classList.remove("warning");
        content.classList.remove("warning");  
    }, 1600);
}

// create new note div


function createNote(noteItem){
    const div = document.createElement("div");
    div.classList.add("note-item");
    div.setAttribute("data-id", noteItem.id);
    div.innerHTML = `
    <h3>${noteItem.title}</h3>
    <p>${noteItem.content}</p>
    <button id="delnote-btn" class="delbtn" type="button"><span><i class="fas fa-trash"></i></span></button>
    `;
    noteAreaDiv.appendChild(div);
}

// display notes from local storage

function displayNotes(){
    let notes = getDataFromStorage();
    if(notes.length > 0){
        noteID = notes[notes.length - 1].id;
        noteID++;
    }else{
        noteID = 1;
    }
    notes.forEach(item => {
        createNote(item);
    });
}

// delete note

function deleteNote(e){
    if(e.target.classList.contains("delbtn")){
        // Removing from DOM
        e.target.parentElement.remove();
        let divID = e.target.parentElement.dataset.id;
        let notes = getDataFromStorage();
        let newNotesList = notes.filter(item => {
            return item.id !== parseInt(divID);
        });
        localStorage.setItem("notes", JSON.stringify(newNotesList));
    }
}