import Board from './board';
import Piece from './piece';

class Game {
  constructor() {
    this.board = new Board(10, 18);
    this.score = 0;
    this.piece = new Piece();
    this.nextPiece = new Piece();
    this.clearedLines = 0;
    this.willTouch = this.willTouch.bind(this);
    this.combine = this.combine.bind(this);
    this.createNewPiece = this.createNewPiece.bind(this);
    this.gameOver = false;
    this.clearFilledRows = this.clearFilledRows.bind(this);
    this.scoreboard = document.getElementById('scoreboard');
    this.scoreboard.innerHTML = `<div>score:&#10 0</div>`;
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
      document.getElementById('over-screen').innerHTML = `<div>Game Over! Score: ${this.score}</div>`;
      document.getElementById('over-screen').style.opacity = 1;
      document.getElementById('theme-song').pause();
      document.getElementById("game-over").volume = 0.6;
      document.getElementById('game-over').play();
    } else {
    this.piece = this.nextPiece;
    this.nextPiece = new Piece();
    }
  }

  combine() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((element, x) => {
        if (element !== 0) {
          this.clearedLines += 1;
          this.board.matrix[y + this.piece.pos.y - 1][x + this.piece.pos.x] = element;
        }
      });
    });
  }


  clearFilledRows() {
    let cleared = 0;
    this.board.matrix.forEach((row, idx) => {
      if (row.filter((el) => el === 0).length === 0) {
        cleared += 1;
        this.board.matrix.splice(idx, 1);
        this.board.matrix.unshift(new Array(10).fill(0));
      }
    });

    switch(cleared){
      case 1:
        this.score += 40;
        break;
      case 2:
        this.score += 100;
        break;
      case 3:
        this.score += 300;
        break;
      case 4:
        this.score += 1200;
        break;
    }

    this.scoreboard.innerHTML = `<div>score:&#10 ${this.score}</div>`;
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


  outofLeftBounds() {
    // if (this.piece.pos = 0) {
    //
    // }
  }

  outofRightBounds() {

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
