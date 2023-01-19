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
  copyText.setSelectionRange(0, 9999);
  document.execCommand("copy");
  copyText.value = "Copied";
  copyText.onClick = null;
  window.getSelection().removeAllRanges();
};

socket.emit("join-room", ROOM_ID);

socket.on("user-connected", () => {
  document.getElementById("message").innerHTML = "User Connected";
  myClick = "X";
  otherClick = "O";
  enableClick = true;
  socket.emit("can-play");
});

socket.on("can-play", () => {
  myClick = "O";
  otherClick = "X";
  enableClick = true;
});

const clicked = (id) => {
  if (enableClick) {
    moves += 1;
    const element = document.getElementById(id);
    element.innerHTML = myClick;
    element.onclick = null;
    socket.emit("clicked", id);
    enableClick = false;
    gameStatus[id - 1] = 1;
  }

  //example:user1 clicks the first box then gamstatus[1-1]=1;
  //the gamestatus becomes ['1','0','0','0','0','0','0','0','0']
  //let user clicked  the first three row
  //then gamestatus becomes = gamestatus[1,1,1,2,2,1,2,1,1 ] then u win message appends else there is nine moves and no match to the below logic then draw message append
  if (
    (gameStatus[0] == 1 && gameStatus[1] == 1 && gameStatus[2] == 1) ||
    (gameStatus[0] == 1 && gameStatus[3] == 1 && gameStatus[6] == 1) ||
    (gameStatus[0] == 1 && gameStatus[4] == 1 && gameStatus[8] == 1) ||
    (gameStatus[2] == 1 && gameStatus[5] == 1 && gameStatus[8] == 1) ||
    (gameStatus[2] == 1 && gameStatus[4] == 1 && gameStatus[6] == 1) ||
    (gameStatus[1] == 1 && gameStatus[4] == 1 && gameStatus[7] == 1) ||
    (gameStatus[3] == 1 && gameStatus[4] == 1 && gameStatus[5] == 1) ||
    (gameStatus[6] == 1 && gameStatus[7] == 1 && gameStatus[8] == 1)
  ) {
    document.getElementById("message").innerHTML = "You win";
    enableClick = false;
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  } else if (moves == 9) {
    document.getElementById("message").innerHTML = "It's a Draw";
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  }

  //socket event on the clicked change to the box element to letter of other user after his click
  //
};

socket.on("clicked", (id) => {
  moves += 1;
  const element = document.getElementById(id);
  element.innerHTML = otherClick;
  element.onclick = null;
  socket.emit("clicked", id);
  enableClick = true;
  gameStatus[id - 1] = 2;

  //example:user1 clicks the first box then gamstatus[1-1]=1;
  //the gamestatus becomes ['1','0','0','0','0','0','0','0','0']
  //let user clicked  the first three row
  //then gamestatus becomes = gamestatus[1,1,1,2,2,1,2,1,1 ] then u win message appends else there is nine moves and no match to the below logic then draw message append
  if (
    (gameStatus[0] == 1 && gameStatus[1] == 1 && gameStatus[2] == 1) ||
    (gameStatus[0] == 1 && gameStatus[3] == 1 && gameStatus[6] == 1) ||
    (gameStatus[0] == 1 && gameStatus[4] == 1 && gameStatus[8] == 1) ||
    (gameStatus[2] == 1 && gameStatus[5] == 1 && gameStatus[8] == 1) ||
    (gameStatus[2] == 1 && gameStatus[4] == 1 && gameStatus[6] == 1) ||
    (gameStatus[1] == 1 && gameStatus[4] == 1 && gameStatus[7] == 1) ||
    (gameStatus[3] == 1 && gameStatus[4] == 1 && gameStatus[5] == 1) ||
    (gameStatus[6] == 1 && gameStatus[7] == 1 && gameStatus[8] == 1)
  ) {
    document.getElementById("message").innerHTML = "You lose";
    enableClick = false;
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  } else if (moves == 9) {
    document.getElementById("message").innerHTML = "It's a Draw";
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  }
});
