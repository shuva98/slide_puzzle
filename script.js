document.addEventListener("DOMContentLoaded", () => {
  let game = document.querySelector(".game");
  let btn = document.querySelector(".btns");
  let board;
  let initializeGame = () => {
    game.innerHTML = "";
    // Creating an array of numbers
    const numbers = [];
    // Alternate way of doing it
    // const numbers = [...Array(15).keys()].map(n => n + 1).concat(null);
    for (let i = 0; i < 15; i++) {
      numbers[i] = numbers.push(i);
    }
    numbers.push(null);
    // Creating lists and buttons for each numbers
    shuffleArray(numbers);
    numbers.forEach((number) => {
      // Creating lists
      let li = document.createElement("li");
      // Creating numbered buttons and empty one separately
      if (number !== null) {
        let button = document.createElement("button");
        button.innerHTML = number;
        button.addEventListener("click", () => moveBlocks(button));
        li.appendChild(button);
      } else {
        li.classList.add("empty");
      }
      game.appendChild(li);
    });
    board = Array.from(game.children);
  };

  // Logic for moving the tiles
  let moveBlocks = (button) => {
    let buttonIdx = board.findIndex((board) => board.contains(button));
    let emptyIdx = board.findIndex((board) =>
      board.classList.contains("empty")
    );

    const validMoves = [emptyIdx - 1, emptyIdx + 1, emptyIdx + 4, emptyIdx - 4];
    // To make sure the valid moves dont include the one above or below the row
    let isSameRow = Math.floor(buttonIdx / 4) === Math.floor(emptyIdx / 4);
    if (
      validMoves.includes(buttonIdx) &&
      (isSameRow || buttonIdx === emptyIdx + 4 || buttonIdx === emptyIdx - 4)
    ) {
      board[emptyIdx].classList.remove("empty");
      board[emptyIdx].appendChild(button);
      board[buttonIdx].classList.add("empty");
      checkWinCondition();
    }
  };

  let checkWinCondition = () => {
    let currentOrder = board.map((tile) => {
      if (tile.classList.contains("empty")) {
        return null;
      } else {
        return parseInt(tile.textContent, 10);
      }
    });
    let targetOrder = [...Array(15).keys()].map((n) => n + 1).concat(null);
    // Using JSON.stingify to convert it to strings for easier equality comparisons and arrays cannot be compared directly for equality
    if (JSON.stringify(currentOrder) === JSON.stringify(targetOrder)) {
      setTimeout(alert("Congratulations! You have solved the puzzle"), 200);
    }
  };

  let shuffleArray = (array) => {
    // Fischer Yates shuffling method
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  btn.addEventListener("click", initializeGame);
  initializeGame();
});
