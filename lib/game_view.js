import Game from './game';

class GameView {
  constructor(ctx, game) {
    this.game = game;
    this.ctx = ctx;
    this.board = game.board;
    // this.piece = game.piece;
    this.timeFrame = 1000;
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.interval = setInterval(this.update, 1000);

    window.addEventListener('keydown', e => {
      e.preventDefault();
      switch(e.keyCode) {
        case 37:
          this.game.move(-1);
          this.draw();
          break;
        case 39:
          this.game.move(1);
          this.draw();
          break;
        case 38:
          this.game.fall(-1);
          this.draw();
          break;
        case 40:
          this.game.fall(1);
          this.draw();
          break;
        case 32:
          this.game.rotate();
          this.draw();
          break;
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, 10, 19);

    const colors = {
      'Z': 'rgb(204, 98, 102)',
      'J': 'rgb(102, 204, 204)',
      'L': 'rgb(216, 167, 16)',
      'S': 'rgb(100, 202, 102)',
      '|': 'rgb(102, 103, 197)',
      'O': 'rgb(199, 106, 196)',
      'T': 'rgb(254, 248, 76)'
    };

    this.board.matrix.forEach((row, idx) => {
      row.forEach((element, idx2) => {
        if (element === 0) {
          this.ctx.fillStyle = 'rgb(44, 44, 42)';
          this.ctx.fillRect(idx2, idx, 1, 1);
        } else {
          this.ctx.fillStyle = colors[element];
          this.ctx.fillRect(idx2, idx, 1, 1);
        }
      });
      //will need to update with pieces' colors later (replace idx2 with spot)
    });

    this.game.piece.shape.forEach((row, idx) => {
      row.forEach((element, idx2) => {
        // console.log(element);
        if (element !== 0) {
          this.ctx.fillStyle = colors[element];
          this.ctx.fillRect(idx2 + this.game.piece.pos.x, idx + this.game.piece.pos.y, 1, 1);
        }
      });
    });
  }

  update() {
    // this.draw();

    if (!this.game.gameOver) {
      this.draw();
      this.game.drop();
    } else {
      clearInterval(this.interval);
      console.log('game over');
    }
  }

  // gameStart() {
  //   // setInterval for requestAnimationFrame every 1000ms or so
  //   const interval = setInterval(this.update, 1000);
  // }


}

export default GameView;
