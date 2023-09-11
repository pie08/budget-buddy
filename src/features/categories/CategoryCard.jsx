import styled from "styled-components";
import { formatCurrency } from "../../utils/Helpers";

const Card = styled.div`
  display: inline-block;
  background-color: var(--color-red-100);
  border: 1px solid var(--color-red-700);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem 1.6rem;

  /* For dev */
  min-width: 25rem;
`;

const Heading = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const Transactions = styled.p`
  color: var(--color-gray-600);
  font-size: 1.4rem;
`;

function CategoryCard({ name, amount, numTransactions }) {
  return (
    <Card>
      <Heading>
        {name} &mdash; {formatCurrency(Number(amount))}
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
