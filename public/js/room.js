let gameStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let moves = 0;
let myClick = 0;
let otherClick = 0;
const socket = io("/");

let enableClick = false;

document.getElementById("url").value = location;
const copyToClip = () => {
  copyText = document.getElementById("url");
  copyText.select();
  copyText.setSelectionRange(0, 9999)
  document.execCommand("copy")
  copyText.value = "Copied"
  copyText.onClick = null 
  window.getSelection().removeAllRanges()
};
