import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-2xl text-gray-600">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
