import { createContext, useContext } from "react";
import { useExpenses } from "../features/expenses/useExpenses";
import { useIncomes } from "../features/incomes/useIncomes";
import { getCategories } from "../features/categories/getCategories";
import { useSearchParams } from "react-router-dom";
import {
  customExpenseCategoriesKey,
  customIncomeCategoriesKey,
} from "../utils/constants";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [searchParams] = useSearchParams();

  const { expenses, isLoading: isLoadingExpenses } = useExpenses();
  const { incomes, isLoading: isLoadingIncomes } = useIncomes();

  const isLoading = isLoadingExpenses || isLoadingIncomes;

  const transactionType = searchParams.get("transactionType") || "expenses";

  // get data based on what the transactionType is
  const categories =
    transactionType === "expenses"
      ? getCategories("expense")
      : getCategories("income");
  const data = transactionType === "expenses" ? expenses : incomes;
  const localStorageKey =
    transactionType === "expenses"
      ? customExpenseCategoriesKey
      : customIncomeCategoriesKey;

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
