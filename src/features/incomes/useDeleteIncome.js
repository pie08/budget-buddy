import { useMutation, useQueryClient } from "react-query";
import { deleteIncome as deleteIncomeApi } from "../../services/apiIncomes";
import toast from "react-hot-toast";

export function useDeleteIncome() {
  const queryClient = useQueryClient();

  const { mutate: deleteIncome, isLoading: isDeleting } = useMutation({
    mutationFn: deleteIncomeApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["incomes"]);
      toast.success("Income deleted successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Could not delete your income");
    },
  });

  return { deleteIncome, isDeleting };
}
