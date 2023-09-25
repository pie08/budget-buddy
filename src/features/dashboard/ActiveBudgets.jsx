import styled from "styled-components";
import Heading from "../../components/ui/Heading";

const StyledActiveBudgets = styled.div`
  grid-column: 3 / span 2;
  background-color: var(--color-gray-0);
  padding: 1.6rem;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
`;

function ActiveBudgets() {
  return (
    <StyledActiveBudgets>
      <Heading as="h3">Active budgets</Heading>
    </StyledActiveBudgets>
  );
}

export default ActiveBudgets;
