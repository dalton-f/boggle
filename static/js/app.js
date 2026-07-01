/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@datastructures-js/trie/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@datastructures-js/trie/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const { Trie } = __webpack_require__(/*! ./src/trie */ "./node_modules/@datastructures-js/trie/src/trie.js");
const { TrieNode } = __webpack_require__(/*! ./src/trieNode */ "./node_modules/@datastructures-js/trie/src/trieNode.js");

exports.TrieNode = TrieNode
exports.Trie = Trie;


/***/ }),

/***/ "./node_modules/@datastructures-js/trie/src/trie.js":
/*!**********************************************************!*\
  !*** ./node_modules/@datastructures-js/trie/src/trie.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * datastructures-js/trie
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { TrieNode } = __webpack_require__(/*! ./trieNode */ "./node_modules/@datastructures-js/trie/src/trieNode.js");

/**
 * @class Trie
 */
class Trie {
  constructor() {
    this._root = new TrieNode('');
    this._wordsCount = 0;
    this._nodesCount = 1; // root node
  }

  /**
   * Inserts a word into the trie
   * @public
   * @param {any} value
   * @returns {Trie}
   */
  insert(value) {
    if (value === undefined || value === null) {
      return this;
    }

    const word = value.toString();
    let currentNode = this._root;
    for (let i = 0; i < word.length; i += 1) {
      if (!currentNode.hasChild(word[i])) {
        currentNode.addChild(word[i]);
        this._nodesCount += 1;
      }
      currentNode = currentNode.getChild(word[i]);
    }

    if (!currentNode.isEndOfWord()) {
      currentNode.setEndOfWord(true);
      this._wordsCount += 1;
    }

    return this;
  }

  /**
   * Checks if a word exists in the trie
   * @public
   * @param {any} value
   * @returns {boolean}
   */
  has(value) {
    if (value === undefined || value === null) {
      return false;
    }

    const word = value.toString();
    let currentNode = this._root;
    for (let i = 0; i < word.length; i += 1) {
      if (!currentNode.hasChild(word[i])) {
        return false;
      }
      currentNode = currentNode.getChild(word[i]);
    }

    if (!currentNode.isEndOfWord()) {
      return false;
    }

    return true;
  }

  /**
   * Finds a word in the trie and returns its last char node
   * @public
   * @param {any} value
   * @returns {TrieNode}
   */
  find(value) {
    if (value === undefined || value === null) {
      return null;
    }

    const word = value.toString();
    let currentNode = this._root;

    for (let i = 0; i < word.length; i += 1) {
      if (!currentNode.hasChild(word[i])) {
        return null;
      }
      currentNode = currentNode.getChild(word[i]);
    }

    if (!currentNode.isEndOfWord()) {
      return null;
    }

    return currentNode;
  }

  /**
   * Removes a word from the trie
   * @public
   * @param {string} word
   * @returns {string | null}
   */
  remove(value) {
    if (value === undefined || value === null) {
      return null;
    }

    const word = value.toString();
    let currentNode = this._root;

    for (let i = 0; i < word.length; i += 1) {
      if (!currentNode.hasChild(word[i])) {
        return null;
      }
      currentNode = currentNode.getChild(word[i]);
    }

    if (!currentNode.isEndOfWord()) {
      return null;
    }

    if (currentNode.childrenCount() > 0 || word === '') {
      currentNode.setEndOfWord(false);
      this._wordsCount -= 1;
      return word;
    }

    do {
      currentNode.getParent().removeChild(currentNode.getChar());
      this._nodesCount -= 1;
      currentNode = currentNode.getParent();
    } while (
      currentNode.isLeaf()
      && !currentNode.isEndOfWord()
      && !currentNode.isRoot()
    );

    this._wordsCount -= 1;
    return word;
  }

  /**
   * Checks if a prefix exists in the trie
   * @public
   * @param {any} value
   * @returns {boolean}
   */
  hasPrefix(value) {
    if (value === undefined || value === null) return false;

    const prefix = value.toString();

    let currentNode = this._root;

    for (let i = 0; i < prefix.length; i += 1) {
      if (!currentNode.hasChild(prefix[i])) return false;

      currentNode = currentNode.getChild(prefix[i]);
    }

    // If we successfully traversed the prefix, it exists
    return true;
  }

  /**
   * Traverse the trie and pass words to a callback
   * @public
   * @param {function} cb
   */
  forEach(cb) {
    if (typeof cb !== 'function') {
      throw new Error('Trie.forEach expects a callback function');
    }

    const forEachRecursive = (node = this._root, word = '') => {
      if (node.isEndOfWord()) {
        cb(word);
      }

      node.children().forEach((child) => {
        forEachRecursive(child, word + child.getChar());
      });
    };

    return forEachRecursive();
  }

  /**
   * Converts the trie into an array of words
   * @public
   * @returns {array}
   */
  toArray() {
    const result = [];
    this.forEach((word) => result.push(word));
    return result;
  }

  /**
   * @public
   * @returns {number}
   */
  nodesCount() {
    return this._nodesCount;
  }

  /**
   * @public
   * @returns {number}
   */
  wordsCount() {
    return this._wordsCount;
  }

  /**
   * Clears the trie
   * @public
   */
  clear() {
    this._root = new TrieNode('');
    this._nodesCount = 1;
    this._wordsCount = 0;
  }

  /**
   * Converts an existing list into a trie
   * @public
   * @static
   * @returns {Trie}
   */
  static fromArray(values) {
    const trie = new Trie();
    values.forEach((value) => trie.insert(value));
    return trie;
  }
}

exports.Trie = Trie;


/***/ }),

/***/ "./node_modules/@datastructures-js/trie/src/trieNode.js":
/*!**************************************************************!*\
  !*** ./node_modules/@datastructures-js/trie/src/trieNode.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * datastructures-js/trie
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 *
 * @class TrieNode
 */
class TrieNode {
  constructor(char) {
    this._char = char;
    this._isEndOfWord = false;
    this._parent = null;
    this._children = new Map();
  }

  /**
   * @public
   * @return {boolean}
   */
  isRoot() {
    return this._char === '';
  }

  /**
   * @public
   * @return {boolean}
   */
  isLeaf() {
    return this._children.size === 0;
  }

