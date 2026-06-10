/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/***/ (() => {

/* eslint-disable no-magic-numbers */

// Post 2012 standard dice used for 4x4 Boggle
var BOGGLE_DICE = [["a", "a", "e", "e", "g", "n"], ["a", "b", "b", "j", "o", "o"], ["a", "c", "h", "o", "p", "s"], ["a", "f", "f", "k", "p", "s"], ["a", "o", "o", "t", "t", "w"], ["c", "i", "m", "o", "t", "u"], ["d", "e", "i", "l", "r", "x"], ["d", "e", "l", "r", "v", "y"], ["d", "i", "s", "t", "t", "y"], ["e", "e", "g", "h", "n", "w"], ["e", "e", "i", "n", "s", "u"], ["e", "h", "r", "t", "v", "w"], ["e", "i", "o", "s", "s", "t"], ["e", "l", "r", "t", "t", "y"], ["h", "i", "m", "n", "qu", "u"], ["h", "l", "n", "n", "r", "z"]];

// Post 2012 standard dice used for 5x5 Big Boggle
var BOGGLE_BIG_DICE = [["a", "a", "a", "f", "r", "s"], ["a", "a", "e", "e", "e", "e"], ["a", "a", "f", "i", "r", "s"], ["a", "d", "e", "n", "n", "n"], ["a", "e", "e", "e", "e", "m"], ["a", "e", "e", "g", "m", "u"], ["a", "e", "g", "m", "n", "n"], ["a", "f", "i", "r", "s", "y"], ["b", "b", "j", "k", "x", "z"], ["c", "c", "e", "n", "s", "t"], ["e", "i", "i", "l", "s", "t"], ["c", "e", "i", "p", "s", "t"], ["d", "d", "h", "n", "o", "t"], ["d", "h", "h", "l", "o", "r"], ["d", "h", "h", "n", "o", "w"], ["d", "h", "l", "n", "o", "r"], ["e", "i", "i", "i", "t", "t"], ["e", "i", "l", "p", "s", "t"], ["e", "m", "o", "t", "t", "t"], ["e", "n", "s", "s", "s", "u"], ["an", "er", "he", "in", "qu", "th"], ["g", "o", "r", "r", "v", "w"], ["i", "p", "r", "s", "y", "y"], ["n", "o", "o", "t", "u", "w"], ["o", "o", "o", "t", "t", "u"]];

// Standard 6x6 dice
var BOGGLE_SUPER_BIG_DICE = [["a", "a", "a", "f", "r", "s"], ["a", "a", "e", "e", "e", "e"], ["a", "a", "e", "e", "o", "o"], ["a", "a", "f", "i", "r", "s"], ["a", "b", "d", "e", "i", "o"], ["a", "d", "e", "n", "n", "n"], ["a", "e", "e", "e", "e", "m"], ["a", "e", "e", "g", "m", "u"], ["a", "e", "g", "m", "n", "n"], ["a", "e", "i", "l", "m", "n"], ["a", "e", "i", "n", "o", "u"], ["a", "f", "i", "r", "s", "y"], ["an", "er", "he", "in", "qu", "th"], ["b", "b", "j", "k", "x", "z"], ["c", "c", "e", "n", "s", "t"], ["c", "d", "d", "l", "n", "n"], ["c", "e", "i", "i", "t", "t"], ["c", "e", "i", "p", "s", "t"], ["c", "f", "g", "n", "u", "y"], ["d", "d", "h", "n", "o", "t"], ["d", "h", "h", "l", "o", "r"], ["d", "h", "h", "n", "o", "w"], ["d", "h", "l", "n", "o", "r"], ["e", "h", "i", "l", "r", "s"], ["e", "i", "i", "l", "s", "t"], ["e", "i", "l", "p", "s", "t"], ["e", "i", "o", "-", "-", "-"], ["e", "m", "t", "t", "t", "o"], ["e", "n", "s", "s", "s", "u"], ["g", "o", "r", "r", "v", "w"], ["h", "i", "r", "s", "t", "v"], ["h", "o", "p", "r", "s", "t"], ["i", "p", "r", "s", "y", "y"], ["j", "k", "qu", "w", "x", "z"], ["n", "o", "o", "t", "u", "w"], ["o", "o", "o", "t", "t", "u"]];
var DICE_SETS = {
  "4x4": BOGGLE_DICE,
  "5x5": BOGGLE_BIG_DICE,
  "6x6": BOGGLE_SUPER_BIG_DICE
};
var CELL_CLASSES = ["xs:text-2xl", "grid", "cursor-pointer", "place-items-center", "rounded-lg", "bg-gray-300", "p-1.25", "text-xl", "aspect-square", "font-bold", "sm:text-3xl", "md:text-4xl"];
var SPAN_CLASSES = ["grid", "aspect-square", "w-15", "place-items-center", "rounded-full", "bg-white"];
var gridSizeDecreaseButton = document.getElementById("gridSizeDecreaseButton");
var gridSizeIncreaseButton = document.getElementById("gridSizeIncreaseButton");
var gridSizeSelector = document.getElementById("gridSizeSelector");
var timeLimitDecreaseButton = document.getElementById("timeLimitDecreaseButton");
var timeLimitIncreaseButton = document.getElementById("timeLimitIncreaseButton");
var timeLimitSelector = document.getElementById("timeLimitSelector");
var settingsForm = document.getElementById("settingsForm");
var setupSelectorControls = function setupSelectorControls(decreaseButton, increaseButton, selector) {
  decreaseButton.addEventListener("click", function () {
    if (selector.selectedIndex > 0) selector.selectedIndex--;
  });
  increaseButton.addEventListener("click", function () {
    if (selector.selectedIndex < selector.options.length - 1) selector.selectedIndex++;
  });
};
setupSelectorControls(gridSizeDecreaseButton, gridSizeIncreaseButton, gridSizeSelector);
setupSelectorControls(timeLimitDecreaseButton, timeLimitIncreaseButton, timeLimitSelector);
settingsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  startNewBoggleGame(gridSizeSelector.value, timeLimitSelector.value);
});
var startNewBoggleGame = function startNewBoggleGame(gridSize, timeLimit) {
  console.log("Grid Size: ".concat(gridSize, " | Time Limit: ").concat(timeLimit));
  var dice = DICE_SETS[gridSize];
  if (!dice) {
    throw new Error("Unsupported grid size: ".concat(gridSize));
  }
  var tray = generateRandomBoggleTray(dice);
  console.log(tray);
  displayBoggleGrid(tray);
};

