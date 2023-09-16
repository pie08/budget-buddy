import { useSearchParams } from "react-router-dom";
import Select from "../../components/form/Select";

function CategoryOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("transactionType", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      defaultValue={searchParams.get("transactionType") || "expenses"}
      onChange={handleChange}
    >
      <option value="expenses">Filter by expenses</option>
      <option value="incomes">Filter by incomes</option>
    </Select>
  );
}

export default CategoryOperations;
