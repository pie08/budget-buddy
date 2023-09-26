import styled from "styled-components";
import Menus from "../../components/ui/Menus";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// todo: represent if the budget is overbudget or not (add indicator or amount spent in budget)

const StyledBudgetItem = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.8fr 1fr 0.2fr;
  gap: 1.2rem;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  align-items: center;
  border-bottom: 1px solid var(--color-gray-100);

  &:first-child {
    border-top: 1px solid var(--color-gray-100);
  }

  & > *:no-button {
    overflow-x: auto;
  }
`;

const Amount = styled.p`
  font-weight: 500;
  color: var(--color-blue-600);
`;

function BudgetItem({ budget }) {
  const { title, endDate, spendingLimit } = budget;
  const navigate = useNavigate();

  return (
    <StyledBudgetItem>
      <p>{title}</p>
      <Amount>{formatCurrency(spendingLimit)}</Amount>
      <p>{format(new Date(endDate), "PPP")}</p>

      <Menus.Menu>
        <Menus.Open id={budget.id} />

        <Menus.List id={budget.id}>
          <Menus.Item
            icon={<HiPencil />}
            onClick={() => navigate(`/budgets/${budget.id}`)}
          >
            See more
          </Menus.Item>
        </Menus.List>
      </Menus.Menu>
    </StyledBudgetItem>
  );
}

export default BudgetItem;
