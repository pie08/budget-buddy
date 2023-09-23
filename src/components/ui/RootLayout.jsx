import { Outlet } from "react-router-dom";
import { useUser } from "../../features/authentication/useUser";
import SpinnerFullPage from "./SpinnerFullPage";
import { useLogout } from "../../features/authentication/useLogout";

function RootLayout() {
  const { isLoading, error } = useUser();
  const { logout } = useLogout();

  if (isLoading) return <SpinnerFullPage />;

  if (error) logout();

  return <Outlet />;
}

export default RootLayout;
