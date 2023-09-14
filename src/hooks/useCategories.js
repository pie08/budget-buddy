import { getLocalStorage } from "../utils/getLocalStorage";
import expenseCategoryData from "../data/expenseCategories.json";
import incomeCategoryData from "../data/incomeCategories.json";

export function useCategories(version) {
  const customCategories = getLocalStorage("customExpenseCategories").map(
    (el) => {
      return { name: el, colors: { light: "#f1f5f9", dark: "#334155" } };
    }
  );
  const categories = expenseCategoryData.concat(customCategories);

  return categories;
}
