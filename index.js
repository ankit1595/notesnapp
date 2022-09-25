const addTitleId = "add-note-title";
const addContentId = "add-note-content";
const savedTitleId = "saved-note-title";
const savedContentId = "saved-note-content";
const savedNoteCardId = "saved-note-card";
const saveNoteBtnId = "save-note-btn";

const getById = (id) => {
  return document.getElementById(id);
};

const addNoteTitle = getById(addTitleId);
const addNoteContent = getById(addContentId);
const savedNoteTitle = getById(savedTitleId);
const savedNoteContent = getById(savedContentId);
const savedNoteCard = getById(savedNoteCardId);
const saveNoteBtn = getById(saveNoteBtnId);
let addNoteTitleText = addNoteTitle.value;
let addNoteContentText = addNoteContent.value;

saveNoteBtn.addEventListener("click", saveNote);
addNoteTitle.addEventListener("input", saveTitleTemp);
addNoteContent.addEventListener("input", saveContentTemp);

function saveTitleTemp(e) {
  addNoteTitleText = e.target.value;
}
function saveContentTemp(e) {
  addNoteContentText = e.target.value;
}

//intially saved note should be hidden
// savedNoteCard.style.display = "none";

function saveNote(e) {
  e.preventDefault();

  addNoteTitle.value = "";
  addNoteContent.value = "";

  //display saved note card
  savedNoteCard.style.display = 'block'

  //Save note content to savedNote card
  savedNoteTitle.innerText = addNoteTitleText;
  savedNoteContent.innerText = addNoteContentText;
}

// savedNoteCard.addAttribute('id', i+1)
