import Game from './game';

class GameView {
  constructor(game, ctx, ctx2) {
    this.game = game;
    this.ctx = ctx;
    this.ctx2 = ctx2;
    // this.board = this.game.board;
    // this.piece = game.piece;
    this.timeFrame = 1000;
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.interval = setInterval(this.update, 1000);
    this.paused = false;
    window.addEventListener('keydown', e => {
      e.preventDefault();

      if (!this.paused) {
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
          case 78:
            this.paused = false;
            document.getElementById('over-screen').style.opacity = 0;
            document.getElementById('pause-screen').style.opacity = 0;
            this.game = new Game();
            this.draw();
            clearInterval(this.interval);
            this.interval = setInterval(this.update, 1000);
            document.getElementById('theme-song').currentTime = 0;
            document.getElementById('theme-song').play();
            break;
        }
      }

      switch(e.keyCode) {
        case 13:
          if (this.paused) {
            this.interval = setInterval(this.update, 1000);
            this.paused = false;
            document.getElementById('pause-screen').style.opacity = 0;
            document.getElementById('theme-song').play();
          } else {
            clearInterval(this.interval);
            this.paused = true;
            document.getElementById('pause-screen').style.opacity = 1;
            document.getElementById('theme-song').pause();
          }
      }
    });

    document.getElementById('up').addEventListener('click', () => {
      this.game.fall(-1);
      this.draw();
      }
    );

    document.getElementById('down').addEventListener('click', () => {
      this.game.fall(1);
      this.draw();
      }
    );

    document.getElementById('left').addEventListener('click', () => {
      this.game.move(-1);
      this.draw();
      }
    );

    document.getElementById('right').addEventListener('click', () => {
      this.game.move(1);
      this.draw();
      }
    );

    document.getElementById('rotate').addEventListener('click', () => {
      this.game.rotate();
      this.draw();
      }
    );

    document.getElementById('rotate2').addEventListener('click', () => {
      this.game.rotate();
      this.draw();
      }
    );

    document.getElementById('start').addEventListener('click', () => {
      if (this.paused) {
        this.interval = setInterval(this.update, 1000);
        this.paused = false;
        document.getElementById('pause-screen').style.opacity = 0;
        document.getElementById('theme-song').play();
      } else {
        clearInterval(this.interval);
        this.paused = true;
        document.getElementById('pause-screen').style.opacity = 1;
        document.getElementById('theme-song').pause();
      }
    });

    document.getElementById('select').addEventListener('click', () => {
      this.paused = false;
      document.getElementById('over-screen').style.opacity = 0;
      document.getElementById('pause-screen').style.opacity = 0;
      this.game = new Game();
      this.draw();
      clearInterval(this.interval);
      this.interval = setInterval(this.update, 1000);
      document.getElementById('theme-song').currentTime = 0;
      document.getElementById('theme-song').play();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, 10, 18);
    this.ctx2.clearRect(0, 0, 5, 5);
    const colors = {
      'Z': 'rgb(204, 98, 102)',
      'J': 'rgb(102, 204, 204)',
      'L': 'rgb(216, 167, 16)',
      'S': 'rgb(100, 202, 102)',
      '|': 'rgb(102, 103, 197)',
      'O': 'rgb(199, 106, 196)',
      'T': 'rgb(254, 248, 76)'
    };

    this.game.board.matrix.forEach((row, idx) => {
      row.forEach((element, idx2) => {
        if (element === 0) {
          this.ctx.fillStyle = 'rgb(36, 36, 36)';
        } else {
          this.ctx.fillStyle = colors[element];
        }
        this.ctx.fillRect(idx2, idx, 1, 1);
      });
    });

    this.game.nextPiece.shape.forEach((row, idx) => {
      row.forEach((element, idx2) => {
        if (element !== 0) {
          this.ctx2.fillStyle = colors[element];
          this.ctx2.fillRect(idx2, idx, 1, 1);
        }
      });
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
    if (!this.game.gameOver) {
      this.draw();
      this.game.drop();
    } else {
      clearInterval(this.interval);
    }
  }

  // gameStart() {
  //   // setInterval for requestAnimationFrame every 1000ms or so
  //   const interval = setInterval(this.update, 1000);
  // }


}

export default GameView;
