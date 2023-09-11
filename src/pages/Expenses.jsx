import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Modal from "../components/ui/Modal";
import ExpenseForm from "../features/expenses/ExpenseForm";
import ExpensesTable from "../features/expenses/ExpensesTable";

function Expenses() {
  return (
    <Modal>
      <Heading>Expenses</Heading>

      <ExpensesTable />

      <span>
        <Modal.Open id="new-expense">
          <Button>Add expense</Button>
        </Modal.Open>
        <Modal.Window id="new-expense">
          <ExpenseForm />
        </Modal.Window>
      </span>
    </Modal>
  );
}

export default Expenses;
