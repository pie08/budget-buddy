import { useQuery } from "react-query";
import { getIncomes } from "../../services/apiIncomes";

export function useIncomes() {
  const {
    data: incomes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes,
  });

  return { incomes, isLoading, error };
}
