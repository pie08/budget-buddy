import { useMutation, useQueryClient } from "react-query";
import { deleteBudget as deleteBudgetApi } from "../../services/apiBudgets";
import toast from "react-hot-toast";

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  const { mutate: deleteBudget, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["budgets"]);
      toast.success("Budget successfully deleted");
    },
    onError: (err) => {
      toast.error("Could not delete your budget");
    },
  });

  return { deleteBudget, isDeleting };
}
