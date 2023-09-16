import { createContext, useContext } from "react";
import { useExpenses } from "../features/expenses/useExpenses";
import { useIncomes } from "../features/incomes/useIncomes";
import expenseCategoriesBase from "../data/expenseCategories.json";
import incomeCategoriesBase from "../data/incomeCategories.json";
import { getCategories } from "../features/categories/getCategories";
import { useDeleteExpense } from "../features/expenses/useDeleteExpense";
import { useDeleteIncome } from "../features/incomes/useDeleteIncome";
import { useSearchParams } from "react-router-dom";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [searchParams] = useSearchParams();

  const {
    expenses,
    isLoading: isLoadingExpenses,
    count: countExpense,
  } = useExpenses();
  const {
    incomes,
    isLoading: isLoadingIncomes,
    count: countIncome,
  } = useIncomes();
  const { deleteExpense } = useDeleteExpense();
  const { deleteIncome } = useDeleteIncome();
  const isLoading = isLoadingExpenses || isLoadingIncomes;

  const transactionType = searchParams.get("transactionType") || "expenses";
  const categories =
    transactionType === "expenses"
      ? getCategories("customExpenseCategories", expenseCategoriesBase)
      : getCategories("customIncomeCategories", incomeCategoriesBase);
  const data = transactionType === "expenses" ? expenses : incomes;
  const count = transactionType === "expenses" ? countExpense : countIncome;
  const localStorageKey =
    transactionType === "expenses"
      ? "customExpenseCategories"
      : "customIncomeCategories";
  const deleteTransaction =
    transactionType === "expenses" ? deleteExpense : deleteIncome;

  return (
    <CategoryContext.Provider
      value={{
        data,
        categories,
        isLoading,
        transactionType,
        deleteTransaction,
        count,
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
