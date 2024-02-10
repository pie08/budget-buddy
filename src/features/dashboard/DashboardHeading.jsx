import Heading from "../../components/ui/Heading";
import ParamSelect from "../../components/ui/ParamSelect";
import { Row } from "../../components/ui/Row";
import { useUser } from "../authentication/useUser";

function DashboardHeading() {
  const { user } = useUser();

  return (
    <Row>
      <Heading>Welcome, {user.user_metadata.firstName}</Heading>

      <ParamSelect
        fieldName="last"
        options={[
          { value: "7", label: "Past 7 days" },
          { value: "30", label: "Past 30 days" },
          { value: "90", label: "Past 90 days" },
          { value: "365", label: "Past year" },
          { value: "all", label: "All time" },
        ]}
      />
    </Row>
  );
}

export default DashboardHeading;
