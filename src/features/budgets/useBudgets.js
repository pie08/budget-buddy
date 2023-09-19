import { useQuery } from "react-query";
import { getBudgets } from "../../services/apiBudgets";
import { useSearchParams } from "react-router-dom";

export function useBudgets({ paginate = false } = {}) {
  const [searchParams] = useSearchParams();

  // paginate
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // filtering
  const filterValue = searchParams.get("status") || "all";
  let filter;
  if (filterValue === "all") filter = null;
  if (filterValue === "active") {
    filter = [
      {
        field: "endDate",
        value: new Date().toISOString().split("T")[0],
        method: "gte",
      },
      {
        field: "startDate",
        value: new Date().toISOString().split("T")[0],
        method: "lte",
      },
    ];
  }
  if (filterValue === "completed") {
    filter = {
      field: "endDate",
      value: new Date().toISOString().split("T")[0],
      method: "lt",
    };
  }
  if (filterValue === "waiting") {
    filter = {
      field: "startDate",
      value: new Date().toISOString().split("T")[0],
      method: "gt",
    };
  }

  const {
    data: { data: budgets, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budgets", page, filter],
    queryFn: () => getBudgets({ page: paginate ? page : 0, filter }),
  });

  return { budgets, count, isLoading, error };
}
