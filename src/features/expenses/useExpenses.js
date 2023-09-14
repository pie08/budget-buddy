import { useQuery } from "react-query";
import { getExpenses } from "../../services/apiExpenses";
import { useSearchParams } from "react-router-dom";

export function useExpenses({ paginate = true } = {}) {
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
    data: { expenses, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses", page, filter, sortBy],
    queryFn: () => getExpenses({ page: paginate ? page : 0, filter, sortBy }),
  });

  return { expenses, isLoading, error, count };
}
