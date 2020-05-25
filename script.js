let board = [];

/**
 * The code can probably be refactored to just use the html board, instead of having a board
 * that javascript reads and then outputs to the html
 */

const gameBoard = (() => {
  const setUpBoard = () => {
    board.length = 9;
    for (let i = 0; i < board.length; i++) {
      board[i] = undefined;
    }
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.innerText = "";
      cell.addEventListener("click", Game.placePiece);
    });
  };

  return { setUpBoard };
})();

const Game = (() => {
  let playerWins = document.querySelector("#playerScore");
  let computerWins = document.querySelector("#computerScore");
  let ties = document.querySelector("#ties");

  const start = () => {
    playerWins.innerHTML = 0;
    computerWins.innerHTML = 0;
    ties.innerHTML = 0;
    board = [];
    gameBoard.setUpBoard();
  };

  const placePiece = (event) => {
    if (board[event.target.id] === undefined) {
      event.target.innerText = "X";
      board[event.target.id] = "X";
      if (!checkForWinner()) {
        Ai.makeMove();
      }
    }
  };

  const checkForWinner = () => {
    // Check horizontal rows
    for (let i = 0; i < 8; i += 3) {
      if (board[i] !== undefined) {
        if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
          declareWinner(board[i]);
          return true;
        }
      }
    }

    // Check vertical rows
    for (let i = 0; i < 3; i++) {
      if (board[i] !== undefined) {
        if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
          declareWinner(board[i]);
          return true;
        }
      }
    }

    // Check diagonals
    if (board[0] !== undefined) {
      if (board[0] === board[4] && board[0] === board[8]) {
        declareWinner(board[0]);
        return true;
      }
    }

    if (board[2] !== undefined) {
      if (board[2] === board[4] && board[2] === board[6]) {
        declareWinner(board[2]);
        return true;
      }
    }

    checkIfTie();
    return false;
  };

  const checkIfTie = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === undefined) {
        return false;
      }
    }

    let number = parseInt(ties.innerHTML);
    number++;

    ties.innerHTML = number;
    gameBoard.setUpBoard();
    return true;
  };

  const declareWinner = (piece) => {
    if (piece === "X") {
      let number = parseInt(playerWins.innerHTML);
      number++;
      playerWins.innerHTML = number;
    } else {
      let number = parseInt(computerWins.innerHTML);
      number++;
      computerWins.innerHTML = number;
    }

    gameBoard.setUpBoard();
  };

  return { start, placePiece, checkForWinner };
})();

const Ai = (() => {
  const makeMove = () => {
    let validMove = false;

    while (validMove === false) {
      let choice = Math.floor(Math.random() * 8);
      if (board[choice] === undefined) {
        validMove = true;
        const cell = document.getElementById(choice);
        cell.innerText = "O";
        board[choice] = "O";
      }
    }
    Game.checkForWinner();
  };

  return { makeMove };
})();

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", Game.start);

Game.start();