  /**
   * @public
   * @returns {string}
   */
  getChar() {
    return this._char;
  }

  /**
   * @internal
   * @param {TrieNode} parentNode
   */
  setParent(parentNode) {
    this._parent = parentNode;
    return this;
  }

  /**
   * @public
   * @return {TrieNode}
   */
  getParent() {
    return this._parent;
  }

  /**
   * @internal
   * @param {boolean} isEndOfWord
   */
  setEndOfWord(isEndOfWord) {
    this._isEndOfWord = isEndOfWord;
    return this;
  }

  /**
   * @public
   * @return {boolean}
   */
  isEndOfWord() {
    return this._isEndOfWord;
  }

  /**
   * @internal
   * @param {string} char
   */
  addChild(char) {
    const childNode = new TrieNode(char);
    childNode.setParent(this);
    this._children.set(char, childNode);
    return this;
  }

  /**
   * @internal
   * @param {string} char
   * @return {boolean}
   */
  removeChild(char) {
    return this._children.delete(char);
  }

  /**
   * @public
   * @param {string} char
   * @return {TrieNode}
   */
  getChild(char) {
    return this._children.get(char) || null;
  }

  /**
   * @public
   * @param {string} char
   * @return {boolean}
   */
  hasChild(char) {
    return this._children.has(char);
  }

  /**
   * @internal
   * @return {Map}
   */
  children() {
    return this._children;
  }

  /**
   * @public
   * @return {number}
   */
  childrenCount() {
    return this._children.size;
  }
}

exports.TrieNode = TrieNode;


/***/ }),

/***/ "./src/css/app.pcss":
/*!**************************!*\
  !*** ./src/css/app.pcss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/constants.js */ "./src/js/utilities/constants.js");
/* harmony import */ var _components_settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/settings.js */ "./src/js/components/settings.js");
/* harmony import */ var _components_trayGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/trayGenerator.js */ "./src/js/components/trayGenerator.js");
/* harmony import */ var _components_gameBoard_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/gameBoard.js */ "./src/js/components/gameBoard.js");
/* harmony import */ var _components_solver_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/solver.js */ "./src/js/components/solver.js");
/* harmony import */ var _components_timer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/timer.js */ "./src/js/components/timer.js");
/* harmony import */ var _components_correctGuesses_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/correctGuesses.js */ "./src/js/components/correctGuesses.js");
/* harmony import */ var _components_scoring_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/scoring.js */ "./src/js/components/scoring.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }








var currentGameState = {};
var startNewBoggleGame = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(gridSize, timeLimit) {
    var dice, tray, possibleSolutions;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          // Get the correct dice set based on the grid size, either standard, big, or super big
          dice = _utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.DICE_SET_BY_GRID_SIZE[gridSize];
          if (dice) {
            _context.n = 1;
            break;
          }
          throw new Error("Unsupported grid size: ".concat(gridSize));
        case 1:
          // Generate a new dice tray for the game using the determine dice set
          tray = (0,_components_trayGenerator_js__WEBPACK_IMPORTED_MODULE_2__.generateRandomBoggleTray)(dice); // Display it onto the game board
          (0,_components_gameBoard_js__WEBPACK_IMPORTED_MODULE_3__.displayBoggleGrid)(tray);

          // Generate all possible solutions from the generated tray
          _context.n = 2;
          return (0,_components_solver_js__WEBPACK_IMPORTED_MODULE_4__.solveBoggle)(tray);
        case 2:
          possibleSolutions = _context.v;
          (0,_components_timer_js__WEBPACK_IMPORTED_MODULE_5__.startTimer)(timeLimit);

          // Update the game state object accordingly
          currentGameState = {
            gridSize: gridSize,
            timeLimit: timeLimit,
            grid: tray,
            solutions: possibleSolutions,
            points: 0,
            alreadyGuessed: new Set(),
            currentSelection: ""
          };

          // Reset UI elements
          (0,_components_scoring_js__WEBPACK_IMPORTED_MODULE_7__.updatePointsUI)(currentGameState.points);
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function startNewBoggleGame(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var handleSelectionChange = function handleSelectionChange(event) {
  var path = event.detail;

  // Path is just an array of coordinates within the grid, so it needs to be converted into a string of letters
  var currentSelectionString = path.map(function (coordinate) {
    return currentGameState.grid[coordinate.row][coordinate.col];
  }).join("");
  currentGameState.currentSelection = currentSelectionString;
  var isValidSolution = currentGameState.solutions.has(currentGameState.currentSelection);

  // If not a valid guess, or has been previously guessed, return early
  if (!isValidSolution || currentGameState.alreadyGuessed.has(currentGameState.currentSelection)) return;

  // Update previous guesses set
  currentGameState.alreadyGuessed.add(currentGameState.currentSelection);

  // Update UI for correct guesses
  (0,_components_correctGuesses_js__WEBPACK_IMPORTED_MODULE_6__.updateCorrectGuessesUI)(currentGameState.currentSelection);
  (0,_components_gameBoard_js__WEBPACK_IMPORTED_MODULE_3__.hightlightCorrectSelection)(path);
  var solutionLength = currentGameState.currentSelection.length;

  // Update points internally and on the UI
  currentGameState.points += (0,_components_scoring_js__WEBPACK_IMPORTED_MODULE_7__.getPointsForWord)(solutionLength);
  (0,_components_scoring_js__WEBPACK_IMPORTED_MODULE_7__.updatePointsUI)(currentGameState.points);
};

// Initial project setup
(0,_components_settings_js__WEBPACK_IMPORTED_MODULE_1__.setupSettingsControls)(startNewBoggleGame);
window.addEventListener("boggle-selection-change", handleSelectionChange);

/***/ }),

/***/ "./src/js/components/correctGuesses.js":
/*!*********************************************!*\
  !*** ./src/js/components/correctGuesses.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateCorrectGuessesUI: () => (/* binding */ updateCorrectGuessesUI)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var threeLetterCorrectGuessesRow = document.getElementById("threeLetterCorrectGuessesRow");
