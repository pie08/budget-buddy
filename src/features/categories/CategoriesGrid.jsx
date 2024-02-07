import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import Spinner from "../../components/ui/Spinner";
import { useCategory } from "../../context/CategoryContext";
import { getCategoriesOfTransactions } from "./getCategoriesOfTransactions";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 3.2rem;
  row-gap: 2.4rem;
`;

function CategoriesGrid() {
  const { data, categories, isLoading, transactionType } = useCategory();

  if (isLoading) return <Spinner />;

  // get all categories for all tranactions
  const finalCategories = getCategoriesOfTransactions(categories, data);

  return (
    <Grid>
      {finalCategories.map(({ name, totalAmount, transactions, colors }, i) => (
        <CategoryCard
          key={i}
          name={name}
          amount={totalAmount}
          numTransactions={transactions}
          colors={colors}
          transactionType={transactionType}
        />
      ))}
    </Grid>
  );
}

export default CategoriesGrid;
