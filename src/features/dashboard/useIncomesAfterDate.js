import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getIncomesAfterDate } from "../../services/apiIncomes";

export function useIncomesAfterDate() {
  const [searchParams] = useSearchParams();

  let numDays = searchParams.get("last") ? Number(searchParams.get("last")) : 7;

  const date = numDays ? subDays(new Date(), numDays).toISOString() : false;

  const { data: incomes, isLoading } = useQuery({
    queryFn: () => getIncomesAfterDate(date),
    queryKey: ["incomes", numDays],
  });

  return { incomes, isLoading };
}
