import { getLocalStorage } from "../../utils/getLocalStorage";

/**
 *
 * @param {string} key
 * @param {array} baseCategories
 * @returns Array of category objects
 */
export function getCategories(key, baseCategories) {
  const customCategories = getLocalStorage(key).map((el) => {
    return { name: el, colors: { light: "#f1f5f9", dark: "#334155" } };
  });
  const categories = baseCategories.concat(customCategories);

  return categories;
}
