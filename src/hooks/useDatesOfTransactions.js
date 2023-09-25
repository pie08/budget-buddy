import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  isAfter,
  isSameDay,
  subDays,
} from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useDatesOfTransactions(dataRaw) {
  const [searchParams] = useSearchParams();

  let numDays = searchParams.get("last") || 7;

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

  return data;
}
