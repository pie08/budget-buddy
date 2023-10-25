import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  isAfter,
  isSameDay,
  subDays,
} from "date-fns";
import { useSearchParams } from "react-router-dom";

/**
 * Retrive expense amounts per date
 * @param {object[]} transactions - Transactions from supabase
 * @param {string} transactions[].name - name
 * @returns {object[]} Each object has a date, formatted date, and amount
 */
export function useDatesOfTransactions(transactions) {
  const [searchParams] = useSearchParams();

  let numDays = searchParams.get("last") || 7;

  if (numDays === "ytd" && transactions.length > 0) {
    // get first date of transactions
    const startDate = transactions.toSorted((a, b) => {
      const date1 = new Date(a.created_at);
      const date2 = new Date(b.created_at);
      const after = isAfter(date1, date2);
      return after ? 1 : -1;
    })[0]?.created_at;

    // get days between now and date
    const numDaysStart = differenceInCalendarDays(
      new Date(),
      new Date(startDate)
    );
    numDays = numDaysStart + 1;
  }
  if (transactions.length === 0) {
    numDays = 7;
  }

  // get all days in between today and numDays ago
  const allDays = eachDayOfInterval({
    start: subDays(new Date(), Number(numDays) - 1),
    end: new Date(),
  });

  // create one object for each day
  const data = allDays.map((date) => {
    return {
      date,
      dateFormatted: format(date, "MMM dd"),
      amount: transactions
        .filter((transaction) =>
          isSameDay(new Date(transaction.created_at), date)
        )
        .reduce((acc, cur) => acc + cur.amount, 0),
    };
  });

  return data;
}
