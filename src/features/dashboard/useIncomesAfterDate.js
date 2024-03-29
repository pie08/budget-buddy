import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getIncomesAfterDate } from "../../services/apiIncomes";

/**
 * Get all incomes after a date
 */
export function useIncomesAfterDate(defaultNumDays = 7) {
  const [searchParams] = useSearchParams();

  let numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : Number(defaultNumDays);

  const date = numDays ? subDays(new Date(), numDays).toISOString() : false;

  const { data: incomes, isLoading } = useQuery({
    queryFn: () => getIncomesAfterDate(date),
    queryKey: ["incomes", numDays],
  });

  return { incomes, isLoading };
}
