class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.createBoard(this.width, this.height);
  }

  createBoard(width, height) {
    const board = [];
    for (var i = 0; i < height.length; i++) {
      board.push(new Array(width).fill(0));
    }
    return board;
  }
}

export default Board;
