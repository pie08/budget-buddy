import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import { useExpensesFromCategory } from "./useExpensesFromCategory";

function CategoryDetails() {
  const { category } = useParams();
  const { expenses, isLoading } = useExpensesFromCategory(category);

  if (isLoading) return <Spinner />;
  console.log(expenses);

  return <div>details</div>;
}

export default CategoryDetails;
