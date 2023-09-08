import { useMutation, useQueryClient } from "react-query";
import { updateExpense as updateExpenseApi } from "../../services/apiExpenses";
import toast from "react-hot-toast";

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  const { mutate: updateExpense, isLoading: isUpdating } = useMutation({
    mutationFn: updateExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      toast.success("Expense successfully updated");
    },
    onError: (err) => {
      toast.error("Could not update your expense");
    },
  });

  return { updateExpense, isUpdating };
}
