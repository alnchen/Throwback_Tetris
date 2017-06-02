# Throwback Tetris

![screenshot](http://res.cloudinary.com/ac31624/image/upload/v1496421275/Screen_Shot_2017-06-02_at_9.33.16_AM_tm5nja.png)

[Live link](https://alnchen.github.io/tetris/)

Throwback Tetris is a puzzle game based on the classic Tetris game found on the Nintendo Gameboy. Players gradually fill up their board with randomly generated pieces and a row is cleared when it is entirely occupied by pieces. Bonus points are given for clearing multiple rows at the same time. The game is over when a player is unable to fill up any more pieces on the board.

The game utilizes the following:

- CSS3 for visual styling
- HTML5 Canvas for board and piece rendering
- JavaScript for gameplay and overall functionality


# Gameplay and Features

One of seven different tetrominoes is randomly placed on the screen and will gradually drop towards the bottom of the board. The objective of the game is to manipulate pieces to fit best within a row. Players are then able to rack up points as rows are filled and cleared out.

Current features of the game include:

- [X] Keyboard control of falling piece including rotational shift
- [X] Gameboy button controls for mobile gameplay
- [X] Game scoring reflects bonus points when extra rows are cleared
- [X] Instructions and landing page are straight-forward and visually aesthetic

### Tetromino Controls

The player is able to control the currently designated piece within the game by using either on-screen buttons or with the keyboard arrow keys. This is accomplished through click and keydown event listeners, respectively. A piece is moved around the board by modifying it's stored x and y position. A setTimeout function is also initiated from the start of the game and calls for the update method at an interval based on the player's current game status. The update method invokes the drop method of the game class which increments the y axis of the game's current piece by one, essentially creating a 'dropping piece' effect. If the player has lost, the setTimeout callback will be removed to conclude the game.

```javascript
update() {
  if (!this.game.gameOver) {
    this.game.drop();
    this.draw();
  } else {
    clearInterval(this.interval);
  }
}
```

### Board and Piece Canvas Rendering

![screenshot](http://res.cloudinary.com/ac31624/image/upload/v1496424230/Screen_Shot_2017-06-02_at_10.23.15_AM_o1jogb.png)

The board, current piece, and next piece are visualized on-screen using HTML5 Canvas. Each time the GameView#draw method is called, the current game board is iterated across and checked to determine if there is currently a piece occupying that spot. If this is the case, that particular spot is colorized using the unique color representation assigned to each unique piece.

```javascript
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
```

### Handling Broken Bricks

The game class manages much of the outcome when the ball collides with a brick. In checking for collisions, the game iterates through the bricks and checks for any currently unbroken. With the helper method #breakBrick, if a brick collision has indeed occurred:

1. The state of the brick is updated
2. The score increases by one
3. The ball continues its movement, albeit with an opposite vertical component

Once the score reaches a certain amount, the game is over.

```javascript
detectCollisions () {
  for (let idx = 0; idx < this.bricks.length; idx++) {
    for (let idx2 = 0; idx2 < this.bricks[idx].length; idx2++) {
      let brick = this.bricks[idx][idx2];
      if (brick.state === "unbroken") {
        this.breakBrick(brick);
      }
    }
  }
}

breakBrick (brick) {
  if (this.ball.checkBrickCollision(brick)) {
    brick.state = "broken";
    this.bricksHit += 1;
    this.ball.dy *= -1;
    if (this.bricksHit === 40) {
      this.result = "YOU WIN!";
      this.gameEnded = true;
    }
  }
}
```

### Future Release
* [ ] Pause and Resume
* [ ] Keyboard Controls
sound
gba themes
