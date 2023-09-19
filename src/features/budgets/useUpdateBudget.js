import { useMutation, useQueryClient } from "react-query";
import { updateBudget as updateBudgetApi } from "../../services/apiBudgets";
import toast from "react-hot-toast";

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  const { mutate: updateBudget, isLoading: isUpdating } = useMutation({
    mutationFn: updateBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["budgets"]);
      toast.success("budgets");
    },
    onError: (err) => {
      toast.error("Could not update your budget");
    },
  });

  return { updateBudget, isUpdating };
}
