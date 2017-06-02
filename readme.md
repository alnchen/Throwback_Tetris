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

### Mouse-Based Controls

The player controls all movement of the paddle via mouse controls. Upon triggering a mouse event, the clientX property (read-only), will return the horizontal coordinate of the pointer.

After subtracting any offset pixels, if the resulting value is positive and within the horizontal plane, the paddle's position will be adjusted.

```javascript
handleMouseMove (e) {
  let distance = e.clientX - this.canvas.offsetLeft;

  if (0 < distance && this.canvas.width > distance) {
    this.paddle.x = distance - (0.5 * this.paddle.width);
  }
}
```

### Collision Detection

During gameplay, the ball collides with several other objects of the game:

- Paddle
- Brick
- Wall

With wall collisions, the angle of incidence (i.e., the collision) will equal the angle of reflection (i.e., the bounce).

For instance, we can look at the vertical component of the ball's trajectory. If the size of the ball is greater than its total change in vertical position, the ball reflects off the wall with an equal but opposite change in position.

```javascript
handleWallCollision () {
  let totalX = this.x + this.dx;
  let totalY = this.y + this.dy;

  if (totalX < this.radius || totalX > this.canvas.width - this.radius) {
    this.dx *= -1;
  } else if (totalY < this.radius) {
    this.dy *= -1;
  }
}
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
