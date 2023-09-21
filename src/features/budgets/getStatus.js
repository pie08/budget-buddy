import { isFuture, isPast, isToday } from "date-fns";

export function getStatus(budget) {
  // calculate status
  let status = "active";

  // if cur date is before start date
  if (
    isFuture(new Date(budget.startDate)) &&
    !isToday(new Date(budget.startDate))
  )
    status = "waiting";

  // if cur dat is after end date
  if (isPast(new Date(budget.endDate)) && !isToday(new Date(budget.endDate)))
    status = "completed";

  return status;
}
