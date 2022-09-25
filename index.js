const addTitleId = "add-note-title";
const addContentId = "add-note-content";
// const savedTitleId = "note-title";
// const savedContentId = "note-content";
// const savedNoteCardId = "note-card";
const addNoteBtnId = "add-note-btn";
let allNotes;
let errorMessage = "";
// localStorage.clear();

const getById = (id) => {
  return document.getElementById(id);
};

const addNoteTitle = getById(addTitleId);
const addNoteContent = getById(addContentId);
const addNoteBtn = getById(addNoteBtnId);
// const savedNoteTitle = getById(savedTitleId);
// const savedNoteContent = getById(savedContentId);
// const savedNoteCard = getById(savedNoteCardId);
// let addNoteTitleText = addNoteTitle.value;
// let addNoteContentText = addContent.value;

//////////

addNoteBtn.addEventListener("click", () => {
  let errorDiv = document.querySelector("#error-message");
  errorDiv.innerText = "";
  if (addNoteContent.value) {
    addNote();
  } else {
    errorDiv.innerText =
      "Note contents are emply. Add content in order to save note.";
  }
});
// addNoteTitle.addEventListener("input", saveTitleTemp);
// addContent.addEventListener("input", saveContentTemp);

// function saveTitleTemp(e) {
//   addNoteTitleText = e.target.value;
// }
// function saveContentTemp(e) {
//   addNoteContentText = e.target.value;
// }

function addNote(e) {
  console.log("Add note Button clicked");
  let notes = localStorage.getItem("notes");
  if (notes) {
    allNotes = JSON.parse(notes);
  } else {
    allNotes = [];
  }
  allNotes.push({ title: addNoteTitle.value, content: addNoteContent.value });
  localStorage.setItem("notes", JSON.stringify(allNotes));
  addNoteTitle.value = "";
  addNoteContent.value = "";
  console.log(allNotes);

  let notesContainer = getById("notes");
  let noteCard = "";
  allNotes.forEach((element, index) => {
    noteCard =
      noteCard +
      `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="note-title">${element?.title ?? ""}</h5>
                    <p class="note-content"> ${element?.content ?? ""}</p>
                    <!-- <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button> -->
                </div>
            </div>`;
    notesContainer.innerHTML = noteCard;
  });
}

//intially saved note should be hidden
// savedNoteCard.style.display = "none";

// function saveNote(e) {
//   e.preventDefault();

//   addNoteTitle.value = "";
//   addContent.value = "";

//   //display saved note card
//   savedNoteCard.style.display = 'block'

//   //Save note content to savedNote card
//   savedNoteTitle.innerText = addNoteTitleText;
//   savedNoteContent.innerText = addNoteContentText;
// }
