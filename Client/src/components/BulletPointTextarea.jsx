import axios from "axios";
import { useState } from "react";

const BulletPointTextarea = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [value, setValue] = useState("• ");

  const handleSaveRemarks = () => {
    // axios.post("")
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setValue((prevValue) => prevValue + "\n• ");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <button
        onClick={() => setShowTextarea(!showTextarea)}
        className="w-fit border-2"
      >
        {showTextarea ? "Hide Remarks" : "Add Remarks"}
      </button>
      <p className="text-sm text-slate-600">User cannot see the remarks</p>
      {showTextarea && (
        <div className="flex flex-col">
          <label htmlFor="remarks">Enter Reviews For user:</label>
          <textarea
            className="w-1/3 border-2 border-black p-2"
            id="remarks"
            rows={5}
            placeholder="Enter remarks"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSaveRemarks}>Save Remarks</button>
        </div>
      )}
    </>
  );
};

export default BulletPointTextarea;