var fourLetterCorrectGuessesRow = document.getElementById("fourLetterCorrectGuessesRow");
var fiveLetterCorrectGuessesRow = document.getElementById("fiveLetterCorrectGuessesRow");
var sixLetterCorrectGuessesRow = document.getElementById("sixLetterCorrectGuessesRow");
var sevenLetterCorrectGuessesRow = document.getElementById("sevenLetterCorrectGuessesRow");

/**
 * Row elements for correct guesses grouped by word length.
 * Keys represent word lengths (3–7), where 7 includes 7+ letter words.
 *
 * @type {Record<number, HTMLElement | null>}
 */
var correctGuessRowByLength = {
  3: threeLetterCorrectGuessesRow,
  4: fourLetterCorrectGuessesRow,
  5: fiveLetterCorrectGuessesRow,
  6: sixLetterCorrectGuessesRow,
  7: sevenLetterCorrectGuessesRow
};

/**
 * Builds a DOM element representing a correctly guessed word.
 *
 * @param {string} word - The word to display. Must be a non-empty string
 * consisting of letters only (after trimming).
 *
 * @throws {TypeError} If `word` is not a string
 * @throws {Error} If `word` is empty after trimming
 *
 * @returns {HTMLDivElement} The styled word element
 */
var buildWordElement = function buildWordElement(word) {
  if (typeof word !== "string") {
    throw new TypeError("buildWordElement expected a string, got ".concat(_typeof(word)));
  }
  var trimmed = word.trim();
  if (!trimmed) {
    throw new Error("buildWordElement received an empty word");
  }
  var div = document.createElement("div");
  div.classList.add("rounded-3xl", "border", "border-green-700", "bg-white", "px-3", "text-green-700", "uppercase");
  div.innerText = trimmed;
  return div;
};

/**
 * Creates a UI element representing a guessed word and appends it
 * to the correct row based on word length.
 *
 * Words with length >= 7 are grouped into the 7-letter row.
 *
 * @param {string} guess - The correctly guessed word
 * @returns {void}
 */
var updateCorrectGuessesUI = function updateCorrectGuessesUI(guess) {
  // Clamp 7+ to 7 as the all go into the same row anyway
  // eslint-disable-next-line no-magic-numbers
  var length = guess.length >= 7 ? 7 : guess.length;
  var parent = correctGuessRowByLength[length];
  var element = buildWordElement(guess);
  parent.appendChild(element);
};

/***/ }),

/***/ "./src/js/components/gameBoard.js":
/*!****************************************!*\
  !*** ./src/js/components/gameBoard.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayBoggleGrid: () => (/* binding */ displayBoggleGrid),
/* harmony export */   hightlightCorrectSelection: () => (/* binding */ hightlightCorrectSelection)
/* harmony export */ });
/* harmony import */ var _utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/constants.js */ "./src/js/utilities/constants.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* eslint-disable no-magic-numbers */


var gameBoardParent = document.getElementById("gameBoardParent");
var buttons = [];
var selectionState = {
  isDragging: false,
  didDrag: false,
  selectedPath: [],
  isAnimating: false
};

/**
 * Checks whether two tiles are adjacent (including diagonals).
 *
 * A tile is considered adjacent if it is:
 * - Within 1 row distance AND
 * - Within 1 column distance AND
 * - Not the same tile
 *
 * @param {{row: number, col: number}} a - First tile.
 * @param {{row: number, col: number}} b - Second tile.
 * @returns {boolean} True if tiles are adjacent.
 * @throws {TypeError} If inputs are missing or invalid.
 */
var isAdjacent = function isAdjacent(a, b) {
  if (!a || !b) throw new TypeError("Both tile arguments are required");
  if (!Number.isInteger(a.row) || !Number.isInteger(a.col) || !Number.isInteger(b.row) || !Number.isInteger(b.col)) throw new TypeError("Tile coordinates must be integers");
  var sameTile = a.row === b.row && a.col === b.col;
  return Math.abs(a.row - b.row) <= 1 && Math.abs(a.col - b.col) <= 1 && !sameTile;
};

/**
 * Dispatches a global `boggle-selection-change` custom event whenever the
 * current Boggle selection path changes.
 *
 * The event's `detail` contains a shallow copy of the current selected path,
 * allowing listeners to safely read the selection without mutating the
 * original state.
 *
 * @fires CustomEvent#boggle-selection-change
 * @returns {void}
 */
var emitSelectionChange = function emitSelectionChange() {
  window.dispatchEvent(new CustomEvent("boggle-selection-change", {
    detail: _toConsumableArray(selectionState.selectedPath)
  }));
};

/**
 * Clears the entire current selection path and removes UI highlighting.
 *
 * @returns {void}
 */
var clearSelection = function clearSelection() {
  selectionState.selectedPath.forEach(function (_ref) {
    var _buttons$row$col$firs, _buttons$row$col$firs2;
    var row = _ref.row,
      col = _ref.col;
    (_buttons$row$col$firs = buttons[row][col].firstElementChild) === null || _buttons$row$col$firs === void 0 || _buttons$row$col$firs.removeAttribute("data-correct");
    (_buttons$row$col$firs2 = buttons[row][col].firstElementChild) === null || _buttons$row$col$firs2 === void 0 || _buttons$row$col$firs2.removeAttribute("data-selected");
  });
  selectionState.selectedPath = [];
  emitSelectionChange();
};

/**
 * Visually highlights the selected path as correct, then clears the selection
 * after a short animation delay.
 *
 * While the animation is running, selection updates are temporarily blocked
 * via `selectionState.isAnimating` to prevent race conditions (such as a forced
 * selection clear at the end of a drag gesture).
 *
 * @param {Array<{row: number, col: number}>} path - The sequence of grid
 * coordinates to highlight.
 * @returns {void}
 */
var hightlightCorrectSelection = function hightlightCorrectSelection(path) {
  // Add an isAnimating guard to fix a race condition when forcing clear selection at the end of a drag
  selectionState.isAnimating = true;
  var _iterator = _createForOfIteratorHelper(path),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _buttons$row$col$firs3;
      var coordinate = _step.value;
      var row = coordinate.row,
        col = coordinate.col;
      (_buttons$row$col$firs3 = buttons[row][col].firstElementChild) === null || _buttons$row$col$firs3 === void 0 || _buttons$row$col$firs3.setAttribute("data-correct", "");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  setTimeout(function () {
    clearSelection();
    selectionState.isAnimating = false;
  }, 300);
};

