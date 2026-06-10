/* eslint-disable no-magic-numbers */

// eslint-disable-next-line no-undef
const { Trie } = require("@datastructures-js/trie");

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

// Standard 6x6 dice
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

const DICE_SETS = {
  "4x4": BOGGLE_DICE,
  "5x5": BOGGLE_BIG_DICE,
  "6x6": BOGGLE_SUPER_BIG_DICE,
};

const CELL_CLASSES = [
  "xs:text-2xl",
  "grid",
  "cursor-pointer",
  "place-items-center",
  "rounded-lg",
  "bg-gray-300",
  "p-1.25",
  "text-xl",
  "aspect-square",
  "font-bold",
  "sm:text-3xl",
  "md:text-4xl",
];

const SPAN_CLASSES = [
  "grid",
  "aspect-square",
  "w-15",
  "place-items-center",
  "rounded-full",
  "bg-white",
];

/**
 * All 8 possible movement directions (including diagonals)
 * used to traverse adjacent cells in the Boggle grid.
 *
 * @constant {number[][]}
 */
const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

/**
 * Minimum length required for a word to be considered valid.
 *
 * @constant {number}
 */
const MIN_WORD_LENGTH = 3;

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

/**
 * Loads dictionary words from a text file.
 *
 * @async
 * @function loadDictionary
 * @returns {Promise<string[]>} Array of dictionary words
 */
const loadDictionary = async () => {
  const response = await fetch("static/data/ospd4.txt");
  const text = await response.text();

  return text.split("\n");
};

/**
 * Solves the Boggle board by finding all valid dictionary words.
 *
 * Uses DFS backtracking combined with Trie prefix pruning for efficiency.
 *
 * @function solveBoggle
 * @param {string[][]} grid - 2D character grid representing the Boggle board
 * @param {Trie} dictionaryTrie - Trie containing valid dictionary words
 * @returns {Set<string>} Set of all valid words found in the grid
 */
const solveBoggle = (grid, dictionaryTrie) => {
  const results = new Set();

  const rows = grid.length;
  const cols = grid[0].length;

  /**
   * Depth-first search helper to explore all valid paths from a cell.
   *
   * @param {number} r - Current row index
   * @param {number} c - Current column index
   * @param {boolean[][]} visited - Tracks visited cells in current path
   * @param {string} path - Current constructed word
   */
  const exploreWordPaths = (r, c, visited, path) => {
    path += grid[r][c];

    visited[r][c] = true;

    if (!dictionaryTrie.hasPrefix(path)) {
      visited[r][c] = false;
      return;
    }

    if (path.length >= MIN_WORD_LENGTH && dictionaryTrie.has(path))
      results.add(path);

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr][nc])
        continue;

      exploreWordPaths(nr, nc, visited, path);
    }

    visited[r][c] = false;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const visited = Array.from({ length: rows }, () =>
        Array(cols).fill(false),
      );

      exploreWordPaths(i, j, visited, "");
    }
  }

  return results;
};

const startNewBoggleGame = async (gridSize, timeLimit) => {
  console.log(`Grid Size: ${gridSize} | Time Limit: ${timeLimit}`);

  const dice = DICE_SETS[gridSize];

  if (!dice) {
    throw new Error(`Unsupported grid size: ${gridSize}`);
  }

  const tray = generateRandomBoggleTray(dice);

  console.log(tray);

  displayBoggleGrid(tray);

  const dictionary = await loadDictionary("static/data/ospd4.txt");

  const dictionaryTrie = Trie.fromArray(dictionary);

  const possibleSolutions = solveBoggle(tray, dictionaryTrie);

  console.log(possibleSolutions);
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
const generateRandomBoggleTray = (dice = BOGGLE_DICE) => {
  const grid = [];

  if (dice.length !== 16 && dice.length !== 25 && dice.length !== 36)
    return grid;

  // Roll each die to get a random letter
  const letters = dice.map((die) => die[Math.floor(Math.random() * 6)]);

  // Shuffle the letters to randomize their positions in the grid (could be replaced with a Fisher-Yates shuffle for better randomness)
  const shuffledLetters = letters.sort(() => Math.random() - 0.5);

  const gridSize = Math.sqrt(dice.length);

  // Fill the 4x4, 5x5, or 6x6 grid with the shuffled letters
  for (let i = 0; i < gridSize; i++) {
    const row = [];

    for (let j = 0; j < gridSize; j++) {
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
const displayBoggleGrid = (grid) => {
  const gridContainer = document.getElementById("gameTray");

  if (!gridContainer) return;

  gridContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      const value = row[j];

      const cell = document.createElement("button");
      cell.classList.add(...CELL_CLASSES);

      const span = document.createElement("span");
      span.classList.add(...SPAN_CLASSES);

      span.textContent = value.toUpperCase();

      // TODO: Clean this up
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

  // TODO: Clean this up
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
