import { useQuery } from "react-query";
import { getBudgets } from "../../services/apiBudgets";

export function useBudgets() {
  const {
    data: { data: budgets, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  return { budgets, count, isLoading, error };
}
