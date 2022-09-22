const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let chance = "X";
let gameArr = [];
const centre = document.querySelector(".centre");
const resetBtn = document.querySelector(".reset");
const resultBoard = document.querySelector(".console");
let turnDisplay = document.querySelector(".chance");
let turn = chance;

//render game buttons
function renderButtons() {
  for (let i = 0; i < 9; i++) {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    centre.appendChild(btn);
  }
}

function gameResult(winCondition, gameArr) {
  let result = "";
  for (const ele of winCondition) {
    if (
      gameArr[ele[0]] !== undefined &&
      gameArr[ele[0]] === gameArr[ele[1]] &&
      gameArr[ele[0]] === gameArr[ele[2]]
    ) {
      result = `${gameArr[ele[0]]} wins `;
      btnlist[ele[0]].classList.add("win");
      btnlist[ele[1]].classList.add("win");
      btnlist[ele[2]].classList.add("win");
      btnlist.forEach((btn) => (btn.disabled = true));
      break;
    }
  }
  return result;
}

function reset() {
  gameArr = [];
  resultBoard.textContent = "";
  chance = "X";
  turnDisplay.textContent = "";
  btns.forEach((btn) => {
    btn.textContent = "";
    btn.classList.remove("change");
    btn.classList.remove("win");
  });
}

renderButtons();
const btns = document.querySelectorAll(".btn");
let btnlist = [...btns];
console.log(btnlist);
resetBtn.onclick = reset;

//listener for button click
btns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    if (e.target.textContent === "") {
      e.target.textContent = chance;
      turn = chance === "X" ? "Y" : "X";
      turnDisplay.textContent = `${turn}'s turn`;
      e.target.classList.add("change");
      gameArr[index] = chance;
      let result = gameResult(winCondition, gameArr);
      if (result) resultBoard.textContent = result;
      if (
        gameArr.filter((element) => element === "X" || element === "Y")
          .length === 9 &&
        result === ""
      ) {
        resultBoard.textContent = "Its a draw";
      }
      chance = chance === "X" ? "Y" : "X";
    }
  });
});
