import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socketio";
import { useSelector } from "react-redux";
import UpgradeModal from "../components/UpgradeModal";

const CreateInterview = () => {
  const [interviewId, setInterviewId] = useState("");
  const userId = useSelector((state) => state.user.user._id);
  const [maxInterviewModal, setMaxInterviewModal] = useState(false);
  const navigate = useNavigate();
  const handleCopyInterviewId = () => {
    navigator.clipboard
      .writeText(interviewId)
      .then(() => toast.success("Copied!"))
      .catch((err) => toast.error("Failed to copy!"));
  };
  useEffect(() => {
    async function createInterview() {
      try {
        const res = await axios.post(
          "https://interview-app-server.vercel.app/api/v1/interviews/create-interview",
        );
        setInterviewId(res.data.data);
      } catch (error) {
        if (error.response?.data?.statusCode === 403) {
          setMaxInterviewModal(true);
        }
      }
    }
    createInterview();
  }, []);
  const handleJoinInterviewRoom = ({ id }) => {
    navigate(`/dashboard/interview/${id}`, { state: "admin" });
  };
  useEffect(() => {
    socket.on("interview:join", handleJoinInterviewRoom);
    return () => {
      socket.off("interview:join", handleJoinInterviewRoom);
    };
  }, [socket, handleJoinInterviewRoom]);

  const handleJoinInterview = () => {
    socket.emit("interview:join", {
      interviewId,
      role: "admin",
      userId,
    });
  };

  return (
    <div className="section-container pt-20 md:pb-12 md:pt-28">
      {maxInterviewModal && <UpgradeModal />}
      <h2 className="text-2xl font-bold md:text-4xl md:leading-normal">
        Discover Your Interview Details
      </h2>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <p className="rounded-lg bg-slate-200 p-3">
          <span className="text-lg font-medium">Interview ID</span> :{" "}
          <span className="text-slate-600">{interviewId}</span>
        </p>
        <button
          onClick={handleCopyInterviewId}
          className="rounded-lg bg-primary-600 p-3 font-semibold text-white"
        >
          Copy Id
        </button>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        Share this unique Interview ID with participants to join the session
        together and collaborate seamlessly.
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

export default CreateInterview;
