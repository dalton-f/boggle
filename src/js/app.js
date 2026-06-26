import { DICE_SET_BY_GRID_SIZE } from "./utilities/constants.js";

import { setupSettingsControls } from "./components/settings.js";
import { generateRandomBoggleTray } from "./components/trayGenerator.js";
import { displayBoggleGrid } from "./components/gameBoard.js";
import { solveBoggle } from "./components/solver.js";

const startNewBoggleGame = async (gridSize, timeLimit) => {
  console.log(`Grid Size: ${gridSize} | Time Limit: ${timeLimit}`);

  // Get the correct dice set based on the grid size, either standard, big, or super big
  const dice = DICE_SET_BY_GRID_SIZE[gridSize];

  if (!dice) throw new Error(`Unsupported grid size: ${gridSize}`);

  // Generate a new dice tray for the game using the determine dice set
  const tray = generateRandomBoggleTray(dice);

  console.log(tray);

  // Display it onto the game board
  displayBoggleGrid(tray);

  // Generate all possible solutions from the generated tray
  const possibleSolutions = await solveBoggle(tray);

  console.log(possibleSolutions);
};

setupSettingsControls(startNewBoggleGame);
