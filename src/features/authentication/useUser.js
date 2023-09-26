import { useQuery } from "react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated" && user,
    error,
  };
}
