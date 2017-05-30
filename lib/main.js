// import Game from './game';

document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById('tetris-board');
  board.width = 200;
  board.height = 380;
  const ctx = board.getContext('2d');
  ctx.fillStyle = 'rgb(44, 44, 42)';
  ctx.fillRect(0, 0, 200, 380);
  ctx.scale(20, 20);

  // const game = new Game();
});
