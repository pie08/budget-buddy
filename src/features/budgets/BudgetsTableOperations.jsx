import styled from "styled-components";
import ParamSelect from "../../components/ui/ParamSelect";

const Operations = styled.div`
  display: flex;
  gap: 2.4rem;
`;

function BudgetsTableOperations() {
  return (
    <Operations>
      <ParamSelect
        fieldName="status"
        options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "completed", label: "Completed" },
          { value: "waiting", label: "Waiting" },
        ]}
      />

      <ParamSelect
        fieldName="sortBy"
        options={[
          { value: "startDate-asc", label: "Sort by start date (ascending)" },
          { value: "startDate-desc", label: "Sort by start date (descending)" },
          { value: "endDate-asc", label: "Sort by end date (ascending)" },
          { value: "endDate-desc", label: "Sort by end date (descending)" },
          {
            value: "spendingLimit-asc",
            label: "Sort by spending limit (ascending)",
          },
          {
            value: "spendingLimit-desc",
            label: "Sort by spending limit (descending)",
          },
        ]}
      />
    </Operations>
  );
}

export default BudgetsTableOperations;
