import { useMutation } from "react-query";
import { sendPasswordReset as sendPasswordResetApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function usePasswordReset() {
  const { mutate: sendPasswordReset, isLoading } = useMutation({
    mutationFn: sendPasswordResetApi,
    onSuccess: () => toast.success("Check your email for a reset link"),
    onError: (err) => toast.error(err.message),
  });

  return { sendPasswordReset, isLoading };
}
