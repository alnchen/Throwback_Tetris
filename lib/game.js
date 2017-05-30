import Board from './board';
import Piece from './piece';

class Game {
  constructor() {
    this.board = new Board(10, 19);
    this.score = 0;
    this.piece = new Piece();
    // console.log(this.piece.createPiece());
  }

  drop() {
    this.piece.pos.y += 1;
    // console.log(this.piece.pos.y);
    // if (this.piece.pos.y === 2) {
    //   this.piece = new Piece();
    // }
  }



}

export default Game;