/**
 * Selects a tile and updates the selection path + UI state.
 *
 * @param {number} row - Row index of the tile.
 * @param {number} col - Column index of the tile.
 * @returns {void}
 * @throws {TypeError} If row or col is not an integer.
 */
var selectTile = function selectTile(row, col) {
  var _buttons$row$col$firs4;
  if (selectionState.isAnimating) return;
  if (!Number.isInteger(row)) throw new TypeError("Expected row to be an integer, received: ".concat(row));
  if (!Number.isInteger(col)) throw new TypeError("Expected col to be an integer, received: ".concat(col));
  selectionState.selectedPath.push({
    row: row,
    col: col
  });
  (_buttons$row$col$firs4 = buttons[row][col].firstElementChild) === null || _buttons$row$col$firs4 === void 0 || _buttons$row$col$firs4.setAttribute("data-selected", "");
  emitSelectionChange();
};

/**
 * Removes the most recently selected tile from the selection path
 * and updates its visual state.
 *
 * @returns {void}
 */
var deselectTile = function deselectTile() {
  var _buttons$last$row$las;
  var last = selectionState.selectedPath.pop();
  if (last) (_buttons$last$row$las = buttons[last.row][last.col].firstElementChild) === null || _buttons$last$row$las === void 0 || _buttons$last$row$las.removeAttribute("data-selected");
  emitSelectionChange();
};

/**
 * Checks whether a tile is already part of the current selection path.
 *
 * @param {number} row - Row index of the tile.
 * @param {number} col - Column index of the tile.
 * @returns {boolean} True if the tile exists in the selected path.
 * @throws {TypeError} If row or col is not an integer.
 */
var alreadySelected = function alreadySelected(row, col) {
  if (!Number.isInteger(row)) throw new TypeError("Expected row to be an integer, received: ".concat(row));
  if (!Number.isInteger(col)) throw new TypeError("Expected col to be an integer, received: ".concat(col));
  var path = selectionState.selectedPath;

  // Guard: nothing selected yet
  if (!path || path.length === 0) return false;
  return path.some(function (tile) {
    return tile.row === row && tile.col === col;
  });
};

/**
 * Handles selection of a tile in the grid.
 *
 * @param {number} row - Row index of the tile.
 * @param {number} col - Column index of the tile.
 * @returns {void}
 * @throws {TypeError} When row or col is not an integer.
 */
var handleSelect = function handleSelect(row, col) {
  if (!Number.isInteger(row)) throw new TypeError("Expected row to be an integer, received: ".concat(row));
  if (!Number.isInteger(col)) throw new TypeError("Expected col to be an integer, received: ".concat(col));
  var last = selectionState.selectedPath.at(-1);

  // First tile
  if (!last) {
    selectTile(row, col);
    return;
  }

  // Clicking same tile = undo last
  if (last.row === row && last.col === col) {
    deselectTile();
    return;
  }

  // Allows user to deselect while dragging, since pointer will focus second last selection instead
  var secondLast = selectionState.selectedPath.at(-2);
  if (secondLast && secondLast.row === row && secondLast.col === col && selectionState.didDrag) {
    deselectTile();
    return;
  }

  // Clicking any already-selected tile = clear all
  if (alreadySelected(row, col)) {
    clearSelection();
    selectTile(row, col);
    return;
  }

  // Non-adjacent = clear all
  if (!isAdjacent(last, {
    row: row,
    col: col
  })) {
    clearSelection();
    if (selectionState.isDragging) selectTile(row, col);
    return;
  }
  selectTile(row, col);
};

/**
 * Attaches the event listeners required for selecting and dragging across
 * tiles in the Boggle grid.
 *
 * Supports:
 * - Keyboard selection via click events.
 * - Pointer/touch selection via pointerdown.
 * - Drag selection via pointerenter.
 *
 * @param {HTMLButtonElement} button - The tile button element.
 * @param {number} i - The row index of the tile.
 * @param {number} j - The column index of the tile.
 * @returns {void}
 * @throws {TypeError} If button is not a button element.
 * @throws {TypeError} If i or j are not integers.
 */
var attachButtonListeners = function attachButtonListeners(button, i, j) {
  if (!(button instanceof HTMLButtonElement)) throw new TypeError("Expected button to be an HTMLButtonElement.");
  if (!Number.isInteger(i)) throw new TypeError("Expected i to be an integer.");
  if (!Number.isInteger(j)) throw new TypeError("Expected j to be an integer.");
  button.addEventListener("click", function (e) {
    // Regular clicks are handled by pointer down, but this is needed to maintain keyboard accessibility
    if (e.detail !== 0) return;
    handleSelect(i, j);
  });

  // Click/tap starts selection
  button.addEventListener("pointerdown", function (e) {
    selectionState.isDragging = true;
    selectionState.didDrag = false;
    handleSelect(i, j);
    e.preventDefault();
  });

  // Dragging across tiles
  button.addEventListener("pointerenter", function () {
    if (!selectionState.isDragging) return;
    selectionState.didDrag = true;
    handleSelect(i, j);
  });
};

/**
 * Renders the Boggle grid on the webpage by creating a 4x4, 5x5, or 6x6 layout of cells based on the provided grid data.
 *
 *
 * @function displayBoggleGrid
 * @param {string[][]} grid
 * @returns {void}
 */
