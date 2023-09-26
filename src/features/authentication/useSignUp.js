import { useMutation } from "react-query";
import { signup } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      if (!data.session) {
        toast.success("Check your email for a confirmation");
        navigate("/login");
        return;
      }
      toast.success("Successfully created account");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signUp, isLoading };
}
