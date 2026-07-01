import { DICE_SET_BY_GRID_SIZE } from "./utilities/constants.js";

import { setupSettingsControls } from "./components/settings.js";

import { generateRandomBoggleTray } from "./components/trayGenerator.js";

import {
  displayBoggleGrid,
  hightlightCorrectSelection,
} from "./components/gameBoard.js";

import { solveBoggle } from "./components/solver.js";

import { startTimer } from "./components/timer.js";

import { getPointsForWord, updatePointsUI } from "./components/scoring.js";

let currentGameState = {};

const startNewBoggleGame = async (gridSize, timeLimit) => {
  // Get the correct dice set based on the grid size, either standard, big, or super big
  const dice = DICE_SET_BY_GRID_SIZE[gridSize];

  if (!dice) throw new Error(`Unsupported grid size: ${gridSize}`);

  // Generate a new dice tray for the game using the determine dice set
  const tray = generateRandomBoggleTray(dice);

  // Display it onto the game board
  displayBoggleGrid(tray);

  // Generate all possible solutions from the generated tray
  const possibleSolutions = await solveBoggle(tray);

  startTimer(timeLimit);

  // Update the game state object accordingly
  currentGameState = {
    gridSize,
    timeLimit,
    grid: tray,
    solutions: possibleSolutions,
    points: 0,
    alreadyGuessed: new Set(),
    currentSelection: "",
  };

  console.log(currentGameState);

  // Reset UI elements
  updatePointsUI(currentGameState.points);
};

const handleSelectionChange = (event) => {
  const { detail: path } = event;

  // Path is just an array of coordinates within the grid, so it needs to be converted into a string of letters
  const currentSelectionString = path
    .map((coordinate) => currentGameState.grid[coordinate.row][coordinate.col])
    .join("");

  currentGameState.currentSelection = currentSelectionString;

  const isValidSolution = currentGameState.solutions.has(
    currentGameState.currentSelection,
  );

  // If not a valid guess, or has been previously guessed, return early
  if (
    !isValidSolution ||
    currentGameState.alreadyGuessed.has(currentGameState.currentSelection)
  )
    return;

  // Update previous guesses set
  currentGameState.alreadyGuessed.add(currentGameState.currentSelection);

  hightlightCorrectSelection(path);

  const solutionLength = currentGameState.currentSelection.length;

  // Update points internally and on the UI
  currentGameState.points += getPointsForWord(solutionLength);
  updatePointsUI(currentGameState.points);
};

// Initial project setup
setupSettingsControls(startNewBoggleGame);

window.addEventListener("boggle-selection-change", handleSelectionChange);
