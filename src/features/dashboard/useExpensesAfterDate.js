import { useQuery } from "react-query";
import { getExpensesAfterDate } from "../../services/apiExpenses";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useExpensesAfterDate() {
  const [searchParams] = useSearchParams();

  let numDays = searchParams.get("last") ? Number(searchParams.get("last")) : 7;

  // date can be false
  const date = numDays ? subDays(new Date(), numDays).toISOString() : false;

  const { data: expenses, isLoading } = useQuery({
    queryFn: () => getExpensesAfterDate(date),
    queryKey: ["expenses", numDays],
  });

  return { expenses, isLoading };
}
