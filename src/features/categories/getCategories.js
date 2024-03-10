import { getLocalStorage } from "../../utils/getLocalStorage";
import expenseCategories from "../../data/expenseCategories.json";
import incomeCategories from "../../data/incomeCategories.json";
import {
  CUSTOM_EXPENSE_CATEGORIES_KEY,
  CUSTOM_INCOME_CATEGORIES_KEY,
} from "../../utils/constants";

/**
 *
 * @param {string} category type
 * @returns Array of category objects including custom categories
 */
export function getCategories(type) {
  const isTypeExpense = type.toLowerCase() === "expense";
  // picking the correct local storage key for the category type
  const localStorageKey = isTypeExpense
    ? CUSTOM_EXPENSE_CATEGORIES_KEY
    : CUSTOM_INCOME_CATEGORIES_KEY;

  // getting custom categories from local storage using the local storage key and formatting the data within the local storage array
  const customCategories = getLocalStorage(localStorageKey).map((el) => {
    return { name: el, colors: { light: "#f1f5f9", dark: "#334155" } };
  });
  // base categories
  const categories = isTypeExpense ? expenseCategories : incomeCategories;

  return categories.concat(customCategories);
}
