const GameBoard = (function() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

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
    tilesPlaced++;
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  }

  return { place };
})();
