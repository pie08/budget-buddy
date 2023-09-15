import Select from "../../components/form/Select";
import { useCategory } from "../../context/CategoryContext";

function CategoryOperations() {
  const { setSelectedData, selectedData } = useCategory();

  function handleChange(e) {
    setSelectedData(e.target.value);
  }

  return (
    <Select value={selectedData} onChange={handleChange}>
      <option value="expenses">Filter by expenses</option>
      <option value="incomes">Filter by incomes</option>
    </Select>
  );
}

export default CategoryOperations;
