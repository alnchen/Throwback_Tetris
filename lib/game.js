import Board from './board';
import Piece from './piece';

class Game {
  constructor() {
    this.board = new Board(10, 19);
    this.score = 0;
    this.piece = new Piece();
  }
}

export default Game;
