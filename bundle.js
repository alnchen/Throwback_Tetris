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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece__ = __webpack_require__(3);



class Game {
  constructor() {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](10, 19);
    this.score = 0;
    this.piece = new __WEBPACK_IMPORTED_MODULE_1__piece__["a" /* default */]();
    // console.log(this.piece.createPiece());
  }

  drop() {
    this.piece.pos.y += 1;
    // console.log(this.piece.pos.y);
  }



}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.createBoard(this.width, this.height);
  }

  createBoard(width, height) {
    const board = [];
    for (var i = 0; i < height.length; i++) {
      board.push(new Array(width).fill(0));
    }
    return board;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(4);



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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Piece {
  constructor() {
    this.pos = {
      x: 4,
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
  }

  move(dir) {
    this.pos.x += dir;
  }


  rotate() {
    //need suggestions on handling rotation
    //transpose?
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Piece);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);


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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);