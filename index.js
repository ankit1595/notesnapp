const getById = (id) => {
  return document.getElementById(id);
};
const addTitleId = "add-note-title";
const addContentId = "add-note-content";
const addNoteBtnId = "add-note-btn";

let allNotes;
let errorMessage = "";
// localStorage.clear();

// const noteDate = String(new Date()).slice(4, 15);

const addNoteTitle = getById(addTitleId);
const addNoteContent = getById(addContentId);
const addNoteBtn = getById(addNoteBtnId);

//to display notes initially and on refresh
displayNotes();

addNoteBtn.addEventListener("click", () => {
  let errorDiv = document.querySelector("#error-message");
  errorDiv.innerText = "";
  if (addNoteContent.innerText) {
    addNote();
  } else {
    errorDiv.innerText =
      "Note contents are empty. Add content in order to save note.";
  }
});

function addNote() {
  console.log("Add note Button clicked");
  let notes = localStorage.getItem("notes");
  if (notes) {
    allNotes = JSON.parse(notes);
  } else {
    allNotes = [];
  }
  allNotes.push({
    title: addNoteTitle.value,
    content: addNoteContent.innerHTML,
    noteDate: String(new Date()).slice(4, 15),
  });
  localStorage.setItem("notes", JSON.stringify(allNotes));
  addNoteTitle.value = "";
  addNoteContent.innerText = "";
  console.log(allNotes);
  displayNotes();
}

function deleteNote(index) {
  console.log("delete: ", index)
  // let notes = localStorage.getItem("notes");
  // if (notes) {
  //   allNotes = JSON.parse(notes);
  // } else {
  //   allNotes = [];
  // }
  // allNotes.splice(index, 1);
  console.log("allNotes: ", allNotes);
  // localStorage.setItem("notes", JSON.stringify(allNotes));
  displayNotes();
}

function displayNotes() {
  let notesContainer = getById("notes");
  let noteCard = "";
  let notes = localStorage.getItem("notes");
  if (notes) {
    allNotes = JSON.parse(notes);
  } else {
    allNotes = [];
    notesContainer.innerHTML = `No Notes!`;
  }
  allNotes
    .slice()
    .reverse()
    .forEach((element, index, array) => {
      noteCard =
        noteCard +
        `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="note-title" style="display: ${
                      element.title ? "block" : "none"
                    }">${element?.title ?? ""}</h5>
                    <p class="note-content"> ${element?.content ?? ""}</p>
                    <small>${element?.noteDate ?? ""} </small>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
      notesContainer.innerHTML = noteCard;
    });
}

const text = document.querySelector("#add-note-content");
const boldButton = document.querySelector("#bold-btn");
const underlineButton = document.querySelector("#underline-btn");
let isBold = false;
let isUnderline = false;

text.contentEditable = "true";

function bold(e) {
  e.preventDefault();
  isBold = !isBold;
  if (isBold) {
    boldButton.classList.replace("btn-outline-dark", "btn-dark");
  } else {
    boldButton.classList.replace("btn-dark", "btn-outline-dark");
  }
  document.execCommand("bold");
}

function underline(e) {
  e.preventDefault();
  isUnderline = !isUnderline;
  if (isUnderline) {
    underlineButton.classList.replace("btn-outline-dark", "btn-dark");
  } else {
    underlineButton.classList.replace("btn-dark", "btn-outline-dark");
  }
  document.execCommand("underLine");
}

boldButton.addEventListener("click", bold);
underlineButton.addEventListener("click", underline);

document.addEventListener("click", (e) => {
  if (e.target.closest(".copy")) {
    console.log(
      "copy: ",
      e.target.closest(".copy").parentElement.lastElementChild
        .previousElementSibling.previousElementSibling.previousElementSibling
        .previousElementSibling
    );
    const copytext =
      e.target.closest(".copy").parentElement.lastElementChild
        .previousElementSibling.previousElementSibling.previousElementSibling
        .previousElementSibling.innerText;
    const textArea = document.createElement("textarea");
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.value = copytext;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.classList.add("hide");
  }
});
