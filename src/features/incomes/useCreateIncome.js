import { useMutation, useQueryClient } from "react-query";
import { createIncome as createIncomeApi } from "../../services/apiIncomes";
import toast from "react-hot-toast";

export function useCreateIncome() {
  const queryClient = useQueryClient();

  const { mutate: createIncome, isLoading: isCreating } = useMutation({
    mutationFn: createIncomeApi,
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
