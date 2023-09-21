import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import Spinner from "../../components/ui/Spinner";
import AddCategory from "./AddCategory";
import { useCategory } from "../../context/CategoryContext";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 3.2rem;
  row-gap: 2.4rem;
`;

function CategoriesGrid() {
  const { data, categories, isLoading, transactionType } = useCategory();

  if (isLoading) return <Spinner />;

  const finalCategories = categories
    .map((category) => {
      // Get expenses with the current category
      const filteredData = data.filter(
        (transaction) => transaction.category === category.name
      );

      const totalAmount = filteredData.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );

      return {
        name: category.name,
        totalAmount,
        transactions: filteredData.length,
        colors: category.colors,
      };
    })
    .filter((category) => category.transactions > 0);

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
      <AddCategory />
    </Grid>
  );
}

export default CategoriesGrid;
