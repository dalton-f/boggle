import {
  GRID_CELL_BUTTON_CLASSES,
  GRID_CELL_CONTENT_CLASSES,
  SPECIAL_TILES,
  GRID_COLUMN_CLASSES,
} from "../utilities/constants.js";

/**
 * Renders the Boggle grid on the webpage by creating a 4x4, 5x5, or 6x6 layout of cells based on the provided grid data.
 *
 *
 * @function displayBoggleGrid
 * @param {string[][]} grid
 * @returns
 */
export const displayBoggleGrid = (grid) => {
  const gridContainer = document.getElementById("gameTray");

  if (!gridContainer) throw new Error(`Could not find gridContainer`);

  // Clear any previous grid or the default grid
  gridContainer.innerHTML = "";

  // Remove any previous grid column classes
  gridContainer.classList.remove(...Object.values(GRID_COLUMN_CLASSES));

  // Apply the correct grid columns Tailwind class based on grid size
  gridContainer.classList.add(GRID_COLUMN_CLASSES[grid.length]);

  if (!Array.isArray(grid) || grid.length === 0)
    throw new TypeError("Expected grid to be a non-empty 2D array of strings.");

  // Create a fragment for performance reasons
  const fragment = document.createDocumentFragment();

  // Loop over the full grid length generating the buttons for each letter
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      const value = row[j];

      // The actual letter characters are within a span for additional styles
      const button = document.createElement("button");
      button.classList.add(...GRID_CELL_BUTTON_CLASSES);

      const span = document.createElement("span");
      span.classList.add(...GRID_CELL_CONTENT_CLASSES);

      // Converts special tiles like qu into a capitalised version eg. Qu or An
      span.textContent = SPECIAL_TILES.includes(value)
        ? value[0].toUpperCase() + value.slice(1)
        : value.toUpperCase();

      button.appendChild(span);
      fragment.appendChild(button);
    }
  }

  // Append the built fragment to the grid
  gridContainer.appendChild(fragment);
};
