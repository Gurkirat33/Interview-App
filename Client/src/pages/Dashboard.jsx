import React from "react";
import { Link } from "react-router-dom";
import CodeEditor from "../socket/CodeEditor";
import InterviewBlueprints from "../components/InterviewBlueprints";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 bg-[url('/src/assets/hero-bg.svg')] bg-cover bg-no-repeat pt-24 bg-blend-color-burn">
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
            <InterviewBlueprints />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
