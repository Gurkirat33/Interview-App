import { useNavigate } from "react-router-dom";

const UpgradeModal = ({ setModal }) => {
  const navigate = useNavigate();
  const goToPricing = () => {
    navigate("/pricing");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">
          Upgrade Your Plan
        </h2>
        <p className="mt-4 text-gray-600">
          Your free plan limit has been reached. To continue using our services,
          please upgrade to a premium plan.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setModal(false);
              navigate("/dashboard");
            }}
            className="mr-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setModal(false);
              navigate("/pricing");
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
