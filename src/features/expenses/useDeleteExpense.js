import { useMutation, useQueryClient } from "react-query";
import { deleteExpense as deleteExpenseApi } from "../../services/apiExpenses";
import toast from "react-hot-toast";

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  const { mutate: deleteExpense, isLoading: isDeleting } = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      toast.success("Expense deleted successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Could not delete your expense");
    },
  });

  return { deleteExpense, isDeleting };
}
