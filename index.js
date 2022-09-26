const text = document.querySelector(".decs");
const boldButton = document.querySelector("#bold");
const underlineButton = document.querySelector("#underline");

text.contentEditable = "true";

function bold(e) {
  e.preventDefault();
  {
    document.execCommand("bold");
  }
}

function underline(e) {
  e.preventDefault();
  document.execCommand("underLine");
}

boldButton.addEventListener("click", bold);
underlineButton.addEventListener("click", underline);

const newNoteButton = document.getElementById("addNote");
const newNoteEditor = document.getElementById("newNoteDialog");
const discardBtn = document.querySelector(".discard");

function openModal(e) {
  newNoteEditor.show();
  
}

function closeModal() {
  newNoteEditor.close();
}
newNoteButton.addEventListener("click", openModal);
discardBtn.addEventListener("click", closeModal);
