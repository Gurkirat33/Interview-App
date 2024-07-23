import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socketio";

const JoinInterview = () => {
  const [interviewId, setInterviewId] = useState("");
  const navigate = useNavigate();

  const handleJoinInterview = () => {
    socket.emit("interview:join", { interviewId });
    // navigate(`/dashboard/interview/${interviewId}`);
  };

  const handleJoinInterviewRoom = ({ id, role }) => {
    navigate(`/dashboard/interview/${id}`, { state: "user" });
    console.log(role);
  };
  useEffect(() => {
    socket.on("interview:join", handleJoinInterviewRoom);
    return () => {
      socket.off("interview:join", handleJoinInterviewRoom);
    };
  }, [socket, handleJoinInterviewRoom]);

  return (
    <div className="section-container pt-24">
      <h2 className="text-2xl font-bold md:text-4xl md:leading-normal">
        Enter the Interview Details
      </h2>
      {/* <h4>Interview Details</h4> */}
      <div className="mt-6 flex gap-4">
        <p className="rounded-lg bg-slate-200 p-3">
          <span className="text-lg font-medium">Interview ID</span> :{" "}
          <input
            type="text"
            className="p-3"
            value={interviewId}
            onChange={(e) => setInterviewId(e.target.value)}
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
