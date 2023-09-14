import { useExpenses } from "../expenses/useExpenses";

export function useExpensesFromCategory(category) {
  const { expenses, isLoading } = useExpenses();

  return {
    expenses: expenses?.filter((expense) => expense.category === category),
    isLoading,
  };
}
