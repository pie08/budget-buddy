import { useMutation } from "react-query";
import { signup } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignUp() {
  const naviagte = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Successfully created account");
      naviagte("/", { replace: true });
    },
    onError: () => {
      toast.error("Could not create your account");
    },
  });

  return { signUp, isLoading };
}
