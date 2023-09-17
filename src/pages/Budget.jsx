import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Menus from "../components/ui/Menus";
import { Row } from "../components/ui/Row";
import BudgetsTable from "../features/budgets/BudgetsTable";

function Budget() {
  return (
    <Menus>
      <Row>
        <Heading>Budgets</Heading>
        <p>operations</p>
      </Row>

      <BudgetsTable />

      <span>
        <Button>Add budget</Button>
      </span>
    </Menus>
  );
}

export default Budget;
