import Heading from "../components/ui/Heading";
import { Row } from "../components/ui/Row";
import CategoriesGrid from "../features/categories/CategoriesGrid";
import CategoryOperations from "../features/categories/CategoryOperations";

function Categories() {
  return (
    <>
      <Row>
        <Heading>Categories</Heading>

        <CategoryOperations />
      </Row>

      <CategoriesGrid />
    </>
  );
}

export default Categories;