var displayBoggleGrid = function displayBoggleGrid(grid) {
  var _gridContainer$classL;
  var gridContainer = document.getElementById("gameTray");
  if (!gridContainer) throw new Error("Could not find gridContainer");

  // Clear any previous grid or the default grid
  gridContainer.innerHTML = "";

  // Remove any previous grid column classes
  (_gridContainer$classL = gridContainer.classList).remove.apply(_gridContainer$classL, _toConsumableArray(Object.values(_utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.GRID_COLUMN_CLASSES)));

  // Apply the correct grid columns Tailwind class based on grid size
  gridContainer.classList.add(_utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.GRID_COLUMN_CLASSES[grid.length]);
  if (!Array.isArray(grid) || grid.length === 0) throw new TypeError("Expected grid to be a non-empty 2D array of strings.");

  // Create a fragment for performance reasons
  var fragment = document.createDocumentFragment();

  // Loop over the full grid length generating the buttons for each letter
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i];
    buttons[i] = [];
    for (var j = 0; j < row.length; j++) {
      var _button$classList, _span$classList;
      var value = row[j];

      // The actual letter characters are within a span for additional styles
      var button = document.createElement("button");
      (_button$classList = button.classList).add.apply(_button$classList, _toConsumableArray(_utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.GRID_CELL_BUTTON_CLASSES));

      // Add necessary event listeners to the button for the interactivity
      attachButtonListeners(button, i, j);
      var span = document.createElement("span");
      (_span$classList = span.classList).add.apply(_span$classList, _toConsumableArray(_utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.GRID_CELL_CONTENT_CLASSES));

      // Converts special tiles like qu into a capitalised version eg. Qu or An
      span.textContent = _utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.SPECIAL_TILES.includes(value) ? value[0].toUpperCase() + value.slice(1) : value.toUpperCase();
      buttons[i][j] = button;
      button.appendChild(span);
      fragment.appendChild(button);
    }
  }

  // Append the built fragment to the grid
  gridContainer.appendChild(fragment);
  gameBoardParent.classList.remove("lg:gap-4");

  // Add slightly more spacing between the biggest grid + the timer etc on biggest window sizes
  if (window.innerWidth >= 1024 && grid.length === 6) {
    gameBoardParent.classList.add("lg:gap-4");
  }
};

// Stop dragging
window.addEventListener("pointerup", function () {
  selectionState.isDragging = false;

  // Fully clear only if a drag has been stopped
  if (selectionState.didDrag && !selectionState.isAnimating) clearSelection();
});

/***/ }),

/***/ "./src/js/components/scoring.js":
/*!**************************************!*\
  !*** ./src/js/components/scoring.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPointsForWord: () => (/* binding */ getPointsForWord),
/* harmony export */   updatePointsUI: () => (/* binding */ updatePointsUI)
/* harmony export */ });
/* eslint-disable no-magic-numbers */

var pointsCounterElement = document.getElementById("pointsCounterElement");

/**
 * Calculates the number of points awarded for a word based on its length.
 *
 * Word lengths 0–4 award 1 point, length 5 awards 2 points,
 * length 6 awards 3 points, length 7 awards 5 points,
 * and any word longer than 7 characters awards 11 points.
 *
 * @param {number} length - The length of the word.
 * @returns {number} The number of points awarded.
 */
var getPointsForWord = function getPointsForWord(length) {
  var _scores$length;
  // Length of words maps to index of the array to get correct points
  var scores = [1, 1, 1, 1, 1, 2, 3, 5];

  // Any word with a length >= 8 gets 11 points
  return (_scores$length = scores[length]) !== null && _scores$length !== void 0 ? _scores$length : 11;
};

/**
 * Updates the points counter displayed in the UI and briefly
 * applies a pop animation to indicate the score has changed.
 *
 * @param {number} points - The player's current score.
 * @returns {void}
 */
var updatePointsUI = function updatePointsUI(points) {
  pointsCounterElement.textContent = points;

  // Slight animation stuff
  pointsCounterElement.classList.add("scale-125");
  setTimeout(function () {
    pointsCounterElement.classList.remove("scale-125");
  }, 150);
};

/***/ }),

/***/ "./src/js/components/settings.js":
/*!***************************************!*\
  !*** ./src/js/components/settings.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupSettingsControls: () => (/* binding */ setupSettingsControls)
/* harmony export */ });
var settingsForm = document.getElementById("settingsForm");
var gridSizeDecreaseButton = document.getElementById("gridSizeDecreaseButton");
var gridSizeIncreaseButton = document.getElementById("gridSizeIncreaseButton");
var gridSizeSelector = document.getElementById("gridSizeSelector");
var timeLimitDecreaseButton = document.getElementById("timeLimitDecreaseButton");
var timeLimitIncreaseButton = document.getElementById("timeLimitIncreaseButton");
var timeLimitSelector = document.getElementById("timeLimitSelector");

/**
 * Attaches increment and decrement button handlers to a select element.
 * Clicking the decrease button selects the previous option, while clicking
 * the increase button selects the next option. The selection is clamped
 * to the first and last available options.
 *
 * @param {HTMLButtonElement} decreaseButton - Button that selects the previous option.
 * @param {HTMLButtonElement} increaseButton - Button that selects the next option.
 * @param {HTMLSelectElement} select - The select element to control.
 * @returns {void}
 * @throws {TypeError} If decreaseButton or increaseButton are not found.
 * @throws {TypeError} If select is not found.
 */
var setupSelectorControls = function setupSelectorControls(decreaseButton, increaseButton, select) {
  if (!decreaseButton || !(decreaseButton instanceof HTMLButtonElement)) throw new TypeError("Decrease button element not found or not HTMLButtonElement.");
  if (!increaseButton || !(increaseButton instanceof HTMLButtonElement)) throw new TypeError("Increase button element not found or not HTMLButtonElement.");
  if (!select || !(select instanceof HTMLSelectElement)) throw new TypeError("Select element not found or not HTMLSelectElement.");

  // Any "decrease" button linked to a select element will have to decrement the selected index
  decreaseButton.addEventListener("click", function () {
    // In other cases, we may want the buttons to loop the index round, but since we have both an increase and decrease button
    // we don't want it to loop
    if (select.selectedIndex > 0) select.selectedIndex--;
  });

  // Same as above, prevent looping and ensure all increaseButtons increase the selectedIndex
  increaseButton.addEventListener("click", function () {
    if (select.selectedIndex < select.options.length - 1) select.selectedIndex++;
  });
};

/**
 * Initializes the settings UI controls and wires up the form submission
 * to start a new Boggle game using the selected grid size and time limit.
 *
 * @param {(gridSize: string, timeLimit: string) => void} startNewBoggleGame
 *   Callback invoked when the settings form is submitted.
 *   Receives the selected grid size and time limit values.
 * @returns {void}
 * @throws {TypeError} If startNewBoggleGame is not a function.
 */
