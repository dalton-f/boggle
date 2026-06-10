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
var BOGGLE_SUPER_BIG_DICE = [["a", "a", "a", "f", "r", "s"], ["a", "a", "e", "e", "e", "e"], ["a", "a", "e", "e", "o", "o"], ["a", "a", "f", "i", "r", "s"], ["a", "b", "d", "e", "i", "o"], ["a", "d", "e", "n", "n", "n"], ["a", "e", "e", "e", "e", "m"], ["a", "e", "e", "g", "m", "u"], ["a", "e", "g", "m", "n", "n"], ["a", "e", "i", "l", "m", "n"], ["a", "e", "i", "n", "o", "u"], ["a", "f", "i", "r", "s", "y"], ["an", "er", "he", "in", "qu", "th"], ["b", "b", "j", "k", "x", "z"], ["c", "c", "e", "n", "s", "t"], ["c", "d", "d", "l", "n", "n"], ["c", "e", "i", "i", "t", "t"], ["c", "e", "i", "p", "s", "t"], ["c", "f", "g", "n", "u", "y"], ["d", "d", "h", "n", "o", "t"], ["d", "h", "h", "l", "o", "r"], ["d", "h", "h", "n", "o", "w"], ["d", "h", "l", "n", "o", "r"], ["e", "h", "i", "l", "r", "s"], ["e", "i", "i", "l", "s", "t"], ["e", "i", "l", "p", "s", "t"], ["e", "i", "o", "-", "-", "-"], ["e", "m", "t", "t", "t", "o"], ["e", "n", "s", "s", "s", "u"], ["g", "o", "r", "r", "v", "w"], ["h", "i", "r", "s", "t", "v"], ["h", "o", "p", "r", "s", "t"], ["i", "p", "r", "s", "y", "y"], ["j", "k", "qu", "w", "x", "z"], ["n", "o", "o", "t", "u", "w"], ["o", "o", "o", "t", "t", "u"]];
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