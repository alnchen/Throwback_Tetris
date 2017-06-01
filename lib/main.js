import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById('tetris-board');
  board.width = 100;
  board.height = 180;
  const ctx = board.getContext('2d');
  ctx.scale(10, 10);

  const nextPiece = document.getElementById('next-piece');
  nextPiece.width = 50;
  nextPiece.height = 50;
  const ctx2 = nextPiece.getContext('2d');
  ctx2.scale(10,10);

  const game = new Game();
  const gameview = new GameView(game, ctx, ctx2);
  // gameview.gameStart();
});
