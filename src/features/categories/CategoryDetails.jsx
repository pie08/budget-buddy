import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import Menus from "../../components/ui/Menus";
import { Row } from "../../components/ui/Row";
import Heading from "../../components/ui/Heading";
import ParamSelect from "../../components/ui/ParamSelect";
import { useCategory } from "../../context/CategoryContext";

function CategoryDetails() {
  const { category } = useParams();
  const { data, isLoading, deleteTransaction, count } = useCategory();
  console.log(data);

  if (isLoading) return <Spinner />;

  const filteredData = data?.filter(
    (transaction) => transaction.category === category
  );
  console.log(filteredData);

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Row>
        <Heading>Category {category}</Heading>

        {/* Sorting */}
        <ParamSelect
          options={[
            { value: "created_at-asc", label: "Sort by date (ascending)" },
            { value: "created_at-desc", label: "Sort by date (descending)" },
            { value: "amount-asc", label: "Sort by amount (ascending)" },
            { value: "amount-desc", label: "Sort by amount (descending)" },
          ]}
          fieldName="sortBy"
        />
      </Row>

      <TransactionTable
        transactions={filteredData}
        count={count}
        formRender={false}
        onDelete={deleteTransaction}
      />
    </Menus>
  );
}

export default CategoryDetails;
