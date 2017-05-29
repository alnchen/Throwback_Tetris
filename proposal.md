# Throwback Tetris

### Background
Throwback Tetris is a single player game inspired by the classic Tetris built entirely using Javascript. The game involves objects of different shapes falling towards the bottom of the board. The objective of the game is to score points by clearing filled rows but when a player fills his board up with pieces that have not been cleared, the game is over.  

### Functionality & MVP
- [ ] Start and pause a game
- [ ] Random pieces are dropped
- [ ] Control position and orientation of falling pieces
- [ ] Filled row gets cleared and increments player's score
- [ ] Game keeps track of score and resets when a new game begins

In addition, this project will include:
- [ ] Choose one of several "gameboy" themes to play on
- [ ] Sidebar with key mappings and controls
- [ ] A production Readme

### Wireframes
Players will be able to choose from one of three themes for gameplay. These include the original Gameboy (1989), Gameboy Color (1998), and Gameboy Advance (2001).

![Wireframe](/tetris_wireframe.png)

### Architecture & Technologies
Initechtris will feature the following technologies:
* Vanilla JavaScript for overall gameplay
* HTML5 Canvas and JQuery for visual rendering and DOM manipulation

-exact scripts TBD-


### Implementation Timeline
##### Day 1: Webpack and Board setup
**Objective**: Create a webpack file and also establish the foundation of the game including the board and pieces. Pieces will "fall" on screen

##### Day 2: Overall gameflow
**Objective**: Player is able to control direction and orientation of pieces. Pieces know logic including clearing of rows

##### Day 3: Final pieces of gameplay
**Objective**: Game has a start screen, can be paused, and scoring is implemented

##### Day 4: Accurate styling of Gameboy
**Objective**: Provide users a retro "feel" to the original gameboy from the 90s

### Bonus Features:
If time permits, I'd like to implement the following features
- [ ] Bonus: Levels. Pieces fall at increasing speeds as players level up
- [ ] Bonus: Players will be able to choose from one of three themes for gameplay. These include the original Gameboy (1989), Gameboy Color (1998), and Gameboy Advance (2001).
