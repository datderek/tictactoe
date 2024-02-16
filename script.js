const GameBoard = (function() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  let tilesPlaced = 0;

  function checkRowMatch(tile, row) {
    for (let i = 0; i < 3; i++) {
      if (board[row][i] !== tile) {
        return false;
      }
    }

    return true;
  }

  function checkColumnMatch(tile, col) {
    for (let i = 0; i < 3; i++) {
      if (board[i][col] !== tile) {
        return false;
      }
    }

    return true;
  }

  function checkDiagonalMatch(tile) {
    /*
     * Check backslash diagonal
     */
    let backslashMatch = true;
    for (let i = 0; i < 3; i++) {
      if (board[i][i] !== tile) {
        backslashMatch = false;
        break;
      }
    }

    if (backslashMatch) {
      return true;
    }

    /*
     * Check forward slash diagonal
     */
    for (let i = 0; i < 3; i++) {
      if (board[2 - i][i] !== tile) {
        return false;
      }
    }

    return true;
  }

  /*
   * Checks if the tile placed at board[row][column] will result in a consecutive
   * match along the row, column, or diagonal
   */
  function checkMatch(tile, row, col) {
    return (checkRowMatch(tile, row)
            || checkColumnMatch(tile, col) 
            || checkDiagonalMatch(tile));
  }

  /*
   * Places a tile at the provided cell if the cell is free, returns true on 
   * successful placement otherwise returns false.
   */
  function place(tile, row, column) {
    if (board[row][column] !== null) {
      console.log(`There is already an '${board[row][column]}' at ${row}, ${column}`);
      console.log("Please choose another spot!");
      return false;
    }

    board[row][column] = tile;
    tilesPlaced++;
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);

    return true;
  }

  return { place, checkMatch };
})();

const Game = (function() {
  /* 
   * gameStatus = 0: Game is in progress
   *              1: Player 1 has won
   *              2: Player 2 has won
   *              3: Tie game
   */
  let gameStatus = 0;

  /*
   * Updates the game status by checking if a player has won based on the most
   * recent move or if the game ended in a tie
   */
  function updateGameStatus(tile, row, col) {
    const winnerPresent = GameBoard.checkMatch(tile, row, col);
    if (winnerPresent && tile === 'x') {
      gameStatus = 1;
      console.log("Player one won!");
    } else if (winnerPresent) {
      gameStatus = 2;
      console.log("Player two one!");
    }
  }

  function start() {
    while (gameStatus === 0) {
      let playerOneRow, playerOneCol;
      let playerTwoRow, playerTwoCol;

      do {
        playerOneRow = prompt("X's turn. Please select a row.");
        playerOneCol = prompt("X's turn. Please select a column.");
      } while (!GameBoard.place('x', playerOneRow, playerOneCol));

      updateGameStatus('x', playerOneRow, playerOneCol);

      do {
        playerTwoRow = prompt("O's turn. Please select a row.");
        playerTwoCol = prompt("O's turn. Please select a column.");
      } while (!GameBoard.place('o', playerTwoRow, playerTwoCol));

      updateGameStatus('o', playerTwoRow, playerTwoCol);
    }
  }

  return { start }
})();
