import ParamSelect from "../ui/ParamSelect";

function TransactionChartOperations() {
  return (
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
  );
}

export default TransactionChartOperations;
