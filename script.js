const GameBoard = (function() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  function winByRow(tile, row) {
    for (let i = 0; i < 3; i++) {
      if (board[row][i] !== tile) {
        return false;
      }
    }

    return true;
  }

  function winByColumn(tile, col) {
    for (let i = 0; i < 3; i++) {
      if (board[i][col] !== tile) {
        return false;
      }
    }

    return true;
  }

  function winByDiagonal(tile, row, col) {
    /*
     * Check backslash diagonal
     */
    let backslashWin = true;
    for (let i = 0; i < 3; i++) {
      if (board[i][i] !== tile) {
        backslashWin = false;
        break;
      }
    }

    if (backslashWin) {
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
   * Checks if the tile placed at board[row][column] will result in a win via
   * a DFS in each direction
   */
  function checkWin(tile, row, col) {
    return (winByRow(tile, row)
            || winByColumn(tile, col) 
            || winByDiagonal(tile, row, col));
  }

  /*
   * Places a tile at the provided cell if the cell is free, otherwise prompts
   * the user to choose a different spot.
   */
  function place(tile, row, column) {
    if (board[row][column] !== null) {
      console.log(`There is already an '${board[row][column]}' at ${row}, ${column}`);
      console.log("Please choose another spot!");
      return;
    }

    board[row][column] = tile;
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
    checkWin(tile, row, column);
  }

  return { place };
})();

