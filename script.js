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
      return false;
    }

    board[row][column] = tile;
    tileCount++;

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

  function updateBoardDisplay(id) {
    const tile = document.querySelector(`[data-id="${id}"]`);
    if (player === "X") {
      tile.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
    } else {
      tile.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480.276-96Q401-96 331-126q-70-30-122.5-82.5T126-330.958q-30-69.959-30-149.5Q96-560 126-629.5t82.5-122Q261-804 330.958-834q69.959-30 149.5-30Q560-864 629.5-834t122 82.5Q804-699 834-629.276q30 69.725 30 149Q864-401 834-331q-30 70-82.5 122.5T629.276-126q-69.725 30-149 30ZM480-168q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>';
    }
  }

  /*
   * Updates the game status by checking if a player has won based on the most
   * recent move or if the game ended in a tie. If no end condition is reached,
   * then switches to the next player.
   */
  function updateGameStatus(tile, row, col) {
    const winnerPresent = GameBoard.checkMatch(tile, row, col);
    if (winnerPresent && tile === 'X') {
      gameStatus = 1;
      return;
    } else if (winnerPresent) {
      gameStatus = 2;
      return;
    }

    if (GameBoard.getTileCount() === 9) {
      gameStatus = 3;
      return;
    }

    player = (player === 'X' ? 'O' : 'X');
  }

  function updateMessage() {
    const msg = document.querySelector(".message");
    switch (gameStatus) {
      case 0:
        msg.textContent = `${player}'S TURN. SELECT A CELL.`;
        break;
      case 1:
      case 2:
        msg.textContent = `${player}'S WON! PLAY AGAIN?`;
        break;
      case 3:
        msg.textContent = `TIE GAME. PLAY AGAIN?`;
        break;
    }
  }

  function playTurn() {
    const id = this.dataset.id;
    const row = Math.floor(id / 3);
    const col = id % 3;

    if (GameBoard.place(player, row, col)) {
      updateBoardDisplay(id);
      updateGameStatus(player, row, col);
      updateMessage();
    }

    this.removeEventListener('click', playTurn);
  }

  function start() {
    /* 
     * Attach event listeners to each of the tiles
     */
    const tiles = document.querySelectorAll(".board > div");
    tiles.forEach((tile) => tile.addEventListener("click", playTurn))
  }

  return { start }
})();

