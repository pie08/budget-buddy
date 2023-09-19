import Heading from "../components/ui/Heading";
import { Row } from "../components/ui/Row";
import CategoriesGrid from "../features/categories/CategoriesGrid";
import CategoryOperations from "../features/categories/CategoryOperations";
import { CategoryProvider } from "../context/CategoryContext";

function Categories() {
  return (
    <CategoryProvider>
      <Row>
        <Heading>Categories</Heading>

        <CategoryOperations />
      </Row>

      <CategoriesGrid />
    </CategoryProvider>
  );
}

export default Categories;