var setupSettingsControls = function setupSettingsControls(startNewBoggleGame) {
  if (typeof startNewBoggleGame !== "function") {
    throw new TypeError("setupSettingsControls expected startNewBoggleGame to be a function.");
  }

  // Makes sure both the time limit and grid size selectors are working correctly
  // by attaching all the correct event listeners

  // Only allow changing the grid size on wider windows tha allow it
  // TODO: Possibly add disabled styles to make this more clear
  if (window.innerWidth >= 768) {
    setupSelectorControls(gridSizeDecreaseButton, gridSizeIncreaseButton, gridSizeSelector);
  }
  setupSelectorControls(timeLimitDecreaseButton, timeLimitIncreaseButton, timeLimitSelector);

  // Connect the actual settings form submit button to starting a new boggle game with the corresponding settings
  settingsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    startNewBoggleGame(gridSizeSelector.value, timeLimitSelector.value);
  });
};

/***/ }),

/***/ "./src/js/components/solver.js":
/*!*************************************!*\
  !*** ./src/js/components/solver.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   solveBoggle: () => (/* binding */ solveBoggle)
/* harmony export */ });
/* harmony import */ var _utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/constants.js */ "./src/js/utilities/constants.js");
/* harmony import */ var _datastructures_js_trie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datastructures-js/trie */ "./node_modules/@datastructures-js/trie/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* eslint-disable no-magic-numbers */




/**
 * Loads dictionary words from a text file.
 *
 * @async
 * @function loadDictionaryFromFile
 * @param {string} filePath The path of the dictionary text file
 * @returns {Promise<string[]>} Array of dictionary words
 * @throws {TypeError} If filePath is not a string.
 */
var loadDictionaryFromFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var filePath,
      response,
      text,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          filePath = _args.length > 0 && _args[0] !== undefined ? _args[0] : _utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_DICTIONARY_PATH;
          if (!(typeof filePath !== "string")) {
            _context.n = 1;
            break;
          }
          throw new TypeError("Expected filePath to be a string, received ".concat(_typeof(filePath), "."));
        case 1:
          _context.n = 2;
          return fetch(filePath);
        case 2:
          response = _context.v;
          _context.n = 3;
          return response.text();
        case 3:
          text = _context.v;
          return _context.a(2, text.split("\n"));
      }
    }, _callee);
  }));
  return function loadDictionaryFromFile() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Loads the dictionary from disk and constructs a Trie for efficient
 * word and prefix lookups.
 *
 * @async
 * @function getDictionaryTrie
 * @returns {Promise<Trie>} A Promise that resolves to the dictionary Trie.
 */
var getDictionaryTrie = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var dictionary, dictionaryTrie;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return loadDictionaryFromFile();
        case 1:
          dictionary = _context2.v;
          // Use the data-structures Trie .fromArray method to build a Trie quickly for the prefix lookups
          dictionaryTrie = _datastructures_js_trie__WEBPACK_IMPORTED_MODULE_1__.Trie.fromArray(dictionary);
          return _context2.a(2, dictionaryTrie);
      }
    }, _callee2);
  }));
  return function getDictionaryTrie() {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Solves the Boggle board by finding all valid dictionary words.
 *
 * Uses DFS backtracking combined with Trie prefix pruning for efficiency.
 *
 * @async
 * @function solveBoggle
 * @param {string[][]} grid - 2D character grid representing the Boggle board
 * @returns {Promise<Set<string>>} A Promise that resolves to the set of all valid words found in the grid.
 * @throws {TypeError} If grid is not a 2D array of strings.
 */
var solveBoggle = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(grid) {
    var dictionaryTrie, results, rows, cols, _exploreWordPaths, i, j, visited;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return getDictionaryTrie();
        case 1:
          dictionaryTrie = _context3.v;
          results = new Set();
          if (!(!Array.isArray(grid) || grid.length === 0)) {
            _context3.n = 2;
            break;
          }
          throw new TypeError("Expected grid to be a non-empty 2D array of strings.");
        case 2:
          rows = grid.length;
          cols = grid[0].length;
          /**
           * Depth-first search helper to explore all valid paths from a cell.
           *
           * @param {number} r - Current row index
           * @param {number} c - Current column index
           * @param {boolean[][]} visited - Tracks visited cells in current path
           * @param {string} path - Current constructed word
           */
          _exploreWordPaths = function exploreWordPaths(r, c, visited, path) {
            path += grid[r][c];
            visited[r][c] = true;
            if (!dictionaryTrie.hasPrefix(path)) {
              visited[r][c] = false;
              return;
            }
            if (path.length >= _utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.MIN_WORD_LENGTH && dictionaryTrie.has(path)) results.add(path);
            var _iterator = _createForOfIteratorHelper(_utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.ADJACENT_DIRECTIONS),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _step$value = _slicedToArray(_step.value, 2),
                  dr = _step$value[0],
                  dc = _step$value[1];
                var nr = r + dr;
                var nc = c + dc;
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr][nc]) continue;
                _exploreWordPaths(nr, nc, visited, path);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            visited[r][c] = false;
          };
          for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
              visited = Array.from({
                length: rows
              }, function () {
                return Array(cols).fill(false);
              });
              _exploreWordPaths(i, j, visited, "");
            }
          }
          return _context3.a(2, results);
      }
    }, _callee3);
  }));
  return function solveBoggle(_x) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/js/components/timer.js":
/*!************************************!*\
  !*** ./src/js/components/timer.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startTimer: () => (/* binding */ startTimer)
/* harmony export */ });
/* eslint-disable no-magic-numbers */

var timerElement = document.getElementById("timerElement");
var countdownTimer;
var remainingSeconds = 0;

/**
 * Starts a countdown timer.
 *
 * If another timer is already running, it is stopped before starting
 * the new one.
 *
 * @param {number} minutes - Number of minutes to count down from.
 * @returns {void}
 * @throws {TypeError} If input is not a positive number
 */
