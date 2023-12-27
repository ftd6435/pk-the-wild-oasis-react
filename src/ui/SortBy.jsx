import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [serachParams, setSearchParams] = useSearchParams();
  const sortedValue = serachParams.get("sortBy") || "";

  function handleOnChange(e) {
    serachParams.set("sortBy", e.target.value);
    setSearchParams(serachParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortedValue}
      onChange={handleOnChange}
    />
  );
}

export default SortBy;
