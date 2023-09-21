import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Menus from "../components/ui/Menus";
import { Row } from "../components/ui/Row";
import BudgetForm from "../features/budgets/BudgetForm";
import BudgetsTable from "../features/budgets/BudgetsTable";
import Modal from "../components/ui/Modal";
import BudgetsTableOperations from "../features/budgets/BudgetsTableOperations";

function Budgets() {
  return (
    <Modal>
      <Menus>
        <Row>
          <Heading>Budgets</Heading>
          <BudgetsTableOperations />
        </Row>

        <BudgetsTable />

        <span>
          <Modal.Open id="new-budget">
            <Button>Add budget</Button>
          </Modal.Open>
        </span>
        <Modal.Window id="new-budget">
          <BudgetForm />
        </Modal.Window>
      </Menus>
    </Modal>
  );
}

export default Budgets;
