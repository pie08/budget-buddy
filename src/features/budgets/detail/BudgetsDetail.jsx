import { useParams } from "react-router-dom";
import Heading from "../../../components/ui/Heading";
import { useBooking } from "../useBooking";
import Spinner from "../../../components/ui/Spinner";

function BudgetsDetail() {
  const { booking, isLoading } = useBooking();

  if (isLoading) return <Spinner />;

  const { title, description, spendingLimit, categories, startDate, endDate } =
    booking;
  console.log(booking);

  return (
    <>
      <Heading>Budget details for {title}</Heading>
    </>
  );
}

export default BudgetsDetail;
