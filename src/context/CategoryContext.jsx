import { createContext, useContext } from "react";
import { useExpenses } from "../features/expenses/useExpenses";
import { useIncomes } from "../features/incomes/useIncomes";
import expenseCategoriesBase from "../data/expenseCategories.json";
import incomeCategoriesBase from "../data/incomeCategories.json";
import { getCategories } from "../features/categories/getCategories";
import { useSearchParams } from "react-router-dom";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [searchParams] = useSearchParams();

  const { expenses, isLoading: isLoadingExpenses } = useExpenses();
  const { incomes, isLoading: isLoadingIncomes } = useIncomes();

  const isLoading = isLoadingExpenses || isLoadingIncomes;

  const transactionType = searchParams.get("transactionType") || "expenses";
  const categories =
    transactionType === "expenses"
      ? getCategories("customExpenseCategories", expenseCategoriesBase)
      : getCategories("customIncomeCategories", incomeCategoriesBase);
  const data = transactionType === "expenses" ? expenses : incomes;
  const localStorageKey =
    transactionType === "expenses"
      ? "customExpenseCategories"
      : "customIncomeCategories";

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
