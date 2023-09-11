import { useMutation, useQueryClient } from "react-query";
import { updateIncome as updateIncomeApi } from "../../services/apiIncomes";
import toast from "react-hot-toast";

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  const { mutate: updateIncome, isLoading: isUpdating } = useMutation({
    mutationFn: updateIncomeApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["incomes"]);
      toast.success("Income successfully updated");
    },
    onError: (err) => {
      toast.error("Could not update your income");
    },
  });

  return { updateIncome, isUpdating };
}
