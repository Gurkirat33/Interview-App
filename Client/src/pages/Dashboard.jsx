import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [showInterviewHistory, setShowInterviewHistory] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const user = useSelector((state) => state.user.user);
  const showInterviewHistoryBtn = async () => {
    if (showInterviewHistory) {
      setShowInterviewHistory(false);
      return;
    }
    setShowInterviewHistory(true);
    try {
      const res = await axios.get(
        "https://interview-app-server.vercel.app/api/v1/interviews/interview-history",
      );
      setInterviewHistory(res.data.data);
    } catch (error) {
      if (error.response?.data?.statusCode === 403) {
        toast.error(error.response?.data?.message);
        setInterviewHistory([]);
      }
    }
  };
  return (
    <div className="bg-gray-100 bg-[url('/src/assets/hero-bg.svg')] bg-cover bg-no-repeat pt-24 bg-blend-color-burn">
      <main className="section-container p-6">
        <section className="mb-4 text-center sm:text-left">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 py-2 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
              Welcome to Your{" "}
              <span className="text-secondary-700 underline decoration-secondary-700 decoration-wavy decoration-2">
                Interview Dashboard
              </span>
            </h2>
            <p className="mb-4 text-center text-slate-600">
              Effortlessly manage interviews with integrated features like a
              multi-language code editor, admin controls, and anti-cheating
              measures that track full-screen and focus status, ensuring
              efficient and secure sessions.
            </p>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <div className="flex">
                <Link className="relative w-full" to="create/interview">
                  <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded bg-black"></span>
                  <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-primary-600 bg-primary-600 px-3 py-1 font-bold text-white transition duration-200">
                    Create Interview
                  </span>
                </Link>
              </div>

              <div className="flex">
                <Link className="relative w-full" to="join/interview">
                  <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded bg-black"></span>
                  <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-secondary-550 bg-secondary-550 px-3 py-1 font-bold text-white transition duration-200">
                    Join Interview
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={showInterviewHistoryBtn}
            >
              <p className="text-xl font-bold">Interview History</p>
              {showInterviewHistory ? (
                <FiArrowUp className="text-2xl" />
              ) : (
                <FiArrowDown className="text-2xl" />
              )}
            </div>
            {!showInterviewHistory && (
              <p className="mt-2 text-sm text-slate-600">
                Check out your interview history
              </p>
            )}
            {showInterviewHistory && interviewHistory.length === 0 && (
              <>
                <p className="mt-4 text-xl font-medium">No interviews found</p>
                <Link to="create/interview">Create a new interview</Link>
              </>
            )}
            {interviewHistory.length > 0 && showInterviewHistory && (
              <div className="mt-4 space-y-4">
                {interviewHistory.map((interview) => (
                  <div
                    key={interview._id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-2 text-lg font-semibold text-blue-600">
                      Interview ID: {interview.interviewId}
                    </div>
                    <div className="mb-1 text-gray-700">
                      <span className="font-medium">Creator ID:</span>{" "}
                      {user.name} (You)
                    </div>
                    <div className="mb-1 text-gray-700">
                      <span className="font-medium">Participants:</span>{" "}
                      {interview.participants.map((participant, index) => (
                        <span key={participant}>
                          {index > 0 && ", "}
                          {participant === user._id ? "You" : participant}
                        </span>
                      ))}
                    </div>
                    <div className="mb-1 text-gray-700">
                      <span className="font-medium">Remarks:</span>{" "}
                      {!interview.remarks || interview.remarks === "" ? (
                        <span className="text-sm text-slate-600">
                          No remarks given
                        </span>
                      ) : (
                        interview.remarks
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
