import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const BulletPointTextarea = ({ roomId }) => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [value, setValue] = useState("• ");

  const handleSaveRemarks = async () => {
    try {
      await axios.post("/api/v1/interviews/add-remarks", {
        remarks: value,
        roomId,
      });
      toast.success("Remarks added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
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
    <div className="mt-4">
      <button
        onClick={() => setShowTextarea(!showTextarea)}
        className="w-full rounded-lg bg-primary-500 px-4 py-2 text-white"
      >
        {showTextarea ? "Hide Remarks" : "Add Remarks"}
      </button>
      <p className="text-sm text-slate-600">User cannot see the remarks</p>
      {showTextarea && (
        <div className="flex flex-col">
          <textarea
            className="my-2 w-full border border-black p-2"
            id="remarks"
            rows={5}
            placeholder="Enter Reviews For user"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSaveRemarks}
            className="w-full rounded-lg bg-secondary-600 px-4 py-2 text-white"
          >
            Save Remarks
          </button>
        </div>
      )}
    </div>
  );
};

export default BulletPointTextarea;
