import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../utils/helpers";
import { useDatesOfTransactions } from "../../hooks/useDatesOfTransactions";

function TransactionChart({
  data: dataRaw,
  stroke = "var(--color-brand-600)",
  fill = "var(--color-brand-200)",
}) {
  const data = useDatesOfTransactions(dataRaw);

  const colors = {
    area: {
      stroke,
      fill,
    },
    text: "#6b7280",
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <Area type="monotone" dataKey="amount" {...colors.area} name="Amount" />
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
        <Tooltip
          filterNull={true}
          formatter={(val, name) => [formatCurrency(val), name]}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TransactionChart;
