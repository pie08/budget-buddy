import { useMutation, useQueryClient } from "react-query";
import { createIncome as createIncomeApi } from "../../services/apiIncomes";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";

export function useCreateIncome() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: createIncome, isLoading: isCreating } = useMutation({
    mutationFn: (newIncome) =>
      createIncomeApi({ ...newIncome, user_id: user.id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["incomes"]);
      toast.success("Income created successfully");
    },
    onError: (err) => {
      toast.error("Could not create your income");
    },
  });

  return { createIncome, isCreating };
}
