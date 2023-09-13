import { useQuery } from "react-query";
import { getExpenses } from "../../services/apiExpenses";
import { useSearchParams } from "react-router-dom";

export function useExpenses({ paginate = true } = {}) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    data: { expenses, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses", page],
    queryFn: () => getExpenses({ page: paginate ? page : 0 }),
  });

  return { expenses, isLoading, error, count };
}
