import styled from "styled-components";
import { formatCurrency } from "../../utils/Helpers";

const Card = styled.div`
  display: inline-block;
  background-color: ${(props) => props.$backgroundColor};
  border: 1px solid ${(props) => props.$borderColor};
  border-radius: var(--border-radius-sm);
  padding: 1.2rem 1.6rem;
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
`;

function CategoryCard({ name, amount, numTransactions, colors }) {
  return (
    <Card $backgroundColor={colors.light} $borderColor={colors.dark}>
      <Heading>
        {name} <Amount>{formatCurrency(Number(amount))}</Amount>
      </Heading>
      <Transactions>
        {numTransactions > 0
          ? `${numTransactions} transactions`
          : "No transactions"}
      </Transactions>
    </Card>
  );
}

export default CategoryCard;
