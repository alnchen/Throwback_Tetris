import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById('tetris-board');
  board.width = 200;
  board.height = 380;
  const ctx = board.getContext('2d');
  ctx.scale(20, 20);

  const game = new Game();
  const gameview = new GameView(ctx, game);
  gameview.gameStart();
});
