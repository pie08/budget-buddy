import { useSearchParams } from "react-router-dom";
import ParamSelect from "../../components/ui/ParamSelect";

function CategoryOperations() {
  const [searchParams] = useSearchParams();
  const defaultValue = searchParams.get("transactionType") || "expenses";

  return (
    <ParamSelect
      fieldName="transactionType"
      defaultValue={defaultValue}
      options={[
        { value: "expenses", label: "Filter by expenses" },
        { value: "incomes", label: "Filter by incomes" },
      ]}
    />
  );
}

export default CategoryOperations;
