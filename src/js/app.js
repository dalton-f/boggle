/* eslint-disable no-magic-numbers */

// Post 2012 standard dice used for 4x4 Boggle
const BOGGLE_DICE = [
  ["a", "a", "e", "e", "g", "n"],
  ["a", "b", "b", "j", "o", "o"],
  ["a", "c", "h", "o", "p", "s"],
  ["a", "f", "f", "k", "p", "s"],
  ["a", "o", "o", "t", "t", "w"],
  ["c", "i", "m", "o", "t", "u"],
  ["d", "e", "i", "l", "r", "x"],
  ["d", "e", "l", "r", "v", "y"],
  ["d", "i", "s", "t", "t", "y"],
  ["e", "e", "g", "h", "n", "w"],
  ["e", "e", "i", "n", "s", "u"],
  ["e", "h", "r", "t", "v", "w"],
  ["e", "i", "o", "s", "s", "t"],
  ["e", "l", "r", "t", "t", "y"],
  ["h", "i", "m", "n", "qu", "u"],
  ["h", "l", "n", "n", "r", "z"],
];

// Post 2012 standard dice used for 5x5 Big Boggle
const BOGGLE_BIG_DICE = [
  ["a", "a", "a", "f", "r", "s"],
  ["a", "a", "e", "e", "e", "e"],
  ["a", "a", "f", "i", "r", "s"],
  ["a", "d", "e", "n", "n", "n"],
  ["a", "e", "e", "e", "e", "m"],
  ["a", "e", "e", "g", "m", "u"],
  ["a", "e", "g", "m", "n", "n"],
  ["a", "f", "i", "r", "s", "y"],
  ["b", "b", "j", "k", "x", "z"],
  ["c", "c", "e", "n", "s", "t"],
  ["e", "i", "i", "l", "s", "t"],
  ["c", "e", "i", "p", "s", "t"],
  ["d", "d", "h", "n", "o", "t"],
  ["d", "h", "h", "l", "o", "r"],
  ["d", "h", "h", "n", "o", "w"],
  ["d", "h", "l", "n", "o", "r"],
  ["e", "i", "i", "i", "t", "t"],
  ["e", "i", "l", "p", "s", "t"],
  ["e", "m", "o", "t", "t", "t"],
  ["e", "n", "s", "s", "s", "u"],
  ["an", "er", "he", "in", "qu", "th"],
  ["g", "o", "r", "r", "v", "w"],
  ["i", "p", "r", "s", "y", "y"],
  ["n", "o", "o", "t", "u", "w"],
  ["o", "o", "o", "t", "t", "u"],
];

const BOGGLE_SUPER_BIG_DICE = [
  ["a", "a", "a", "f", "r", "s"],
  ["a", "a", "e", "e", "e", "e"],
  ["a", "a", "e", "e", "o", "o"],
  ["a", "a", "f", "i", "r", "s"],
  ["a", "b", "d", "e", "i", "o"],
  ["a", "d", "e", "n", "n", "n"],
  ["a", "e", "e", "e", "e", "m"],
  ["a", "e", "e", "g", "m", "u"],
  ["a", "e", "g", "m", "n", "n"],
  ["a", "e", "i", "l", "m", "n"],
  ["a", "e", "i", "n", "o", "u"],
  ["a", "f", "i", "r", "s", "y"],
  ["an", "er", "he", "in", "qu", "th"],
  ["b", "b", "j", "k", "x", "z"],
  ["c", "c", "e", "n", "s", "t"],
  ["c", "d", "d", "l", "n", "n"],
  ["c", "e", "i", "i", "t", "t"],
  ["c", "e", "i", "p", "s", "t"],
  ["c", "f", "g", "n", "u", "y"],
  ["d", "d", "h", "n", "o", "t"],
  ["d", "h", "h", "l", "o", "r"],
  ["d", "h", "h", "n", "o", "w"],
  ["d", "h", "l", "n", "o", "r"],
  ["e", "h", "i", "l", "r", "s"],
  ["e", "i", "i", "l", "s", "t"],
  ["e", "i", "l", "p", "s", "t"],
  ["e", "i", "o", "-", "-", "-"],
  ["e", "m", "t", "t", "t", "o"],
  ["e", "n", "s", "s", "s", "u"],
  ["g", "o", "r", "r", "v", "w"],
  ["h", "i", "r", "s", "t", "v"],
  ["h", "o", "p", "r", "s", "t"],
  ["i", "p", "r", "s", "y", "y"],
  ["j", "k", "qu", "w", "x", "z"],
  ["n", "o", "o", "t", "u", "w"],
  ["o", "o", "o", "t", "t", "u"],
];

const gridSizeDecreaseButton = document.getElementById(
  "gridSizeDecreaseButton",
);

const gridSizeIncreaseButton = document.getElementById(
  "gridSizeIncreaseButton",
);

const gridSizeSelector = document.getElementById("gridSizeSelector");

const timeLimitDecreaseButton = document.getElementById(
  "timeLimitDecreaseButton",
);

const timeLimitIncreaseButton = document.getElementById(
  "timeLimitIncreaseButton",
);

const timeLimitSelector = document.getElementById("timeLimitSelector");

const settingsForm = document.getElementById("settingsForm");

const setupSelectorControls = (decreaseButton, increaseButton, selector) => {
  decreaseButton.addEventListener("click", () => {
    if (selector.selectedIndex > 0) selector.selectedIndex--;
  });

  increaseButton.addEventListener("click", () => {
    if (selector.selectedIndex < selector.options.length - 1)
      selector.selectedIndex++;
  });
};

setupSelectorControls(
  gridSizeDecreaseButton,
  gridSizeIncreaseButton,
  gridSizeSelector,
);

setupSelectorControls(
  timeLimitDecreaseButton,
  timeLimitIncreaseButton,
  timeLimitSelector,
);

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  startNewBoggleGame(gridSizeSelector.value, timeLimitSelector.value);
});

const startNewBoggleGame = (gridSize, timeLimit) => {
  console.log(`Grid Size: ${gridSize} | Time Limit: ${timeLimit}`);
};
