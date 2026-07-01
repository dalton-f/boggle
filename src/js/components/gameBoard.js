/* eslint-disable no-magic-numbers */

import {
  GRID_CELL_BUTTON_CLASSES,
  GRID_CELL_CONTENT_CLASSES,
  SPECIAL_TILES,
  GRID_COLUMN_CLASSES,
} from "../utilities/constants.js";

const gameBoardParent = document.getElementById("gameBoardParent");

const buttons = [];

const selectionState = {
  isDragging: false,
  didDrag: false,
  selectedPath: [],
  isAnimating: false,
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
const isAdjacent = (a, b) => {
  if (!a || !b) throw new TypeError("Both tile arguments are required");

  if (
    !Number.isInteger(a.row) ||
    !Number.isInteger(a.col) ||
    !Number.isInteger(b.row) ||
    !Number.isInteger(b.col)
  )
    throw new TypeError("Tile coordinates must be integers");

  const sameTile = a.row === b.row && a.col === b.col;

  return (
    Math.abs(a.row - b.row) <= 1 && Math.abs(a.col - b.col) <= 1 && !sameTile
  );
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
const emitSelectionChange = () => {
  window.dispatchEvent(
    new CustomEvent("boggle-selection-change", {
      detail: [...selectionState.selectedPath],
    }),
  );
};

/**
 * Clears the entire current selection path and removes UI highlighting.
 *
 * @returns {void}
 */
const clearSelection = () => {
  selectionState.selectedPath.forEach(({ row, col }) => {
    buttons[row][col].firstElementChild?.removeAttribute("data-correct");
    buttons[row][col].firstElementChild?.removeAttribute("data-selected");
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
export const hightlightCorrectSelection = (path) => {
  // Add an isAnimating guard to fix a race condition when forcing clear selection at the end of a drag
  selectionState.isAnimating = true;

  for (const coordinate of path) {
    const { row, col } = coordinate;

    buttons[row][col].firstElementChild?.setAttribute("data-correct", "");
  }

  setTimeout(() => {
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
const selectTile = (row, col) => {
  if (selectionState.isAnimating) return;

  if (!Number.isInteger(row))
    throw new TypeError(`Expected row to be an integer, received: ${row}`);

  if (!Number.isInteger(col))
    throw new TypeError(`Expected col to be an integer, received: ${col}`);

  selectionState.selectedPath.push({ row, col });

  buttons[row][col].firstElementChild?.setAttribute("data-selected", "");

  emitSelectionChange();
};

/**
 * Removes the most recently selected tile from the selection path
 * and updates its visual state.
 *
 * @returns {void}
 */
const deselectTile = () => {
  const last = selectionState.selectedPath.pop();

  if (last)
    buttons[last.row][last.col].firstElementChild?.removeAttribute(
      "data-selected",
    );

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
const alreadySelected = (row, col) => {
  if (!Number.isInteger(row))
    throw new TypeError(`Expected row to be an integer, received: ${row}`);

  if (!Number.isInteger(col))
    throw new TypeError(`Expected col to be an integer, received: ${col}`);

  const path = selectionState.selectedPath;

  // Guard: nothing selected yet
  if (!path || path.length === 0) return false;

  return path.some((tile) => tile.row === row && tile.col === col);
};

/**
 * Handles selection of a tile in the grid.
 *
 * @param {number} row - Row index of the tile.
 * @param {number} col - Column index of the tile.
 * @returns {void}
 * @throws {TypeError} When row or col is not an integer.
 */
const handleSelect = (row, col) => {
  if (!Number.isInteger(row))
    throw new TypeError(`Expected row to be an integer, received: ${row}`);

  if (!Number.isInteger(col))
    throw new TypeError(`Expected col to be an integer, received: ${col}`);

  const last = selectionState.selectedPath.at(-1);

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
  const secondLast = selectionState.selectedPath.at(-2);

  if (
    secondLast &&
    secondLast.row === row &&
    secondLast.col === col &&
    selectionState.didDrag
  ) {
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
  if (!isAdjacent(last, { row, col })) {
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
const attachButtonListeners = (button, i, j) => {
  if (!(button instanceof HTMLButtonElement))
    throw new TypeError("Expected button to be an HTMLButtonElement.");

  if (!Number.isInteger(i)) throw new TypeError("Expected i to be an integer.");

  if (!Number.isInteger(j)) throw new TypeError("Expected j to be an integer.");

  button.addEventListener("click", (e) => {
    // Regular clicks are handled by pointer down, but this is needed to maintain keyboard accessibility
    if (e.detail !== 0) return;

    handleSelect(i, j);
  });

  // Click/tap starts selection
  button.addEventListener("pointerdown", (e) => {
    selectionState.isDragging = true;
    selectionState.didDrag = false;

    handleSelect(i, j);

    e.preventDefault();
  });

  // Dragging across tiles
  button.addEventListener("pointerenter", () => {
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

    buttons[i] = [];

    for (let j = 0; j < row.length; j++) {
      const value = row[j];

      // The actual letter characters are within a span for additional styles
      const button = document.createElement("button");
      button.classList.add(...GRID_CELL_BUTTON_CLASSES);

      // Add necessary event listeners to the button for the interactivity
      attachButtonListeners(button, i, j);

      const span = document.createElement("span");
      span.classList.add(...GRID_CELL_CONTENT_CLASSES);

      // Converts special tiles like qu into a capitalised version eg. Qu or An
      span.textContent = SPECIAL_TILES.includes(value)
        ? value[0].toUpperCase() + value.slice(1)
        : value.toUpperCase();

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
window.addEventListener("pointerup", () => {
  selectionState.isDragging = false;

  // Fully clear only if a drag has been stopped
  if (selectionState.didDrag && !selectionState.isAnimating) clearSelection();
});
