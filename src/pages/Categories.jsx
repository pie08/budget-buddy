import Heading from "../components/ui/Heading";
import { Row } from "../components/ui/Row";
import CategoriesGrid from "../features/categories/CategoriesGrid";
import CategoryOperations from "../features/categories/CategoryOperations";
import { CategoryProvider } from "../context/CategoryContext";
import ToolTip from "../components/ui/ToolTip";
import InfoIcon from "../components/ui/InfoIcon";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import AddCategoryForm from "../features/categories/AddCategoryForm";

function Categories() {
  return (
    <Modal>
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
                  Here you can see all of the categories that you have made
                  transactions in with a breif overview for each. <br />
                  You can also add custom categories <br />
                  Add an expense or income to see one.
                </p>
              </ToolTip.Window>
            </ToolTip>
          </Row>

          <CategoryOperations />
        </Row>

        <CategoriesGrid />

        <Modal.Open id="category">
          <span>
            <Button>Add custom category</Button>
          </span>
        </Modal.Open>

        <Modal.Window id="category">
          <AddCategoryForm />
        </Modal.Window>
      </CategoryProvider>
    </Modal>
  );
}

export default Categories;