var startTimer = function startTimer(minutes) {
  if (minutes < 0) throw new TypeError("Minutes must be a positive number.");

  // Clear any previous timer
  clearInterval(countdownTimer);
  remainingSeconds = minutes * 60;

  // Update the display
  updateTimerDisplay();

  // Create the new timer to countdown in seconds
  countdownTimer = setInterval(function () {
    remainingSeconds--;

    // Stop the timer once it runs out
    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      updateTimerDisplay();
      clearInterval(countdownTimer);
      return;
    }

    // Update the display
    updateTimerDisplay();
  }, 1000);
};

/**
 * Updates the timer text displayed in the UI.
 *
 * @returns {void}
 */
var updateTimerDisplay = function updateTimerDisplay() {
  var mins = Math.floor(remainingSeconds / 60);
  var secs = remainingSeconds % 60;
  timerElement.textContent = "".concat(String(mins).padStart(2, "0"), ":").concat(String(secs).padStart(2, "0"));
};

/***/ }),

/***/ "./src/js/components/trayGenerator.js":
/*!********************************************!*\
  !*** ./src/js/components/trayGenerator.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateRandomBoggleTray: () => (/* binding */ generateRandomBoggleTray)
/* harmony export */ });
/* harmony import */ var _utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/constants.js */ "./src/js/utilities/constants.js");
/* eslint-disable no-magic-numbers */



/**
 * Generates a random Boggle tray by rolling the provided dice.
 * Each die is rolled to select a random letter, and the resulting letters are shuffled to create a 4x4, 5x5, or 6x6 grid.
 * Note: The function assumes that the input dice array contains exactly 16, 25, or 36 dice, each with 6 faces.
 *
 * @function generateRandomBoggleTray
 * @param {string[][]} dice - Array of 16, 25, or 36 dice, each die is an array of 6 letters#
 * @returns {string[][]} 4x4, 5x5, or 6x6 grid of letters representing the Boggle tray
 * @throws {TypeError} If dice is not a 2D array of strings
 */
var generateRandomBoggleTray = function generateRandomBoggleTray(dice) {
  var grid = [];
  if (!Array.isArray(dice) || dice.length === 0) throw new TypeError("Expected dice to be a non-empty 2D array of strings.");

  // Dice.length shouldn't be an invalid grid size, but check anyway
  if (!_utilities_constants_js__WEBPACK_IMPORTED_MODULE_0__.VALID_GRID_SIZES.includes(dice.length)) return grid;

  // Roll each die to get a random letter
  var letters = dice.map(function (die) {
    return die[Math.floor(Math.random() * 6)];
  });

  // Shuffle the letters to randomize their positions in the grid (could be replaced with a Fisher-Yates shuffle for better randomness)
  var shuffledLetters = letters.sort(function () {
    return Math.random() - 0.5;
  });
  var gridSize = Math.sqrt(dice.length);

  // Fill the 4x4, 5x5, or 6x6 grid with the shuffled letters
  for (var i = 0; i < gridSize; i++) {
    var row = [];
    for (var j = 0; j < gridSize; j++) {
      row.push(shuffledLetters[i * gridSize + j]);
    }
    grid.push(row);
  }
  return grid;
};

/***/ }),

/***/ "./src/js/utilities/constants.js":
/*!***************************************!*\
  !*** ./src/js/utilities/constants.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ADJACENT_DIRECTIONS: () => (/* binding */ ADJACENT_DIRECTIONS),
/* harmony export */   BOGGLE_BIG_DICE: () => (/* binding */ BOGGLE_BIG_DICE),
/* harmony export */   BOGGLE_DICE: () => (/* binding */ BOGGLE_DICE),
/* harmony export */   BOGGLE_SUPER_BIG_DICE: () => (/* binding */ BOGGLE_SUPER_BIG_DICE),
/* harmony export */   DEFAULT_DICTIONARY_PATH: () => (/* binding */ DEFAULT_DICTIONARY_PATH),
/* harmony export */   DICE_SET_BY_GRID_SIZE: () => (/* binding */ DICE_SET_BY_GRID_SIZE),
/* harmony export */   GRID_CELL_BUTTON_CLASSES: () => (/* binding */ GRID_CELL_BUTTON_CLASSES),
/* harmony export */   GRID_CELL_CONTENT_CLASSES: () => (/* binding */ GRID_CELL_CONTENT_CLASSES),
/* harmony export */   GRID_COLUMN_CLASSES: () => (/* binding */ GRID_COLUMN_CLASSES),
/* harmony export */   MIN_WORD_LENGTH: () => (/* binding */ MIN_WORD_LENGTH),
/* harmony export */   SPECIAL_TILES: () => (/* binding */ SPECIAL_TILES),
/* harmony export */   VALID_GRID_SIZES: () => (/* binding */ VALID_GRID_SIZES)
/* harmony export */ });
/* eslint-disable no-magic-numbers */

/**
 * Standard 4×4 Boggle dice introduced in 2012.
 *
 * Each inner array represents one six-sided die. Some faces contain
 * multi-letter combinations (e.g. "qu", "th", "er") that occupy a
 * single board cell.
 *
 * @constant {string[][]}
 */
var BOGGLE_DICE = [["a", "a", "e", "e", "g", "n"], ["a", "b", "b", "j", "o", "o"], ["a", "c", "h", "o", "p", "s"], ["a", "f", "f", "k", "p", "s"], ["a", "o", "o", "t", "t", "w"], ["c", "i", "m", "o", "t", "u"], ["d", "e", "i", "l", "r", "x"], ["d", "e", "l", "r", "v", "y"], ["d", "i", "s", "t", "t", "y"], ["e", "e", "g", "h", "n", "w"], ["e", "e", "i", "n", "s", "u"], ["e", "h", "r", "t", "v", "w"], ["e", "i", "o", "s", "s", "t"], ["e", "l", "r", "t", "t", "y"], ["h", "i", "m", "n", "qu", "u"], ["h", "l", "n", "n", "r", "z"]];

/**
 * Standard 5×5 Big Boggle dice introduced in 2012.
 *
 * Each inner array represents one six-sided die. Some faces contain
 * multi-letter combinations (e.g. "qu", "th", "er") that occupy a
 * single board cell.
 *
 * @constant {string[][]}
 */
