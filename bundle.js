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
  }

  drop() {
    this.piece.pos.y += 1;
    // console.log(this.piece.pos.y);
    // if (this.piece.pos.y === 2) {
    //   this.piece = new Piece();
    // }
    if (this.willTouch()) {
      console.log('hit bounds');
      this.combine();
      this.piece = new __WEBPACK_IMPORTED_MODULE_1__piece__["a" /* default */]();
    }
  }

  // createNewPiece() {
  //   this.piece = new Piece();
  // }

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
    // if this.
  }

  fall(dir) {
    if (dir === 1) {
      this.piece.pos.y += 1;
    } else if (dir === -1) {
      this.piece.pos.y = 16;
      //need to figure out bottom
    }

    if (this.willTouch()) {
      console.log('hit bounds');
      this.combine();
      this.piece = new __WEBPACK_IMPORTED_MODULE_1__piece__["a" /* default */]();
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

    this.board.matrix.forEach((row, idx) => {
      row.forEach((spot, idx2) => {
        if (spot === 0) {
          this.ctx.fillStyle = 'rgb(44, 44, 42)';
          this.ctx.fillRect(idx2, idx, 1, 1);
        }
      });
      //will need to update with pieces' colors later (replace idx2 with spot)
    });

    // this.ctx.fillRect(0, 0, 10, 19);

    this.game.piece.shape.forEach((row, idx) => {
      row.forEach((element, idx2) => {
        // console.log(element);
        if (element !== 0) {
          this.ctx.fillStyle = 'rgb(255, 51, 0)';
          this.ctx.fillRect(idx2 + this.game.piece.pos.x, idx + this.game.piece.pos.y, 1, 1);
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
  gameview.gameStart();
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
    case 'I':
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
    case 'L':
      return [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
    case 'J':
      return [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ];
    case 'O':
      return [
        [4, 4],
        [4, 4],
      ];
    case 'Z':
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ];
    case 'S':
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    case 'T':
      return [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
      ];
    }
  }

  createPiece() {
    const shapes = 'ILJOZST';
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