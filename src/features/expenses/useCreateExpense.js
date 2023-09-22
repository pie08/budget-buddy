import { useMutation, useQueryClient } from "react-query";
import { createExpense as createExpenseApi } from "../../services/apiExpenses";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: createExpense, isLoading: isCreating } = useMutation({
    mutationFn: (newExpense) =>
      createExpenseApi({ ...newExpense, user_id: user.id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["expenses"]);
      toast.success("Expense created successfully");
    },
    onError: (err) => {
      toast.error("Could not create your expense");
    },
  });

  return { createExpense, isCreating };
}
