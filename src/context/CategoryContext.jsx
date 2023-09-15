import { createContext, useContext, useState } from "react";
import { useExpenses } from "../features/expenses/useExpenses";
import { useIncomes } from "../features/incomes/useIncomes";
import expenseCategoriesBase from "../data/expenseCategories.json";
import incomeCategoriesBase from "../data/incomeCategories.json";
import { getCategories } from "../features/categories/getCategories";
import { useDeleteExpense } from "../features/expenses/useDeleteExpense";
import { useDeleteIncome } from "../features/incomes/useDeleteIncome";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
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

  const [selectedData, setSelectedData] = useState("expenses");
  const categories =
    selectedData === "expenses"
      ? getCategories("customExpenseCategories", expenseCategoriesBase)
      : getCategories("customIncomeCategories", incomeCategoriesBase);
  const data = selectedData === "expenses" ? expenses : incomes;
  const count = selectedData === "expenses" ? countExpense : countIncome;
  const localStorageKey =
    selectedData === "expenses"
      ? "customExpenseCategories"
      : "customIncomeCategories";
  const deleteTransaction =
    selectedData === "expenses" ? deleteExpense : deleteIncome;

  return (
    <CategoryContext.Provider
      value={{
        data,
        categories,
        selectedData,
        setSelectedData,
        isLoading,
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
