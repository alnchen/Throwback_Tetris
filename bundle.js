/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece__ = __webpack_require__(4);



class Game {
  constructor() {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](10, 19);
    this.score = 0;
    this.piece = new __WEBPACK_IMPORTED_MODULE_1__piece__["a" /* default */]();
    // console.log(this.piece.createPiece());
    // this.createPiece();
    this.willTouch = this.willTouch.bind(this);
    // this.createNewPiece = this.createNewPiece.bind(this)
    this.combine = this.combine.bind(this);
    this.createNewPiece = this.createNewPiece.bind(this);
    this.gameOver = false;
  }

  drop() {
    this.piece.pos.y += 1;
    // console.log(this.piece.pos.y);
    // if (this.piece.pos.y === 2) {
    //   this.piece = new Piece();
    // }
    if (this.willTouch()) {
      this.combine();
      this.createNewPiece();
    }
  }

  createNewPiece() {
    if (this.piece.pos.y <= 1) {
      this.gameOver = true;
    } else {
    this.piece = new __WEBPACK_IMPORTED_MODULE_1__piece__["a" /* default */]();
    }
  }

  combine() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((element, x) => {
        if (element !== 0) {
          this.board.matrix[y + this.piece.pos.y - 1][x + this.piece.pos.x] = element;
        }
      });
    });
  }

  move(dir) {
    this.piece.pos.x += dir;
    if (this.willTouch()){
      this.piece.pos.x -= dir;
    }
  }

  fall(dir) {
    if (dir === 1) {
      this.piece.pos.y += 1;
    } else if (dir === -1) {
      this.piece.pos.y = 16;
      //need to figure out bottom
    }

    if (this.willTouch()) {
      this.combine();
      this.createNewPiece();
    }

  }

  rotate() {
    //need suggestions on handling rotation
    //transpose?
    // console.log(this.shape);
    let rotated = [];
    for (let i = 0; i < this.piece.shape[0].length; i++) {
      rotated.push([]);
    }

    for (let x = 0; x < this.piece.shape.length; x++) {
      for (let y = 0; y < this.piece.shape[x].length; y++) {
        rotated[y].unshift(this.piece.shape[x][y]);
      }
    }

    this.piece.shape = rotated;

    if (this.willTouch()) {
      this.combine();
      this.createNewPiece();
    }
  }

  willTouch() {
    const shape = this.piece.shape;
    const space = this.piece.pos;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0 && (this.board.matrix[y + space.y] && this.board.matrix[y + space.y][x + space.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);


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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.matrix = this.createBoard(this.width, this.height);
  }

  createBoard(width, height) {
    const board = [];
    for (var i = 0; i < height; i++) {
      board.push(new Array(width).fill(0));
    }
    return board;
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(1);



document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById('tetris-board');
  board.width = 200;
  board.height = 380;
  const ctx = board.getContext('2d');
  ctx.scale(20, 20);

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  const gameview = new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](ctx, game);
  // gameview.gameStart();
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);


class Piece {
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };
    this.shape = null;
    this.createPiece();
  }

  // const COLORS = [tbd]

  pieceShape(type)
  {
    switch(type) {
    case '|':
      return [
        [0, '|', 0, 0],
        [0, '|', 0, 0],
        [0, '|', 0, 0],
        [0, '|', 0, 0],
      ];
    case 'L':
      return [
        [0, 'L', 0],
        [0, 'L', 0],
        [0, 'L', 'L'],
      ];
    case 'J':
      return [
        [0, 'J', 0],
        [0, 'J', 0],
        ['J', 'J', 0],
      ];
    case 'O':
      return [
        ['O', 'O'],
        ['O', 'O'],
      ];
    case 'Z':
      return [
        ['Z', 'Z', 0],
        [0, 'Z', 'Z'],
        [0, 0, 0],
      ];
    case 'S':
      return [
        [0, 'S', 'S'],
        ['S', 'S', 0],
        [0, 0, 0],
      ];
    case 'T':
      return [
        [0, 'T', 0],
        ['T', 'T', 'T'],
        [0, 0, 0],
      ];
    }
  }

  createPiece() {
    const shapes = '|LJOZST';
    this.shape = this.pieceShape(shapes[Math.floor(Math.random() * 7)]);
    this.pos.x = Math.floor(5 - this.shape[0].length/2);
    // console.log(this.game);
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Piece);

// Array.prototype.myTranspose = function () {
//   let output = [];
//
//   for (let i = 0; i < this[0].length; i++){
//     output.push([]);
//   }
//
//   for (let i = 0; i < this.length; i++){
//     for (let j = 0; j < this[i].length; j++){
//       output[i].push(this[j][i]);
//     }
//   }
//   return output;
// };


/***/ })
/******/ ]);