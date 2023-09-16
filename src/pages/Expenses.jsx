import { Button } from "../components/ui/Button";
import { Row } from "../components/ui/Row";
import Heading from "../components/ui/Heading";
import Menus from "../components/ui/Menus";
import Modal from "../components/ui/Modal";
import ExpenseForm from "../features/expenses/ExpenseForm";
import ExpensesLayout from "../features/expenses/ExpensesLayout";
import ExpenseTableOperations from "../features/expenses/ExpenseTableOperations";

function Expenses() {
  return (
    <Modal>
      <Menus>
        <Row>
          <Heading>Expenses</Heading>

          <ExpenseTableOperations />
        </Row>

        <ExpensesLayout />

        <span>
          <Modal.Open id="new-expense">
            <Button>Add expense</Button>
          </Modal.Open>
          <Modal.Window id="new-expense">
            <ExpenseForm />
          </Modal.Window>
        </span>
      </Menus>
    </Modal>
  );
}

export default Expenses;
