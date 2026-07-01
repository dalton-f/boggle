/* eslint-disable no-magic-numbers */

const timerElement = document.getElementById("timerElement");
const gameTray = document.getElementById("gameTray");

let countdownTimer;
let remainingSeconds = 0;

/**
 * Starts a countdown timer.
 *
 * If another timer is already running, it is stopped before starting
 * the new one.
 *
 * @param {number} minutes - Number of minutes to count down from.
 * @returns {void}
 * @throws {TypeError} If input is not a positive number
 */
export const startTimer = (minutes) => {
  if (minutes < 0) throw new TypeError("Minutes must be a positive number.");

  gameTray.classList.remove("opacity-50", "pointer-events-none");

  // Clear any previous timer
  clearInterval(countdownTimer);

  remainingSeconds = minutes * 60;

  // Update the display
  updateTimerDisplay();

  // Create the new timer to countdown in seconds
  countdownTimer = setInterval(() => {
    remainingSeconds--;

    // Stop the timer once it runs out
    if (remainingSeconds <= 0) {
      remainingSeconds = 0;

      updateTimerDisplay();

      clearInterval(countdownTimer);

      timerElement.textContent = "Time's up!";
      gameTray.classList.add("opacity-50", "pointer-events-none");

      return;
    }

    // Update the display
    updateTimerDisplay();
  }, 1000);
};

/**
 * Updates the timer text displayed in the UI.
 *
 * @returns {void}
 */
const updateTimerDisplay = () => {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  timerElement.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
