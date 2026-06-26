/* eslint-disable no-magic-numbers */

/**
 * Standard 4×4 Boggle dice introduced in 2012.
 *
 * Each inner array represents one six-sided die. Some faces contain
 * multi-letter combinations (e.g. "qu", "th", "er") that occupy a
 * single board cell.
 *
 * @constant {string[][]}
 */
export const BOGGLE_DICE = [
  ["a", "a", "e", "e", "g", "n"],
  ["a", "b", "b", "j", "o", "o"],
  ["a", "c", "h", "o", "p", "s"],
  ["a", "f", "f", "k", "p", "s"],
  ["a", "o", "o", "t", "t", "w"],
  ["c", "i", "m", "o", "t", "u"],
  ["d", "e", "i", "l", "r", "x"],
  ["d", "e", "l", "r", "v", "y"],
  ["d", "i", "s", "t", "t", "y"],
  ["e", "e", "g", "h", "n", "w"],
  ["e", "e", "i", "n", "s", "u"],
  ["e", "h", "r", "t", "v", "w"],
  ["e", "i", "o", "s", "s", "t"],
  ["e", "l", "r", "t", "t", "y"],
  ["h", "i", "m", "n", "qu", "u"],
  ["h", "l", "n", "n", "r", "z"],
];

/**
 * Standard 5×5 Big Boggle dice introduced in 2012.
 *
 * Each inner array represents one six-sided die. Some faces contain
 * multi-letter combinations (e.g. "qu", "th", "er") that occupy a
 * single board cell.
 *
 * @constant {string[][]}
 */
export const BOGGLE_BIG_DICE = [
  ["a", "a", "a", "f", "r", "s"],
  ["a", "a", "e", "e", "e", "e"],
  ["a", "a", "f", "i", "r", "s"],
  ["a", "d", "e", "n", "n", "n"],
  ["a", "e", "e", "e", "e", "m"],
  ["a", "e", "e", "g", "m", "u"],
  ["a", "e", "g", "m", "n", "n"],
  ["a", "f", "i", "r", "s", "y"],
  ["b", "b", "j", "k", "x", "z"],
  ["c", "c", "e", "n", "s", "t"],
  ["e", "i", "i", "l", "s", "t"],
  ["c", "e", "i", "p", "s", "t"],
  ["d", "d", "h", "n", "o", "t"],
  ["d", "h", "h", "l", "o", "r"],
  ["d", "h", "h", "n", "o", "w"],
  ["d", "h", "l", "n", "o", "r"],
  ["e", "i", "i", "i", "t", "t"],
  ["e", "i", "l", "p", "s", "t"],
  ["e", "m", "o", "t", "t", "t"],
  ["e", "n", "s", "s", "s", "u"],
  ["an", "er", "he", "in", "qu", "th"],
  ["g", "o", "r", "r", "v", "w"],
  ["i", "p", "r", "s", "y", "y"],
  ["n", "o", "o", "t", "u", "w"],
  ["o", "o", "o", "t", "t", "u"],
];

/**
 * Standard 6×6 Super Big Boggle dice.
 *
 * Each inner array represents one six-sided die. Some faces contain
 * multi-letter combinations or blank faces ("-"), matching the
 * official Super Big Boggle dice set.
 *
 * @constant {string[][]}
 */
