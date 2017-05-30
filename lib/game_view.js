import Game from './game';

class GameView {
  constructor(ctx, game) {
    this.game = game;
    this.ctx = ctx;
    this.board = game.board;
    this.piece = game.piece;
    this.timeFrame = 1000;
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    window.addEventListener('keydown', e => {
      e.preventDefault();
      switch(e.keyCode) {
        case 37:
          this.piece.move(-1);
          this.draw();
          break;
        case 39:
          this.piece.move(1);
          this.draw();
          break;
        case 38:
          this.piece.fall(-1);
          this.draw();
          break;
        case 40:
          this.piece.fall(1);
          this.draw();
          break;
        case 32:
          this.piece.rotate();
          this.draw();
          break;
      }
    });
  }

  draw() {
    this.ctx.fillStyle = 'rgb(44, 44, 42)';
    this.ctx.fillRect(0, 0, 200, 380);

    this.piece.shape.forEach((row, idx) => {
      row.forEach((element, idx2) => {
        if (element !== 0) {
          this.ctx.fillStyle = 'rgb(255, 51, 0)';
          this.ctx.fillRect(idx2 + this.piece.pos.x, idx + this.piece.pos.y, 1, 1);
        }
      });
    });
  }

  update() {
    this.draw();
    this.game.drop();
  }

  gameStart() {
    // setInterval for requestAnimationFrame every 1000ms or so
    setInterval(this.update, 1000);
  }


}

export default GameView;
