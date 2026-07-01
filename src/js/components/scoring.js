/* eslint-disable no-magic-numbers */

const pointsCounterElement = document.getElementById("pointsCounterElement");

/**
 * Calculates the number of points awarded for a word based on its length.
 *
 * Word lengths 0–4 award 1 point, length 5 awards 2 points,
 * length 6 awards 3 points, length 7 awards 5 points,
 * and any word longer than 7 characters awards 11 points.
 *
 * @param {number} length - The length of the word.
 * @returns {number} The number of points awarded.
 */
export const getPointsForWord = (length) => {
  // Length of words maps to index of the array to get correct points
  const scores = [1, 1, 1, 1, 1, 2, 3, 5];

  // Any word with a length >= 8 gets 11 points
  return scores[length] ?? 11;
};

/**
 * Updates the points counter displayed in the UI and briefly
 * applies a pop animation to indicate the score has changed.
 *
 * @param {number} points - The player's current score.
 * @returns {void}
 */
export const updatePointsUI = (points) => {
  pointsCounterElement.textContent = points;

  // Slight animation stuff
  pointsCounterElement.classList.add("scale-125");

  setTimeout(() => {
    pointsCounterElement.classList.remove("scale-125");
  }, 150);
};
