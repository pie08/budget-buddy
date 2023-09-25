import styled from "styled-components";
import Heading from "../../components/ui/Heading";
import { Row } from "../../components/ui/Row";
import ParamSelect from "../../components/ui/ParamSelect";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getCategoriesOfTransactions } from "../categories/getCategoriesOfTransactions";
import { useSearchParams } from "react-router-dom";
import expenseCategories from "../../data/expenseCategories.json";
import incomeCategories from "../../data/incomeCategories.json";
import { formatCurrency } from "../../utils/helpers";

const StyledCategoriesChart = styled.div`
  grid-column: 1 / span 2;
  background-color: var(--color-gray-0);
  padding: 1.6rem;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
`;

function CategoriesChart({ expenses, incomes }) {
  const [searchParams] = useSearchParams();
  const transactionType = searchParams.get("transactionType") || "expenses";

  const transactionData = transactionType === "expenses" ? expenses : incomes;
  const transactionCategories =
    transactionType === "expenses" ? expenseCategories : incomeCategories;
  const data = getCategoriesOfTransactions(
    transactionCategories,
    transactionData
  );

  return (
    <StyledCategoriesChart>
      <Row $alignStart={true}>
        <Heading as="h3">
          {transactionType[0].toUpperCase() +
            transactionType.slice(1, transactionType.length - 1)}{" "}
          transactions
        </Heading>

        <ParamSelect
          fieldName="transactionType"
          options={[
            { label: "Expenses", value: "expenses" },
            { label: "Incomes", value: "incomes" },
          ]}
        />
      </Row>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalAmount"
            nameKey="name"
            innerRadius={90}
            paddingAngle={3}
          >
            {data.map(({ colors }, index) => (
              <Cell key={index} fill={colors.light} stroke={colors.dark} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val, name) => [
              formatCurrency(val),
              name[0].toUpperCase() + name.slice(1),
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledCategoriesChart>
  );
}

export default CategoriesChart;
