import { useMutation, useQueryClient } from "react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const naviagte = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Successfully logged out");
      naviagte("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: () => {
      toast.error("Could not log you out");
    },
  });

  return { logout, isLoading };
}
