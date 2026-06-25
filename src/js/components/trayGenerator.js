/* eslint-disable no-magic-numbers */

import { VALID_GRID_SIZES } from "../utilities/constants.js";

/**
 * Generates a random Boggle tray by rolling the provided dice.
 * Each die is rolled to select a random letter, and the resulting letters are shuffled to create a 4x4, 5x5, or 6x6 grid.
 * Note: The function assumes that the input dice array contains exactly 16, 25, or 36 dice, each with 6 faces.
 *
 * @function generateRandomBoggleTray
 * @param {string[][]} dice - Array of 16, 25, or 36 dice, each die is an array of 6 letters
 * @returns {string[][]} 4x4, 5x5, or 6x6 grid of letters representing the Boggle tray
 */
export const generateRandomBoggleTray = (dice) => {
  const grid = [];

  if (!Array.isArray(dice) || dice.length === 0)
    throw new TypeError("Expected dice to be a non-empty 2D array of strings.");

  // Dice.length shouldn't be an invalid grid size, but check anyway
  if (!VALID_GRID_SIZES.includes(dice.length)) return grid;

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
