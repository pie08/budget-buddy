import { createContext, useContext } from "react";
// import { useExpenses } from "../features/expenses/useExpenses";
// import { useIncomes } from "../features/incomes/useIncomes";
import { getCategories } from "../features/categories/getCategories";
import { useSearchParams } from "react-router-dom";
import {
  CUSTOM_EXPENSE_CATEGORIES_KEY,
  CUSTOM_INCOME_CATEGORIES_KEY,
} from "../utils/constants";
import { useExpensesAfterDate } from "../features/dashboard/useExpensesAfterDate";
import { useIncomesAfterDate } from "../features/dashboard/useIncomesAfterDate";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [searchParams] = useSearchParams();
  const transactionType = searchParams.get("transactionType") || "expenses";

  const { expenses, isLoading: isLoadingExpenses } =
    useExpensesAfterDate("all");
  const { incomes, isLoading: isLoadingIncomes } = useIncomesAfterDate("all");

  const isLoading = isLoadingExpenses || isLoadingIncomes;

  // get data based on what the transactionType is
  const categories =
    transactionType === "expenses"
      ? getCategories("expense")
      : getCategories("income");
  const data = transactionType === "expenses" ? expenses : incomes;
  const localStorageKey =
    transactionType === "expenses"
      ? CUSTOM_EXPENSE_CATEGORIES_KEY
      : CUSTOM_INCOME_CATEGORIES_KEY;

  return (
    <CategoryContext.Provider
      value={{
        data,
        categories,
        isLoading,
        transactionType,
        localStorageKey,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined)
    throw new Error("Category context used outside of provider");
  return context;
}
