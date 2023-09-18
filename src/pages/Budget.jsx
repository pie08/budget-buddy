import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Menus from "../components/ui/Menus";
import { Row } from "../components/ui/Row";
import AddBudgetForm from "../features/budgets/AddBudgetForm";
import BudgetsTable from "../features/budgets/BudgetsTable";
import Modal from "../components/ui/Modal";

function Budget() {
  return (
    <Modal>
      <Menus>
        <Row>
          <Heading>Budgets</Heading>
          <p>operations</p>
        </Row>

        <BudgetsTable />

        <span>
          <Modal.Open id="new-budget">
            <Button>Add budget</Button>
          </Modal.Open>
        </span>
        <Modal.Window id="new-budget">
          <AddBudgetForm />
        </Modal.Window>
      </Menus>
    </Modal>
  );
}

export default Budget;
