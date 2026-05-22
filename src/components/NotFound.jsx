import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">

      <h1 className="text-6xl font-bold text-red-500 mb-4">
        404
      </h1>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for doesn’t exist.
      </p>

      <div className="flex gap-4">

        <Link
          to="/"
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}