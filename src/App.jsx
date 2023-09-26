import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import GlobalStyles from "./styles/GlobalStyles";

import AppLayout from "./components/ui/AppLayout";
import SpinnerFullPage from "./components/ui/SpinnerFullPage";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import RootLayout from "./components/ui/RootLayout";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/ErrorFallback";

// todo: change some loder locations

// Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Incomes = lazy(() => import("./pages/Incomes"));
const Categories = lazy(() => import("./pages/Categories"));
const Budgets = lazy(() => import("./pages/Budgets"));
const Budget = lazy(() => import("./pages/Budget"));
const Account = lazy(() => import("./pages/Account"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Recovery = lazy(() => import("./pages/Recovery"));
const EmailConfirmation = lazy(() =>
  import("./components/ui/EmailConfirmation")
);
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/budgets/:id" element={<Budget />} />
                <Route path="/account" element={<Account />} />
                <Route path="/account/reset" element={<ResetPassword />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route
                path="/recovery/confirmation"
                element={<EmailConfirmation />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
