import { useMutation, useQueryClient } from "react-query";
import { createBudget as createBudgetApi } from "../../services/apiBudgets";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";

export function useCreateBudget() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: createBudget, isLoading: isCreating } = useMutation({
    mutationFn: (newBudget) =>
      createBudgetApi({ ...newBudget, user_id: user.id }),
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
