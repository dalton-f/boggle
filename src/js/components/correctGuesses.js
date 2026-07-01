const threeLetterCorrectGuessesRow = document.getElementById(
  "threeLetterCorrectGuessesRow",
);

const fourLetterCorrectGuessesRow = document.getElementById(
  "fourLetterCorrectGuessesRow",
);

const fiveLetterCorrectGuessesRow = document.getElementById(
  "fiveLetterCorrectGuessesRow",
);

const sixLetterCorrectGuessesRow = document.getElementById(
  "sixLetterCorrectGuessesRow",
);

const sevenLetterCorrectGuessesRow = document.getElementById(
  "sevenLetterCorrectGuessesRow",
);

/**
 * Row elements for correct guesses grouped by word length.
 * Keys represent word lengths (3–7), where 7 includes 7+ letter words.
 *
 * @type {Record<number, HTMLElement | null>}
 */
const correctGuessRowByLength = {
  3: threeLetterCorrectGuessesRow,
  4: fourLetterCorrectGuessesRow,
  5: fiveLetterCorrectGuessesRow,
  6: sixLetterCorrectGuessesRow,
  7: sevenLetterCorrectGuessesRow,
};

/**
 * Builds a DOM element representing a correctly guessed word.
 *
 * @param {string} word - The word to display. Must be a non-empty string
 * consisting of letters only (after trimming).
 *
 * @throws {TypeError} If `word` is not a string
 * @throws {Error} If `word` is empty after trimming
 *
 * @returns {HTMLDivElement} The styled word element
 */
const buildWordElement = (word) => {
  if (typeof word !== "string") {
    throw new TypeError(
      `buildWordElement expected a string, got ${typeof word}`,
    );
  }

  const trimmed = word.trim();

  if (!trimmed) {
    throw new Error("buildWordElement received an empty word");
  }

  const div = document.createElement("div");

  div.classList.add(
    "rounded-3xl",
    "border",
    "border-green-700",
    "bg-white",
    "px-3",
    "text-green-700",
    "uppercase",
  );

  div.innerText = trimmed;

  return div;
};

/**
 * Creates a UI element representing a guessed word and appends it
 * to the correct row based on word length.
 *
 * Words with length >= 7 are grouped into the 7-letter row.
 *
 * @param {string} guess - The correctly guessed word
 * @returns {void}
 */
export const updateCorrectGuessesUI = (guess) => {
  // Clamp 7+ to 7 as the all go into the same row anyway
  // eslint-disable-next-line no-magic-numbers
  const length = guess.length >= 7 ? 7 : guess.length;

  const parent = correctGuessRowByLength[length];

  const element = buildWordElement(guess);

  parent.appendChild(element);
};

export const clearCorrectGuessesUI = () => {
  threeLetterCorrectGuessesRow.innerHTML = "";
  fourLetterCorrectGuessesRow.innerHTML = "";
  fiveLetterCorrectGuessesRow.innerHTML = "";
  sixLetterCorrectGuessesRow.innerHTML = "";
  sevenLetterCorrectGuessesRow.innerHTML = "";
};