var BOGGLE_BIG_DICE = [["a", "a", "a", "f", "r", "s"], ["a", "a", "e", "e", "e", "e"], ["a", "a", "f", "i", "r", "s"], ["a", "d", "e", "n", "n", "n"], ["a", "e", "e", "e", "e", "m"], ["a", "e", "e", "g", "m", "u"], ["a", "e", "g", "m", "n", "n"], ["a", "f", "i", "r", "s", "y"], ["b", "b", "j", "k", "x", "z"], ["c", "c", "e", "n", "s", "t"], ["e", "i", "i", "l", "s", "t"], ["c", "e", "i", "p", "s", "t"], ["d", "d", "h", "n", "o", "t"], ["d", "h", "h", "l", "o", "r"], ["d", "h", "h", "n", "o", "w"], ["d", "h", "l", "n", "o", "r"], ["e", "i", "i", "i", "t", "t"], ["e", "i", "l", "p", "s", "t"], ["e", "m", "o", "t", "t", "t"], ["e", "n", "s", "s", "s", "u"], ["an", "er", "he", "in", "qu", "th"], ["g", "o", "r", "r", "v", "w"], ["i", "p", "r", "s", "y", "y"], ["n", "o", "o", "t", "u", "w"], ["o", "o", "o", "t", "t", "u"]];

/**
 * Standard 6×6 Super Big Boggle dice.
 *
 * Each inner array represents one six-sided die. Some faces contain
 * multi-letter combinations or blank faces ("-"), matching the
 * official Super Big Boggle dice set.
 *
 * @constant {string[][]}
 */
var BOGGLE_SUPER_BIG_DICE = [["a", "a", "a", "f", "r", "s"], ["a", "a", "e", "e", "e", "e"], ["a", "a", "e", "e", "o", "o"], ["a", "a", "f", "i", "r", "s"], ["a", "b", "d", "e", "i", "o"], ["a", "d", "e", "n", "n", "n"], ["a", "e", "e", "e", "e", "m"], ["a", "e", "e", "g", "m", "u"], ["a", "e", "g", "m", "n", "n"], ["a", "e", "i", "l", "m", "n"], ["a", "e", "i", "n", "o", "u"], ["a", "f", "i", "r", "s", "y"], ["an", "er", "he", "in", "qu", "th"], ["b", "b", "j", "k", "x", "z"], ["c", "c", "e", "n", "s", "t"], ["c", "d", "d", "l", "n", "n"], ["c", "e", "i", "i", "t", "t"], ["c", "e", "i", "p", "s", "t"], ["c", "f", "g", "n", "u", "y"], ["d", "d", "h", "n", "o", "t"], ["d", "h", "h", "l", "o", "r"], ["d", "h", "h", "n", "o", "w"], ["d", "h", "l", "n", "o", "r"], ["e", "h", "i", "l", "r", "s"], ["e", "i", "i", "l", "s", "t"], ["e", "i", "l", "p", "s", "t"], ["e", "i", "o", "-", "-", "-"], ["e", "m", "t", "t", "t", "o"], ["e", "n", "s", "s", "s", "u"], ["g", "o", "r", "r", "v", "w"], ["h", "i", "r", "s", "t", "v"], ["h", "o", "p", "r", "s", "t"], ["i", "p", "r", "s", "y", "y"], ["j", "k", "qu", "w", "x", "z"], ["n", "o", "o", "t", "u", "w"], ["o", "o", "o", "t", "t", "u"]];

/**
 * Maps a grid size to the corresponding official Boggle dice set.
 *
 * @constant {Object.<string, string[][]>}
 */
var DICE_SET_BY_GRID_SIZE = {
  "4x4": BOGGLE_DICE,
  "5x5": BOGGLE_BIG_DICE,
  "6x6": BOGGLE_SUPER_BIG_DICE
};

/**
 * Tailwind CSS classes applied to each interactive grid cell button.
 *
 * @constant {string[]}
 */
var GRID_CELL_BUTTON_CLASSES = ["xs:text-2xl", "grid", "cursor-pointer", "place-items-center", "rounded-lg", "bg-gray-300", "p-1.25", "text-xl", "aspect-square", "font-bold", "sm:text-3xl", "md:text-4xl"];

/**
 * Tailwind CSS classes applied to the element displaying the
 * letter(s) inside each grid cell.
 *
 * @constant {string[]}
 */
var GRID_CELL_CONTENT_CLASSES = ["grid", "aspect-square", "w-15", "place-items-center", "rounded-full", "bg-white", "transition-colors", "duration-100", "ease-linear", "data-selected:bg-gray-500", "data-selected:text-white", "data-correct:animate-correct-flash"];

/**
 * Relative offsets for all eight adjacent directions
 * (horizontal, vertical, and diagonal).
 *
 * Used when traversing neighbouring cells during word searches.
 *
 * @constant {number[][]}
 */
var ADJACENT_DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

/**
 * Minimum number of letters required for a valid Boggle word.
 *
 * @constant {number}
 */
var MIN_WORD_LENGTH = 3;

/**
 * Multi-letter tile combinations that should be treated as a single tile
 * on the game board (e.g. common digraphs and letter pairs).
 * @constant {string[]}
 */
var SPECIAL_TILES = ["qu", "an", "er", "he", "in", "th"];

/**
 * Maps a board size to the corresponding Tailwind CSS grid column classes.
 * Used to set the correct number of columns and tile widths for the grid.
 *
 * @constant {Object.<number, string>}
 */
var GRID_COLUMN_CLASSES = {
  4: "md:grid-cols-[repeat(4,_74px)]",
  5: "md:grid-cols-[repeat(5,_74px)]",
  6: "md:grid-cols-[repeat(6,_74px)]"
};

/**
 * Valid sizes for the Boggle Dice tray grid
 *
 * @constant {number[]}
 */
var VALID_GRID_SIZES = [16, 25, 36];

/**
 * Path to the default dictionary file used for Boggle word validation.
 * The file contains words from the Official Scrabble Players Dictionary (OSPD4).
 * @constant {string}
 */
var DEFAULT_DICTIONARY_PATH = "static/data/ospd4.txt";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/static/js/app": 0,
/******/ 			"static/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkboggle"] = self["webpackChunkboggle"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["static/css/app"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["static/css/app"], () => (__webpack_require__("./src/css/app.pcss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;