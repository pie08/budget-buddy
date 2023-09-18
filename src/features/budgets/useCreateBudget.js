import { useMutation, useQueryClient } from "react-query";
import { createBudget as createBudgetApi } from "../../services/apiBudgets";
import toast from "react-hot-toast";

export function useCreateBudget() {
  const queryClient = useQueryClient();

  const { mutate: createBudget, isLoading: isCreating } = useMutation({
    mutationFn: createBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries("budgets");
      toast.success("Budget successfully created");
    },
    onError: (err) => {
      toast.error("Could not create your budget");
    },
  });

  return { createBudget, isCreating };
}
