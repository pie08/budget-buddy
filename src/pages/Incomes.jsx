import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Modal from "../components/ui/Modal";
import IncomeForm from "../features/incomes/IncomeForm";
import IncomesTable from "../features/incomes/IncomesTable";

function Incomes() {
  return (
    <Modal>
      <Heading>Incomes</Heading>

      <IncomesTable />

      <span>
        <Modal.Open id="new-income">
          <Button>Add income</Button>
        </Modal.Open>
        <Modal.Window id="new-income">
          <IncomeForm />
        </Modal.Window>
      </span>
    </Modal>
  );
}

export default Incomes;
