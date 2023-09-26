import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDatesOfTransactions } from "../../hooks/useDatesOfTransactions";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const ResponsiveWrapper = styled.div`
  grid-column: 1 / -1;
`;

function DashboardChart({ expenses, incomes }) {
  const expenseDates = useDatesOfTransactions(expenses);
  const incomeDates = useDatesOfTransactions(incomes);

  const data = expenseDates.map((obj, i) => {
    const expenseAmount = obj.amount;
    const incomeAmount = incomeDates[i].amount;

    return {
      date: obj.date,
      expenseAmount,
      incomeAmount,
    };
  });
  console.log(data);

  const colors = {
    expenses: { stroke: "var(--color-red-600)", fill: "var(--color-red-100)" },
    incomes: {
      stroke: "var(--color-brand-600)",
      fill: "var(--color-brand-200)",
    },
    text: "#6b7280",
  };

  return (
    <ResponsiveWrapper>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="expenseAmount"
            activeDot={true}
            {...colors.expenses}
            name="Expense"
          />
          <Line
            type="monotone"
            dataKey="incomeAmount"
            activeDot={true}
            {...colors.incomes}
            name="Income"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="4" />
          <XAxis
            dataKey="date"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            width={80}
          />
          <Tooltip formatter={(val, name) => [formatCurrency(val), name]} />
        </LineChart>
      </ResponsiveContainer>
    </ResponsiveWrapper>
  );
}

export default DashboardChart;
