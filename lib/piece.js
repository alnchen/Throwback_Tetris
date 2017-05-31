import Game from './game';

class Piece {
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };
    this.shape = null;
    this.createPiece();
  }

  // const COLORS = [tbd]

  pieceShape(type)
  {
    switch(type) {
    case '|':
      return [
        [0, '|', 0, 0],
        [0, '|', 0, 0],
        [0, '|', 0, 0],
        [0, '|', 0, 0],
      ];
    case 'L':
      return [
        [0, 'L', 0],
        [0, 'L', 0],
        [0, 'L', 'L'],
      ];
    case 'J':
      return [
        [0, 'J', 0],
        [0, 'J', 0],
        ['J', 'J', 0],
      ];
    case 'O':
      return [
        ['O', 'O'],
        ['O', 'O'],
      ];
    case 'Z':
      return [
        ['Z', 'Z', 0],
        [0, 'Z', 'Z'],
        [0, 0, 0],
      ];
    case 'S':
      return [
        [0, 'S', 'S'],
        ['S', 'S', 0],
        [0, 0, 0],
      ];
    case 'T':
      return [
        [0, 'T', 0],
        ['T', 'T', 'T'],
        [0, 0, 0],
      ];
    }
  }

  createPiece() {
    const shapes = '|LJOZST';
    this.shape = this.pieceShape(shapes[Math.floor(Math.random() * 7)]);
    this.pos.x = Math.floor(5 - this.shape[0].length/2);
    // console.log(this.game);
  }


}

export default Piece;

// Array.prototype.myTranspose = function () {
//   let output = [];
//
//   for (let i = 0; i < this[0].length; i++){
//     output.push([]);
//   }
//
//   for (let i = 0; i < this.length; i++){
//     for (let j = 0; j < this[i].length; j++){
//       output[i].push(this[j][i]);
//     }
//   }
//   return output;
// };
