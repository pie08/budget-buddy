import Heading from "../components/ui/Heading";
import { Row } from "../components/ui/Row";
import CategoriesGrid from "../features/categories/CategoriesGrid";
import CategoryOperations from "../features/categories/CategoryOperations";
import { CategoryProvider } from "../context/CategoryContext";
import ToolTip from "../components/ui/ToolTip";
import InfoIcon from "../components/ui/InfoIcon";

function Categories() {
  return (
    <CategoryProvider>
      <Row>
        <Row $gap={1.2}>
          <Heading>Categories</Heading>
          <ToolTip>
            <ToolTip.Open id="income">
              <InfoIcon />
            </ToolTip.Open>
            <ToolTip.Window id="income">
              <p>
                Here you can see all the categories that you have made
                transactions in with a breif overview for each. <br />
                Add an expense or income to see one.
              </p>
            </ToolTip.Window>
          </ToolTip>
        </Row>

        <CategoryOperations />
      </Row>

      <CategoriesGrid />
    </CategoryProvider>
  );
}

export default Categories;
