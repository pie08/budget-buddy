import styled from "styled-components";
import Heading from "../../components/ui/Heading";
import { useBudgets } from "../budgets/useBudgets";
import SpinnerCenter from "../../components/ui/SpinnerCenter";
import { isAfter, isBefore, isToday } from "date-fns";
import BudgetItem from "./BudgetItem";
import Menus from "../../components/ui/Menus";

const StyledActiveBudgets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 3 / span 2;
  background-color: var(--color-gray-0);
  padding: 1.6rem;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
  overflow: auto;
`;

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  /* gap: 1.2rem; */
`;

const NoBudgets = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 1.8rem;
`;

function ActiveBudgets() {
  const { budgets, isLoading } = useBudgets();

  // if (isLoading) return <Spinner />;

  const activeBudgets = budgets?.filter((budget) => {
    const { startDate, endDate } = budget;

    // if start date is before today and end date is after today
    return (
      (isBefore(new Date(startDate), new Date()) ||
        isToday(new Date(startDate))) &&
      (isAfter(new Date(endDate), new Date()) || isToday(new Date(endDate)))
    );
  });

  return (
    <Menus>
      <StyledActiveBudgets>
        <Heading as="h3">Active budgets</Heading>

        {!isLoading ? (
          activeBudgets.length > 0 ? (
            <Items>
              {activeBudgets.map((budget, i) => (
                <BudgetItem key={i} budget={budget} />
              ))}
            </Items>
          ) : (
            <NoBudgets>No active budgets</NoBudgets>
          )
        ) : (
          <SpinnerCenter />
        )}
      </StyledActiveBudgets>
    </Menus>
  );
}

export default ActiveBudgets;
