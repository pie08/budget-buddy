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
import DeleteCategoryForm from "../features/categories/DeleteCategoryForm";

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

        <Row $gap={2.4} $justifyStart>
          <Modal.Open id="add-category">
            <span>
              <Button>Add custom category</Button>
            </span>
          </Modal.Open>
          <Modal.Window id="add-category">
            <AddCategoryForm />
          </Modal.Window>

          <Modal.Open id="delete-category">
            <span>
              <Button>Delete custom category</Button>
            </span>
          </Modal.Open>
          <Modal.Window id="delete-category">
            <DeleteCategoryForm />
          </Modal.Window>
        </Row>
      </CategoryProvider>
    </Modal>
  );
}

export default Categories;
