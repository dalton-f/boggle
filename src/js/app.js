/* eslint-disable no-magic-numbers */

import { DICE_SET_BY_GRID_SIZE } from "./utilities/constants.js";

import { setupSettingsControls } from "./components/settings.js";
import { generateRandomBoggleTray } from "./components/trayGenerator.js";
import { displayBoggleGrid } from "./components/gameBoard.js";
import { solveBoggle } from "./components/solver.js";

const startNewBoggleGame = async (gridSize, timeLimit) => {
  console.log(`Grid Size: ${gridSize} | Time Limit: ${timeLimit}`);

  const dice = DICE_SET_BY_GRID_SIZE[gridSize];

  if (!dice) throw new Error(`Unsupported grid size: ${gridSize}`);

  const tray = generateRandomBoggleTray(dice);

  console.log(tray);

  displayBoggleGrid(tray);

  const possibleSolutions = await solveBoggle(tray);

  console.log(possibleSolutions);
};

setupSettingsControls(startNewBoggleGame);
