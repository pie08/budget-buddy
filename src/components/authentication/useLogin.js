import { useMutation } from "react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("Successfully logged in");
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("The provided credentials were incorrect");
    },
  });

  return { login, isLoading };
}
