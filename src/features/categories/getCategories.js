import { getLocalStorage } from "../../utils/getLocalStorage";
import expenseCategories from "../../data/expenseCategories.json";
import incomeCategories from "../../data/incomeCategories.json";
import {
  customExpenseCategoriesKey,
  customIncomeCategoriesKey,
} from "../../utils/constants";

/**
 *
 * @param {string} category type
 * @returns Array of category objects
 */
export function getCategories(type) {
  const isTypeExpense = type.toLowerCase() === "expense";
  // picking the correct local storage key for the category type
  const localStorageKey = isTypeExpense
    ? customExpenseCategoriesKey
    : customIncomeCategoriesKey;

  // getting custom categories from local storage using the local storage key and formatting the data within the local storage array
  const customCategories = getLocalStorage(localStorageKey).map((el) => {
    return { name: el, colors: { light: "#f1f5f9", dark: "#334155" } };
  });
  // base categories
  const categories = isTypeExpense ? expenseCategories : incomeCategories;

  return categories.concat(customCategories);
}
