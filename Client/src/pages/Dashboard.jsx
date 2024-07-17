import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="section-container p-6">
        <section className="mb-8 text-center sm:text-left">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              Welcome to Your{" "}
              <span className="text-secondary-700 underline decoration-secondary-700 decoration-wavy decoration-2">
                Interview Dashboard
              </span>
            </h2>
            <p className="mb-4 text-slate-600">
              Manage and schedule your interviews effortlessly. Here you can
              join or create interviews, view your upcoming schedule, and access
              all the tools you need to conduct effective and efficient
              interviews.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
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
        </section>

        <section className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Upcoming Interviews</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Interview Title</th>
                    <th className="p-2">Date and Time</th>
                    <th className="p-2">Participants</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Add dynamic data here */}
                  <tr className="border-b">
                    <td className="p-2">Sample Interview</td>
                    <td className="p-2">2024-07-20 10:00 AM</td>
                    <td className="p-2">John Doe</td>
                    <td className="p-2">Scheduled</td>
                    <td className="p-2">
                      <Link to="#" className="text-blue-500 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Recent Interviews</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Interview Title</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Participants</th>
                    <th className="p-2">Summary</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Add dynamic data here */}
                  <tr className="border-b">
                    <td className="p-2">Sample Interview</td>
                    <td className="p-2">2024-07-10</td>
                    <td className="p-2">Jane Doe</td>
                    <td className="p-2">Successful</td>
                    <td className="p-2">
                      <Link to="#" className="text-blue-500 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Quick Links</h2>
            <ul className="list-inside list-disc">
              <li>
                <Link to="#" className="text-blue-500 hover:underline">
                  Interview Templates
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-500 hover:underline">
                  Candidate Profiles
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-500 hover:underline">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Tips and Resources</h2>
            <ul className="list-inside list-disc">
              <li>
                <Link to="#" className="text-blue-500 hover:underline">
                  Best Practices for Effective Interviews
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-500 hover:underline">
                  How to Create Engaging Interview Questions
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-500 hover:underline">
                  Managing Interview Schedules Efficiently
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">We Value Your Feedback</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="comments" className="block text-gray-700">
                  Comments
                </label>
                <textarea
                  id="comments"
                  className="w-full rounded-lg border p-2"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Send Feedback
              </button>
            </form>
            <p className="mt-4">
              <Link to="/support" className="text-blue-500 hover:underline">
                Need Help? Contact Support
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
