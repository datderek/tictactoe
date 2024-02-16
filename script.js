const GameBoard = (function() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  let tileCount = 0;

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
   * Returns the number of tiles on the board
   */
  function getTileCount() {
    return tileCount;
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
    tileCount++;
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);

    return true;
  }

  return { place, checkMatch, getTileCount };
})();

const Game = (function() {
  /* 
   * gameStatus = 0: Game is in progress
   *              1: Player 1 has won
   *              2: Player 2 has won
   *              3: Tie game
   */
  let gameStatus = 0;
  let player = 'X'

  /*
   * Updates the game status by checking if a player has won based on the most
   * recent move or if the game ended in a tie. If no end condition is reached,
   * then switches to the next player.
   */
  function updateGameStatus(tile, row, col) {
    const winnerPresent = GameBoard.checkMatch(tile, row, col);
    if (winnerPresent && tile === 'X') {
      gameStatus = 1;
      console.log("Player one won!");
      return;
    } else if (winnerPresent) {
      gameStatus = 2;
      console.log("Player two one!");
      return;
    }

    if (GameBoard.getTileCount() === 9) {
      gameStatus = 3;
      console.log("Tie game.");
      return;
    }

    player = (player === 'X' ? 'O' : 'X');
  }

  function playTurn(element) {
    const row = Math.floor(element.dataset.id / 3);
    const col = element.dataset.id % 3;

    if (GameBoard.place(player, row, col)) {
      updateGameStatus(player, row, col);
    } else {
      // Prompt player to select a different cell
    }
  }

  function start() {
    /* 
     * Attach event listeners to each of the tiles
     */
    const tiles = document.querySelectorAll(".board > div");
    tiles.forEach((tile) => {
      tile.addEventListener("click", () => {
        playTurn(tile);
      });
    });
  }

  return { start }
})();

