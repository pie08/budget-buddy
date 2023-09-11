import Heading from "../components/ui/Heading";
import CategoryCard from "../features/categories/CategoryCard";

function Categories() {
  return (
    <>
      <Heading>Categories</Heading>

      <div>
        <CategoryCard name="transportation" amount={1500} numTransactions={5} />
      </div>
      {/* List or grid of all categories and amount spent within the category */}
      {/* Add custom category button */}
    </>
  );
}

export default Categories;
