const getById = (id) => {
  return document.getElementById(id);
};

// IDs declarations
const addTitleId = "add-note-title";
const addContentId = "add-note-content";
const addNoteBtnId = "add-note-btn";
// for Edit Note
let editTitleId = "edit-note-title";
let editContentId = "edit-note-content";
let editNoteBtnId = "edit-note-btn";
let editBoldBtnId = "edit-bold-button";

//declarations for bold, underline and copy
const text = document.querySelector("#add-note-content");
const boldButton = document.querySelector("#bold-btn");
const underlineButton = document.querySelector("#underline-btn");
let isBold = false;
let isUnderline = false;
let isBoldInEdit = false;
let isUnderlineInEdit = false;
text.contentEditable = "true";

let allNotes;
let errorMessage = "";
// localStorage.clear();

// const noteDate = String(new Date()).slice(4, 15);

const addNoteTitle = getById(addTitleId);
const addNoteContent = getById(addContentId);
const addNoteBtn = getById(addNoteBtnId);
let editNoteTitle = getById(editTitleId);
let editNoteContent = getById(editContentId);
let editNoteBtn = getById(editNoteBtnId);
let editBoldBtn = getById(editBoldBtnId);

//to display notes initially and on refresh
displayNotes();

//Event Listeners
//1. AddNote
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
  console.log("delete: ", index);
  let notes = localStorage.getItem("notes");
  if (notes) {
    allNotes = JSON.parse(notes);
  } else {
    allNotes = [];
  }
  allNotes.splice(index, 1);
  console.log("allNotes: ", allNotes);
  localStorage.setItem("notes", JSON.stringify(allNotes));
  displayNotes();
}

function updateNote(index) {
  editNoteTitle = getById(editTitleId);
  editNoteContent = getById(editContentId);
  // editNoteBtn = getById(editNoteBtnId);

  console.log("update: ", index);
  console.log("editNoteTitle: ", editNoteTitle.value);
  console.log("editNoteContent: ", editNoteContent.innerHTML);
  let notes = localStorage.getItem("notes");
  if (notes) {
    allNotes = JSON.parse(notes);
  } else {
    allNotes = [];
  }
  allNotes[index] = {
    title: editNoteTitle.value,
    content: editNoteContent.innerHTML,
    noteDate: String(new Date()).slice(4, 15),
  };
  console.log("allNotes: ", allNotes);
  localStorage.setItem("notes", JSON.stringify(allNotes));
  window.location.reload();
  displayNotes();
}

const body = document.getElementsByTagName("body")[0];
const bodyHTML = body.innerHTML;

function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes) {
    allNotes = JSON.parse(notes);
  } else {
    allNotes = [];
  }
  console.log("edit: ", allNotes[index]);
  const editObj = allNotes[index];

  body.innerHTML =
    bodyHTML +
    `<div
  class="modal fade"
  data-backdrop="static"
  // id="exampleModalCenter"
  id="staticBackdrop"
  tabindex="-1"
  role="dialog"
  // aria-labelledby="exampleModalCenterTitle"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" 
        // id="exampleModalLongTitle"
        id="staticBackdropLabel"
        >
          Edit Note
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          onclick="window.location.reload();"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default"
            >Title</span
          >
          <input type="text" id="edit-note-title" class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value="${editObj.title ?? ""}" />
        </div>
        <div class="form-group">
          <!-- <textarea placeholder="Take a note..." class="form-control" id="edit-note-content" rows="3"></textarea> -->
          <p
            id="edit-note-content"
            class="form-control"
            contenteditable="true"
            ;
            style="overflow-y: auto; height: 130px"
          >
            ${editObj?.content ?? ""}
          </p>
          <div
            id="error-message"
            style="color: red; margin-bottom: 10px; font-size: 14px"
          ></div>
        </div>
        <div class="buttons justify-content-end">
          <!-- <div class="util-btn">
            <button class="btn btn-sm btn-outline-dark" id="edit-bold-btn">
              <b>B</b>
            </button>
            <button
              class="btn btn-sm btn-outline-dark"
              id="underline-btn"
              style="text-decoration: underline"
            >
              U
            </button>
            <button class="btn btn-sm btn-warning edit-copy">Copy</button>
          </div> -->
          <div class="">
          <button
            type="button"
            class="btn btn-secondary mx-2"
            data-dismiss="modal"  
            onclick="window.location.reload();"
          >
            Close
          </button>
            <button class="btn btn-primary float-right" id="${index}" onclick="updateNote(this.id)">
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

  displayNotes();
  editTitleId = "edit-note-title";
  editContentId = "edit-note-content";
  editBoldBtnId = "edit-bold-button";
  editBoldBtn = getById(editBoldBtnId);
}

function displayNotes() {
  // text.contentEditable = "true";
  let notesContainer = getById("notes");
  let noteCard = "";
  let notes = localStorage.getItem("notes");
  if (notes) {
    allNotes = JSON.parse(notes);
  } else {
    allNotes = [];
    notesContainer.innerHTML = `No Notes!`;
  }

  for (let index = allNotes.length - 1; index >= 0; index--) {
    let element = allNotes[index];
    noteCard =
      noteCard +
      ` <div class="noteCard my-2 mx-2 card" id="note" style="width: 18rem;">
      <div class="card-body   ">
      <h5 class="note-title" style="display: ${
        element.title ? "block" : "none"
      }">${element?.title ?? ""}</h5>
        <!-- <hr /> -->
        <p class="note-content">  ${element?.content ?? ""}</p>
        <hr/>
        <div  id="cardfoot" class=" d-flex justify-content-between align-items-center ">
          <span class="date" >${element?.noteDate ?? ""} </span>
        <div class=" align-items-center  ">
          <button
          id="${index}" onclick="editNote(this.id)"
        class="btn btn-outline-primary float-right mx-2 
        id="show-notes-btn"
        data-toggle="modal"
        // data-target="#exampleModalCenter"
        data-target="#staticBackdrop"
      >
      <i class=" fa fa-pencil "></i>

    </button>
    <i class="fa-light fa-pen-to-square "></i>
    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-secondary">
      <i class=" fa fa-trash "></i>
          
        </button>
        </div>
        </div>
    </div>
  </div>`;
    notesContainer.innerHTML = noteCard;
  }
}

function boldInsideEdit(e) {
  e.preventDefault();
  isBoldInEdit = !isBoldInEdit;
  if (isBoldInEdit) {
    editBoldBtn.classList.replace("btn-outline-dark", "btn-dark");
  } else {
    editBoldBtn.classList.replace("btn-dark", "btn-outline-dark");
  }
  document.execCommand("bold");
}

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

//edit pop up bold button
editBoldBtn.addEventListener("click", boldInsideEdit);

document.addEventListener("click", (e) => {
  if (e.target.closest(".copy")) {
    const copytext =
      e.target.closest(".copy").parentElement.parentElement
        .previousElementSibling.lastElementChild.previousElementSibling
        .innerText;
    console.log("copy: ", copytext);
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
