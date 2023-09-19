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
    </Operations>
  );
}

export default BudgetsTableOperations;
