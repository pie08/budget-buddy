import ParamSelect from "../../components/ui/ParamSelect";
import { Row } from "../../components/ui/Row";

function CategoryOperations() {
  return (
    <Row $gap={1.2}>
      <ParamSelect
        fieldName="last"
        options={[
          { value: "all", label: "All time" },
          { value: "7", label: "Past 7 days" },
          { value: "30", label: "Past 30 days" },
          { value: "90", label: "Past 90 days" },
          { value: "365", label: "Past year" },
        ]}
      />
      <ParamSelect
        fieldName="transactionType"
        options={[
          { value: "expenses", label: "Filter by expenses" },
          { value: "incomes", label: "Filter by incomes" },
        ]}
      />
    </Row>
  );
}

export default CategoryOperations;
