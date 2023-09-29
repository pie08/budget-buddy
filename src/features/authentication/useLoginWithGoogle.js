import { useMutation } from "react-query";
import { loginWithGoogle as loginWithGoogleApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLoginWithGoogle() {
  const { mutate: loginWithGoogle, isLoading } = useMutation({
    mutationFn: loginWithGoogleApi,
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { loginWithGoogle, isLoading };
}
