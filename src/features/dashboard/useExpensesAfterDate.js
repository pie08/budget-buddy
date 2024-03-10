import { useQuery } from "react-query";
import { getExpensesAfterDate } from "../../services/apiExpenses";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

/**
 * Get all expenses after a date
 */
export function useExpensesAfterDate(defaultNumDays = 7) {
  const [searchParams] = useSearchParams();

  let numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : Number(defaultNumDays);

  // date can be false because if last value is "all" than numDays with be NaN which is falsy and getExxpensesAfterDate will fetch all expenses
  const date = numDays ? subDays(new Date(), numDays).toISOString() : false;

  const { data: expenses, isLoading } = useQuery({
    queryFn: () => getExpensesAfterDate(date),
    queryKey: ["expenses", numDays],
  });

  return { expenses, isLoading };
}