export const BOGGLE_SUPER_BIG_DICE = [
  ["a", "a", "a", "f", "r", "s"],
  ["a", "a", "e", "e", "e", "e"],
  ["a", "a", "e", "e", "o", "o"],
  ["a", "a", "f", "i", "r", "s"],
  ["a", "b", "d", "e", "i", "o"],
  ["a", "d", "e", "n", "n", "n"],
  ["a", "e", "e", "e", "e", "m"],
  ["a", "e", "e", "g", "m", "u"],
  ["a", "e", "g", "m", "n", "n"],
  ["a", "e", "i", "l", "m", "n"],
  ["a", "e", "i", "n", "o", "u"],
  ["a", "f", "i", "r", "s", "y"],
  ["an", "er", "he", "in", "qu", "th"],
  ["b", "b", "j", "k", "x", "z"],
  ["c", "c", "e", "n", "s", "t"],
  ["c", "d", "d", "l", "n", "n"],
  ["c", "e", "i", "i", "t", "t"],
  ["c", "e", "i", "p", "s", "t"],
  ["c", "f", "g", "n", "u", "y"],
  ["d", "d", "h", "n", "o", "t"],
  ["d", "h", "h", "l", "o", "r"],
  ["d", "h", "h", "n", "o", "w"],
  ["d", "h", "l", "n", "o", "r"],
  ["e", "h", "i", "l", "r", "s"],
  ["e", "i", "i", "l", "s", "t"],
  ["e", "i", "l", "p", "s", "t"],
  ["e", "i", "o", "-", "-", "-"],
  ["e", "m", "t", "t", "t", "o"],
  ["e", "n", "s", "s", "s", "u"],
  ["g", "o", "r", "r", "v", "w"],
  ["h", "i", "r", "s", "t", "v"],
  ["h", "o", "p", "r", "s", "t"],
  ["i", "p", "r", "s", "y", "y"],
  ["j", "k", "qu", "w", "x", "z"],
  ["n", "o", "o", "t", "u", "w"],
  ["o", "o", "o", "t", "t", "u"],
];

/**
 * Maps a grid size to the corresponding official Boggle dice set.
 *
 * @constant {Object.<string, string[][]>}
 */
export const DICE_SET_BY_GRID_SIZE = {
  "4x4": BOGGLE_DICE,
  "5x5": BOGGLE_BIG_DICE,
  "6x6": BOGGLE_SUPER_BIG_DICE,
};

/**
 * Tailwind CSS classes applied to each interactive grid cell button.
 *
 * @constant {string[]}
 */
export const GRID_CELL_BUTTON_CLASSES = [
  "xs:text-2xl",
  "grid",
  "cursor-pointer",
  "place-items-center",
  "rounded-lg",
  "bg-gray-300",
  "p-1.25",
  "text-xl",
  "aspect-square",
  "font-bold",
  "sm:text-3xl",
  "md:text-4xl",
];

/**
 * Tailwind CSS classes applied to the element displaying the
 * letter(s) inside each grid cell.
 *
 * @constant {string[]}
 */
export const GRID_CELL_CONTENT_CLASSES = [
  "grid",
  "aspect-square",
  "w-15",
  "place-items-center",
  "rounded-full",
  "bg-white",
  "transition-colors",
  "duration-100",
  "ease-linear",
];

/**
 * Relative offsets for all eight adjacent directions
 * (horizontal, vertical, and diagonal).
 *
 * Used when traversing neighbouring cells during word searches.
 *
 * @constant {number[][]}
 */
export const ADJACENT_DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

/**
 * Minimum number of letters required for a valid Boggle word.
 *
 * @constant {number}
 */
export const MIN_WORD_LENGTH = 3;

/**
 * Multi-letter tile combinations that should be treated as a single tile
 * on the game board (e.g. common digraphs and letter pairs).
 * @constant {string[]}
 */
export const SPECIAL_TILES = ["qu", "an", "er", "he", "in", "th"];

/**
 * Maps a board size to the corresponding Tailwind CSS grid column classes.
 * Used to set the correct number of columns and tile widths for the grid.
 *
 * @constant {Object.<number, string>}
 */
export const GRID_COLUMN_CLASSES = {
  4: "md:grid-cols-[repeat(4,_74px)]",
  5: "md:grid-cols-[repeat(5,_74px)]",
  6: "md:grid-cols-[repeat(6,_74px)]",
};

/**
 * Valid sizes for the Boggle Dice tray grid
 *
 * @constant {number[]}
 */
export const VALID_GRID_SIZES = [16, 25, 36];

/**
 * Path to the default dictionary file used for Boggle word validation.
 * The file contains words from the Official Scrabble Players Dictionary (OSPD4).
 * @constant {string}
 */
export const DEFAULT_DICTIONARY_PATH = "static/data/ospd4.txt";
