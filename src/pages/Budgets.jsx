import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Menus from "../components/ui/Menus";
import { Row } from "../components/ui/Row";
import BudgetForm from "../features/budgets/BudgetForm";
import BudgetsTable from "../features/budgets/BudgetsTable";
import Modal from "../components/ui/Modal";
import BudgetsTableOperations from "../features/budgets/BudgetsTableOperations";
import ToolTip from "../components/ui/ToolTip";
import InfoIcon from "../components/ui/InfoIcon";

function Budgets() {
  return (
    <Modal>
      <Menus>
        <Row>
          <Row $gap={1.2}>
            <Heading>Budgets</Heading>
            <ToolTip>
              <ToolTip.Open id="income">
                <InfoIcon />
              </ToolTip.Open>
              <ToolTip.Window id="income">
                <p>
                  A budget will track your spending in total, and also within
                  each category. <br />
                  Add one using the button below.
                </p>
              </ToolTip.Window>
            </ToolTip>
          </Row>

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
