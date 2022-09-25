const text = document.querySelector("#decs");
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

// Bold the selected text
// function makeTextBold(e) {
//   e.preventDefault();
//   const selecText = window.getSelection().getRangeAt(0);
//   const boldText = "<b>" + selecText + "</b>";
//   text.innerHTML = text.innerHTML.replace(selecText, boldText);
//   console.log(text.innerHTML);
// }

// Underline the selected text
// function makeTextUnderline(e) {
//   e.preventDefault();
//   const selecText = window.getSelection().getRangeAt(0);
//   const underlineText = `<span style="text-decoration: underline">${selecText}</span>`;
//   text.innerHTML = text.innerHTML.replace(selecText, underlineText);
//   console.log(text.innerHTML);
// }
