import { Outlet } from "react-router-dom";
import { useUser } from "../../features/authentication/useUser";
import SpinnerFullPage from "./SpinnerFullPage";

function RootLayout() {
  const { isLoading } = useUser();

  if (isLoading) return <SpinnerFullPage />;

  return <Outlet />;
}

export default RootLayout;
