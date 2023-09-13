import { useQuery } from "react-query";
import { getIncomes } from "../../services/apiIncomes";
import { useSearchParams } from "react-router-dom";

export function useIncomes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    data: { data: incomes, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["incomes", page],
    queryFn: () => getIncomes({ page }),
  });

  return { incomes, isLoading, error, count };
}
