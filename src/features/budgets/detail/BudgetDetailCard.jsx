import styled from "styled-components";
import { formatCurrency } from "../../../utils/helpers";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  display: inline-block;
  background-color: ${(props) => props.$backgroundColor};
  border: 1px solid ${(props) => props.$borderColor};
  border-radius: var(--border-radius-sm);
  padding: 1.2rem 1.6rem;
  cursor: pointer;
`;

const Heading = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Transactions = styled.p`
  color: var(--color-gray-600);
  font-size: 1.4rem;
`;

const Amount = styled.span`
  font-size: 1.4rem;
  font-weight: 400;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-red-700);
  }
`;

function BudgetDatilCard({
  category,
  spent,
  budget,
  numTransactions,
  colors,
  overBudget,
}) {
  const navigate = useNavigate();

  return (
    <Card
      $backgroundColor={colors.light}
      $borderColor={colors.dark}
      onClick={() => navigate(`/expenses?category=${category}`)}
    >
      <Heading>
        {category}
        <Amount>
          {overBudget && <HiOutlineExclamationCircle />}
          {budget
            ? `${formatCurrency(Number(spent))} / ${formatCurrency(
                Number(budget)
              )}`
            : formatCurrency(Number(spent))}
        </Amount>
      </Heading>
      <Transactions>
        {numTransactions > 0
          ? `${numTransactions} transactions`
          : "No transactions"}
      </Transactions>
    </Card>
  );
}

export default BudgetDatilCard;
