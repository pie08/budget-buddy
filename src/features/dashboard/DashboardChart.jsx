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
import TableContainer from "../../components/ui/TableContainer";
import { eachDayOfInterval, format, isBefore, isEqual } from "date-fns";

const ResponsiveWrapper = styled.div`
  grid-column: 1 / -1;
`;

function DashboardChart({ expenses, incomes }) {
  // get all dates with transaction data
  const expenseDates = useDatesOfTransactions(expenses);
  const incomeDates = useDatesOfTransactions(incomes);

  // get the first date from either expenseDates or incomeDates
  const firstDate = isBefore(
    new Date(expenseDates[0]?.date),
    new Date(incomeDates[0]?.date)
  )
    ? new Date(expenseDates[0]?.date)
    : new Date(incomeDates[0]?.date);

  // get all days from firstdate to now
  const allDays = eachDayOfInterval({
    start: firstDate,
    end: new Date(),
  });

  const data = allDays.map((date) => {
    const expense = expenseDates.find((obj) => isEqual(date, obj.date));
    const income = incomeDates.find((obj) => isEqual(date, obj.date));
    console.log(expense);

    return {
      date: date,
      dateFormatted: format(date, "MMM dd"),
      expenseAmount: expense?.amount || 0,
      incomeAmount: income?.amount || 0,
    };
  });

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
      <TableContainer>
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
              dataKey="dateFormatted"
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
      </TableContainer>
    </ResponsiveWrapper>
  );
}

export default DashboardChart;
