import { useQuery } from "react-query";
import { getBudgetById } from "../../services/apiBudgets";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { id } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryFn: () => getBudgetById(id),
    queryKey: ["booking", id],
  });

  return { booking, isLoading };
}
