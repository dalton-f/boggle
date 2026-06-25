/* eslint-disable no-magic-numbers */

import {
  MIN_WORD_LENGTH,
  ADJACENT_DIRECTIONS,
  DEFAULT_DICTIONARY_PATH,
} from "../utilities/constants.js";

import { Trie } from "@datastructures-js/trie";

/**
 * Loads dictionary words from a text file.
 *
 * @async
 * @function loadDictionaryFromFile
 * @param {string} filePath The path of the dictionary text file
 * @returns {Promise<string[]>} Array of dictionary words
 */
const loadDictionaryFromFile = async (filePath = DEFAULT_DICTIONARY_PATH) => {
  if (typeof filePath !== "string") {
    throw new TypeError(
      `Expected filePath to be a string, received ${typeof filePath}.`,
    );
  }

  const response = await fetch(filePath);
  const text = await response.text();

  return text.split("\n");
};

/**
 * Loads the dictionary from disk and constructs a Trie for efficient
 * word and prefix lookups.
 *
 * @async
 * @function getDictionaryTrie
 * @returns {Promise<Trie>} A Promise that resolves to the dictionary Trie.
 */
const getDictionaryTrie = async () => {
  // Convert the dictionary.txt file into an array of words
  const dictionary = await loadDictionaryFromFile();
  // Use the data-structures Trie .fromArray method to build a Trie quickly for the prefix lookups
  const dictionaryTrie = Trie.fromArray(dictionary);

  return dictionaryTrie;
};

/**
 * Solves the Boggle board by finding all valid dictionary words.
 *
 * Uses DFS backtracking combined with Trie prefix pruning for efficiency.
 *
 * @async
 * @function solveBoggle
 * @param {string[][]} grid - 2D character grid representing the Boggle board
 * @returns {Promise<Set<string>>} A Promise that resolves to the set of all valid words found in the grid.
 */
export const solveBoggle = async (grid) => {
  const dictionaryTrie = await getDictionaryTrie();

  const results = new Set();

  if (!Array.isArray(grid) || grid.length === 0)
    throw new TypeError("Expected grid to be a non-empty 2D array of strings.");

  const rows = grid.length;
  const cols = grid[0].length;

  /**
   * Depth-first search helper to explore all valid paths from a cell.
   *
   * @param {number} r - Current row index
   * @param {number} c - Current column index
   * @param {boolean[][]} visited - Tracks visited cells in current path
   * @param {string} path - Current constructed word
   */
  const exploreWordPaths = (r, c, visited, path) => {
    path += grid[r][c];

    visited[r][c] = true;

    if (!dictionaryTrie.hasPrefix(path)) {
      visited[r][c] = false;
      return;
    }

    if (path.length >= MIN_WORD_LENGTH && dictionaryTrie.has(path))
      results.add(path);

    for (const [dr, dc] of ADJACENT_DIRECTIONS) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr][nc])
        continue;

      exploreWordPaths(nr, nc, visited, path);
    }

    visited[r][c] = false;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const visited = Array.from({ length: rows }, () =>
        Array(cols).fill(false),
      );

      exploreWordPaths(i, j, visited, "");
    }
  }

  return results;
};
