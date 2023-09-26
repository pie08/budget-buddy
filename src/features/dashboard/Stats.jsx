import ToolTip from "../../components/ui/ToolTip";
import { useDatesOfTransactions } from "../../hooks/useDatesOfTransactions";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowsRightLeft,
  HiOutlineBuildingLibrary,
} from "react-icons/hi2";

function Stats({ expenses, incomes }) {
  const expenseDates = useDatesOfTransactions(expenses);
  const incomeDates = useDatesOfTransactions(incomes);
  const totalExpenses = expenseDates.reduce((acc, cur) => acc + cur.amount, 0);
  const totalIncomes = incomeDates.reduce((acc, cur) => acc + cur.amount, 0);
  const savings = totalIncomes - totalExpenses;
  const flow = Math.round((totalExpenses / totalIncomes) * 100) || 0;

  return (
    <ToolTip>
      <Stat
        title="expenses"
        amount={formatCurrency(totalExpenses)}
        icon={<HiOutlineArrowTrendingDown />}
        color="red"
      />
      <Stat
        title="incomes"
        amount={formatCurrency(totalIncomes)}
        icon={<HiOutlineArrowTrendingUp />}
        color="brand"
      />
      <Stat
        title="savings"
        amount={formatCurrency(savings)}
        icon={<HiOutlineBuildingLibrary />}
        color="yellow"
        toolTip="Savings are how much money you have left of your income after all expenses are deducted."
      />
      <Stat
        title="Flow"
        amount={`${flow === Infinity || flow > 1000 ? ">1000" : flow}%`}
        icon={<HiOutlineArrowsRightLeft />}
        color="purple"
        toolTip="Flow is the percentage of your income that you spend."
      />
    </ToolTip>
  );
}

export default Stats;
