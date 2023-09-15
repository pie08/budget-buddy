import { useQuery } from "react-query";
import { getIncomes } from "../../services/apiIncomes";
import { useSearchParams } from "react-router-dom";

export function useIncomes({ paginate = false } = {}) {
  const [searchParams] = useSearchParams();

  // pagination
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // filter
  const filterValue = searchParams.get("category") || "all";
  const filter =
    filterValue === "all" ? null : { field: "category", value: filterValue };

  // sorting
  const sortByRaw = searchParams.get("sortBy") || "created_at-asc";
  const [sortByField, sortByDirection] = sortByRaw.split("-");
  const sortBy = { field: sortByField, isAscending: sortByDirection === "asc" };

  const {
    data: { incomes, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["incomes", page, paginate, filter, sortBy],
    queryFn: () => getIncomes({ page: paginate ? page : 0, filter, sortBy }),
  });

  return { incomes, isLoading, error, count };
}
