import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  format,
  intervalToDuration,
  isAfter,
  isSameDay,
  subDays,
} from "date-fns";
import { formatCurrency } from "../../utils/Helpers";

function TransactionChart({
  data: dataRaw,
  numDays: numDaysRaw,
  stroke = "var(--color-brand-600)",
  fill = "var(--color-brand-200)",
}) {
  let numDays = numDaysRaw;

  if (numDays === "ytd") {
    // get first date of transactions
    const startDate = dataRaw.toSorted((a, b) => {
      const date1 = new Date(a.created_at);
      const date2 = new Date(b.created_at);
      const after = isAfter(date1, date2);
      return after ? 1 : -1;
    })[0].created_at;

    // get days between now and date
    const numDaysStart = differenceInCalendarDays(
      new Date(),
      new Date(startDate)
    );
    // add 1 to account for the day itself
    numDays = numDaysStart + 1;
  }
  // get all days
  const allDays = eachDayOfInterval({
    start: subDays(new Date(), Number(numDays) - 1),
    end: new Date(),
  });

  // create one object for each day
  const data = allDays.map((date) => {
    return {
      date: format(date, "MMM dd"),
      amount: dataRaw
        .filter((transaction) =>
          isSameDay(new Date(transaction.created_at), date)
        )
        .reduce((acc, cur) => acc + cur.amount, 0),
    };
  });

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
        <Tooltip
          filterNull={true}
          formatter={(val, name) => [formatCurrency(val), name]}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TransactionChart;
