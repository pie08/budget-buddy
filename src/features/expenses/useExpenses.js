import { useQuery } from "react-query";
import { getExpenses } from "../../services/apiExpenses";

export function useExpenses() {
  const {
    data: expenses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  return { expenses, isLoading, error };
}
