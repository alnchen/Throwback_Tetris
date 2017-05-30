class Piece {
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };
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
    const piece = this.pieceShape(shapes[Math.floor(Math.random() * 7)]);

  }

  move(dir) {
    this.piece.pos.x += dir;
  }


  rotate() {
    //need suggestions on handling rotation
  }

}

export default Piece;