/**
 * Generates a random Boggle tray by rolling the provided dice.
 * Each die is rolled to select a random letter, and the resulting letters are shuffled to create a 4x4, 5x5, or 6x6 grid.
 * Note: The function assumes that the input dice array contains exactly 16, 25, or 36 dice, each with 6 faces.
 *
 * @function generateRandomBoggleTray
 * @param {string[][]} dice - Array of 16, 25, or 36 dice, each die is an array of 6 letters
 * @returns {string[][]} 4x4, 5x5, or 6x6 grid of letters representing the Boggle tray
 */
var generateRandomBoggleTray = function generateRandomBoggleTray() {
  var dice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : BOGGLE_DICE;
  var grid = [];
  if (dice.length !== 16 && dice.length !== 25 && dice.length !== 36) return grid;

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

/**
 * Renders the Boggle grid on the webpage by creating a 4x4, 5x5, or 6x6 layout of cells based on the provided grid data.
 *
 *
 * @function displayBoggleGrid
 * @param {string[][]} grid
 * @returns
 */
var displayBoggleGrid = function displayBoggleGrid(grid) {
  var gridContainer = document.getElementById("gameTray");
  if (!gridContainer) return;
  gridContainer.innerHTML = "";
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i];
    for (var j = 0; j < row.length; j++) {
      var _cell$classList, _span$classList;
      var value = row[j];
      var cell = document.createElement("button");
      (_cell$classList = cell.classList).add.apply(_cell$classList, CELL_CLASSES);
      var span = document.createElement("span");
      (_span$classList = span.classList).add.apply(_span$classList, SPAN_CLASSES);
      span.textContent = value.toUpperCase();
      if (value === "qu") span.textContent = "Qu";
      if (value === "an") span.textContent = "An";
      if (value === "er") span.textContent = "Er";
      if (value === "he") span.textContent = "He";
      if (value === "in") span.textContent = "In";
      if (value === "th") span.textContent = "Th";
      cell.appendChild(span);
      fragment.appendChild(cell);
    }
  }
  gridContainer.appendChild(fragment);
  gridContainer.classList.remove("md:grid-cols-[repeat(4,_74px)]");
  gridContainer.classList.remove("md:grid-cols-[repeat(5,_74px)]");
  gridContainer.classList.remove("md:grid-cols-[repeat(6,_74px)]");
  if (grid.length === 4) {
    gridContainer.classList.add("md:grid-cols-[repeat(4,_74px)]");
  } else if (grid.length === 5) {
    gridContainer.classList.add("md:grid-cols-[repeat(5,_74px)]");
  } else {
    gridContainer.classList.add("md:grid-cols-[repeat(6,_74px)]");
  }
};

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