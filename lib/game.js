import Board from './board';
import Piece from './piece';

class Game {
  constructor() {
    this.board = new Board(10, 19);
    this.score = 0;
    this.piece = new Piece();
    // console.log(this.piece.createPiece());
    // this.createPiece();
    this.willTouch = this.willTouch.bind(this);
    // this.createNewPiece = this.createNewPiece.bind(this)
    this.combine = this.combine.bind(this);
    this.createNewPiece = this.createNewPiece.bind(this);
    this.gameOver = false;
    this.clearFilledRows = this.clearFilledRows.bind(this);
  }

  drop() {
    this.piece.pos.y += 1;
    // console.log(this.piece.pos.y);
    // if (this.piece.pos.y === 2) {
    //   this.piece = new Piece();
    // }
    if (this.willTouch()) {
      this.combine();
      this.clearFilledRows();
      this.createNewPiece();
    }
  }

  createNewPiece() {
    if (this.piece.pos.y <= 1) {
      this.gameOver = true;
    } else {
    this.piece = new Piece();
    }
  }

  combine() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((element, x) => {
        if (element !== 0) {
          this.board.matrix[y + this.piece.pos.y - 1][x + this.piece.pos.x] = element;
        }
      });
    });
  }

  clearFilledRows() {
    let cleared = 1;
    this.board.matrix.forEach((row, idx) => {
      if (row.filter((el) => el === 0).length === 0) {
        cleared += 2;
        this.board.matrix.splice(idx, 1);
        this.board.matrix.unshift(new Array(10).fill(0));
      }
    });
    this.score += (cleared * 1000);
    console.log(this.score);
  }

  move(dir) {
    this.piece.pos.x += dir;
    if (this.willTouch()){
      this.piece.pos.x -= dir;
    }
  }

  fall(dir) {
    if (dir === 1) {
      this.piece.pos.y += 1;
    } else if (dir === -1) {

      while (!this.willTouch()) {
        this.piece.pos.y += 1;
      }

      // this.piece.pos.y = 16;
    }

    if (this.willTouch()) {
      this.combine();
      this.clearFilledRows();
      this.createNewPiece();
    }

  }

  rotate() {
    //need suggestions on handling rotation
    //transpose?
    // console.log(this.shape);
    let rotated = [];
    for (let i = 0; i < this.piece.shape[0].length; i++) {
      rotated.push([]);
    }

    for (let x = 0; x < this.piece.shape.length; x++) {
      for (let y = 0; y < this.piece.shape[x].length; y++) {
        rotated[y].unshift(this.piece.shape[x][y]);
      }
    }

    this.piece.shape = rotated;

    if (this.willTouch()) {
      this.combine();
      this.clearFilledRows();
      this.createNewPiece();
    }
  }

  willTouch() {
    const shape = this.piece.shape;
    const space = this.piece.pos;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0 && (this.board.matrix[y + space.y] && this.board.matrix[y + space.y][x + space.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }
}

export default Game;
