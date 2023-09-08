import { format } from "date-fns";
import Table from "../../components/ui/Table";
import { formatCurrency } from "../../utils/Helpers";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.4rem 0.6rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-gray-100);
  }

  & svg {
    color: var(--color-gray-600);
    width: 1.8rem;
    height: 1.8rem;
    transform: translateY(0.3rem) translateX(0.1rem);
  }
`;

function ExpenseRow({ expense }) {
  return (
    <Table.Row>
      <div>
        <StyledLink to={`/expenses/${expense.id}`}>
          <HiMiniArrowTopRightOnSquare />
        </StyledLink>
      </div>
      <div>{expense.category}</div>
      <div>{expense.title}</div>
      <div>{formatCurrency(expense.amount)}</div>
      <div>{format(new Date(expense.created_at), "PPP")}</div>
      <div>{expense.description}</div>
    </Table.Row>
  );
}

export default ExpenseRow;
