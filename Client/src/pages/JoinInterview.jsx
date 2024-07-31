import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socketio";
import { useSelector } from "react-redux";

const JoinInterview = () => {
  const [interviewId, setInterviewId] = useState("");
  const userId = useSelector((state) => state.user.user._id);
  const navigate = useNavigate();

  const handleJoinInterview = () => {
    socket.emit("interview:join", { interviewId, role: "user", userId });
  };

  const handleJoinInterviewRoom = ({ id, role }) => {
    navigate(`/dashboard/interview/${id}`, { state: "user" });
  };
  useEffect(() => {
    socket.on("interview:join", handleJoinInterviewRoom);
    return () => {
      socket.off("interview:join", handleJoinInterviewRoom);
    };
  }, [socket, handleJoinInterviewRoom]);

  return (
    <div className="section-container pt-20 md:pb-12 md:pt-28">
      <h2 className="text-2xl font-bold md:text-4xl md:leading-normal">
        Enter the Interview Details
      </h2>
      <div className="mt-6 flex gap-4">
        <p className="rounded-lg bg-slate-200 p-3">
          <label className="text-lg font-medium" htmlFor="interviewId">
            Interview ID
          </label>{" "}
          :{" "}
          <input
            type="text"
            id="interviewId"
            className="rounded-lg bg-slate-200 p-1 text-slate-600 focus:outline-none"
            value={interviewId}
            onChange={(e) => setInterviewId(e.target.value)}
            placeholder="Enter the interview ID"
          />
        </p>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        Enter the interview ID to join the interview
      </p>

      <button
        className="mt-6 rounded-lg bg-secondary-600 px-4 py-2 font-semibold text-white"
        onClick={handleJoinInterview}
      >
        Join the interview
      </button>
    </div>
  );
};

export default JoinInterview;
