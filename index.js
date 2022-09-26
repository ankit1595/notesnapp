const getById = (id) => {
  return document.getElementById(id);
};
const addTitleId = "add-note-title";
const addContentId = "add-note-content";
const addNoteBtnId = "add-note-btn";

//declarations for bold, underline and copy
const text = document.querySelector("#add-note-content");
const boldButton = document.querySelector("#bold-btn");
const underlineButton = document.querySelector("#underline-btn");
let isBold = false;
let isUnderline = false;
text.contentEditable = "true";

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
  // const editBtn = document.createElement("button");
  // // id="show-notes-btn"
  // // data-toggle="modal"
  // // data-target="#exampleModalCenter"
  // document.getElementsByTagName("body")[0].appendChild = editBtn;
  // editBtn.setAttribute(
  //   "id",
  //   "show-notes-btn",
  //   "data-toggle",
  //   "modal",
  //   "data-target",
  //   "#exampleModalCenter"
  // );
  
  body.innerHTML =
    bodyHTML +
    `<div
  class="modal fade"
  id="exampleModalCenter"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">
          Edit Note
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default"
            >Title</span
          >
          <input type="text" id="add-note-title" class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value="${editObj.title ?? ""}" />
        </div>
        <div class="form-group">
          <!-- <textarea placeholder="Take a note..." class="form-control" id="add-note-content" rows="3"></textarea> -->
          <p
            id="add-note-content"
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
        <div class="buttons">
          <div class="util-btn">
            <button class="btn btn-sm btn-outline-dark" id="bold-btn">
              <b>B</b>
            </button>
            <button
              class="btn btn-sm btn-outline-dark"
              id="underline-btn"
              style="text-decoration: underline"
            >
              U
            </button>
            <button class="btn btn-sm btn-warning copy">Copy</button>
          </div>
          <div class="">
            <button class="btn btn-primary float-right" id="add-note-btn">
              Update Note
            </button>
            <button
              type="button"
              class="btn btn-secondary mx-2"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
  console.log(document.getElementsByTagName("body"));
  // allNotes.splice(index, 1);
  // console.log("allNotes: ", index);
  // localStorage.setItem("notes", JSON.stringify(allNotes));

  displayNotes();


}

function displayNotes() {
  text.contentEditable = "true";
  let notesContainer = getById("notes");
  let noteCard = "";
  let notes = localStorage.getItem("notes");
  if (notes) {
    allNotes = JSON.parse(notes);
  } else {
    allNotes = [];
    notesContainer.innerHTML = `No Notes!`;
  }
  /* allNotes
    .forEach((element, index) => {
      noteCard =
        noteCard +
        `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="note-title" style="display: ${
                      element.title ? "block" : "none"
                    }">${element?.title ?? ""}</h5>
                    <p class="note-content"> ${element?.content ?? ""}</p>
                    <small>${element?.noteDate ?? ""} </small>
                    <div>
                    <button
                    id="${index}" onclick="editNote(this.id)"
                    class="btn btn-primary float-right 
                    id="show-notes-btn"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                  E
                </button>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">D</button>
                    </div>
                </div>
                
            </div>`;
      notesContainer.innerHTML = noteCard;
    });*/

  for (let index = allNotes.length - 1; index >= 0; index--) {
    let element = allNotes[index];
    noteCard =
      noteCard +
      `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="note-title" style="display: ${
                      element.title ? "block" : "none"
                    }">${element?.title ?? ""}</h5>
                    <p class="note-content"> ${element?.content ?? ""}</p>
                    <small>${element?.noteDate ?? ""} </small>
                    <div>
                    <button
                    id="${index}" onclick="editNote(this.id)"
                    class="btn btn-primary float-right 
                    id="show-notes-btn"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                  E
                </button>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">D</button>
                    </div>
                </div>
                
            </div>`;
    notesContainer.innerHTML = noteCard;
    // if (notes.length) {
    //   notesContainer.innerHTML = noteCard;
    // } else {
    //   notesContainer.innerHTML = `No Notes!`;
    // }
  }
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
