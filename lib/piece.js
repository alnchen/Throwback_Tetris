class Piece {
  constructor() {
    this.pos = {
      x: 4,
      y: 0
    };
    this.shape = null;
    this.createPiece();
  }

  // const COLORS = [tbd]

  pieceShape(type)
  {
    switch(type) {
    case 'I':
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
    case 'L':
      return [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
    case 'J':
      return [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ];
    case 'O':
      return [
        [4, 4],
        [4, 4],
      ];
    case 'Z':
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ];
    case 'S':
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    case 'T':
      return [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
      ];
    }
  }

  createPiece() {
    const shapes = 'ILJOZST';
    this.shape = this.pieceShape(shapes[Math.floor(Math.random() * 7)]);
  }

  move(dir) {
    this.pos.x += dir;
  }

  fall(dir) {
    if (dir === 1) {
      this.pos.y += 1;
    } else if (dir === -1) {
      this.pos.y = 16;
      //need to figure out bottom
    }
  }

  rotate() {
    //need suggestions on handling rotation
    //transpose?
    // console.log(this.shape);
    let rotated = [];
    for (let i = 0; i < this.shape[0].length; i++) {
      rotated.push([]);
    }

    for (let x = 0; x < this.shape.length; x++) {
      for (let y = 0; y < this.shape[x].length; y++) {
        rotated[y].unshift(this.shape[x][y]);
      }
    }

    this.shape = rotated;
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
