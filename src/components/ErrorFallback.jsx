import React from "react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-xl text-red-500 mb-4">
        Something went wrong
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {error.message}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}