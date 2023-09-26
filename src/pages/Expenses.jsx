import { Button } from "../components/ui/Button";
import { Row } from "../components/ui/Row";
import Heading from "../components/ui/Heading";
import Menus from "../components/ui/Menus";
import Modal from "../components/ui/Modal";
import ExpenseForm from "../features/expenses/ExpenseForm";
import ExpensesLayout from "../features/expenses/ExpensesLayout";
import ExpenseTableOperations from "../features/expenses/ExpenseTableOperations";
import ToolTip from "../components/ui/ToolTip";
import InfoIcon from "../components/ui/InfoIcon";

function Expenses() {
  return (
    <Modal>
      <Menus>
        <Row>
          <Row $gap={1.2}>
            <Heading>Expenses</Heading>
            <ToolTip>
              <ToolTip.Open id="expense">
                <InfoIcon />
              </ToolTip.Open>
              <ToolTip.Window id="expense">
                <p>
                  An expense is money you spend. <br />
                  Add an expense using the button below to get started.
                </p>
              </ToolTip.Window>
            </ToolTip>
          </Row>

          <ExpenseTableOperations />
        </Row>

        <ExpensesLayout />

        <span>
          <Modal.Open id="new-expense">
            <Button>Add expense</Button>
          </Modal.Open>
        </span>
        <Modal.Window id="new-expense">
          <ExpenseForm />
        </Modal.Window>
      </Menus>
    </Modal>
  );
}

export default Expenses;
