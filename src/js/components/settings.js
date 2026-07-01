const settingsForm = document.getElementById("settingsForm");

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

/**
 * Attaches increment and decrement button handlers to a select element.
 * Clicking the decrease button selects the previous option, while clicking
 * the increase button selects the next option. The selection is clamped
 * to the first and last available options.
 *
 * @param {HTMLButtonElement} decreaseButton - Button that selects the previous option.
 * @param {HTMLButtonElement} increaseButton - Button that selects the next option.
 * @param {HTMLSelectElement} select - The select element to control.
 * @returns {void}
 * @throws {TypeError} If decreaseButton or increaseButton are not found.
 * @throws {TypeError} If select is not found.
 */
const setupSelectorControls = (decreaseButton, increaseButton, select) => {
  if (!decreaseButton || !(decreaseButton instanceof HTMLButtonElement))
    throw new TypeError(
      "Decrease button element not found or not HTMLButtonElement.",
    );

  if (!increaseButton || !(increaseButton instanceof HTMLButtonElement))
    throw new TypeError(
      "Increase button element not found or not HTMLButtonElement.",
    );

  if (!select || !(select instanceof HTMLSelectElement))
    throw new TypeError("Select element not found or not HTMLSelectElement.");

  // Any "decrease" button linked to a select element will have to decrement the selected index
  decreaseButton.addEventListener("click", () => {
    // In other cases, we may want the buttons to loop the index round, but since we have both an increase and decrease button
    // we don't want it to loop
    if (select.selectedIndex > 0) select.selectedIndex--;
  });

  // Same as above, prevent looping and ensure all increaseButtons increase the selectedIndex
  increaseButton.addEventListener("click", () => {
    if (select.selectedIndex < select.options.length - 1)
      select.selectedIndex++;
  });
};

/**
 * Initializes the settings UI controls and wires up the form submission
 * to start a new Boggle game using the selected grid size and time limit.
 *
 * @param {(gridSize: string, timeLimit: string) => void} startNewBoggleGame
 *   Callback invoked when the settings form is submitted.
 *   Receives the selected grid size and time limit values.
 * @returns {void}
 * @throws {TypeError} If startNewBoggleGame is not a function.
 */
export const setupSettingsControls = (startNewBoggleGame) => {
  if (typeof startNewBoggleGame !== "function") {
    throw new TypeError(
      "setupSettingsControls expected startNewBoggleGame to be a function.",
    );
  }

  // Makes sure both the time limit and grid size selectors are working correctly
  // by attaching all the correct event listeners

  // Only allow changing the grid size on wider windows tha allow it
  // TODO: Possibly add disabled styles to make this more clear
  if (window.innerWidth >= 768) {
    setupSelectorControls(
      gridSizeDecreaseButton,
      gridSizeIncreaseButton,
      gridSizeSelector,
    );
  }

  setupSelectorControls(
    timeLimitDecreaseButton,
    timeLimitIncreaseButton,
    timeLimitSelector,
  );

  // Connect the actual settings form submit button to starting a new boggle game with the corresponding settings
  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    startNewBoggleGame(gridSizeSelector.value, timeLimitSelector.value);
  });
};
