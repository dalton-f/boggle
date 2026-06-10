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
