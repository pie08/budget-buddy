import { useQuery } from "react-query";
import { getBudgetById } from "../../services/apiBudgets";
import { useParams } from "react-router-dom";

export function useBudget() {
  const { id } = useParams();

  const { data: budget, isLoading } = useQuery({
    queryFn: () => getBudgetById(id),
    queryKey: ["budget", id],
  });

  return { budget, isLoading };
}
