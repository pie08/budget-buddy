import { useMutation, useQueryClient } from "react-query";
import { createExpense as createExpenseApi } from "../../services/apiExpenses";
import toast from "react-hot-toast";

export function useCreateExpense() {
  const queryClient = useQueryClient();

  const { mutate: createExpense, isLoading: isCreating } = useMutation({
    mutationFn: createExpenseApi,
    onSuccess: (data) => {
      toast.success("Expense created successfully");
      queryClient.invalidateQueries(["expenses"]);
    },
    onError: (err) => {
      toast.error("Could not create your expense");
    },
  });

  return { createExpense, isCreating };
}
