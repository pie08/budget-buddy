import { useState, useEffect } from "react";

/**
 * Store data in localstorage to state variable
 * @param {string} initialState - Initial state for local storage if not present
 * @param {string} key - Local storage key
 * @returns {array} [value, setValue]
 */
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
