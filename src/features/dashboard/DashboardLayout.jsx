import styled from "styled-components";
import Stats from "./Stats";
import Spinner from "../../components/ui/Spinner";
import CategoriesChart from "./CategoriesChart";
import ActiveBudgets from "./ActiveBudgets";
import { useExpensesAfterDate } from "./useExpensesAfterDate";
import { useIncomesAfterDate } from "./useIncomesAfterDate";
import DashboardChart from "./DashboardChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3.6rem 2.4rem;
`;

function DashboardLayout() {
  const { expenses, isLoading: isLoadingExpenses } = useExpensesAfterDate();
  const { incomes, isLoading: isLoadingIncomes } = useIncomesAfterDate();
  const isLoading = isLoadingIncomes || isLoadingExpenses;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats expenses={expenses} incomes={incomes} />

      <CategoriesChart expenses={expenses} incomes={incomes} />
      <ActiveBudgets />
      <DashboardChart expenses={expenses} incomes={incomes} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
