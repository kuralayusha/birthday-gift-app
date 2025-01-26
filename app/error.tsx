"use client";

import { useEffect } from "react";

export const metadata = {
  title: "❌ An Error Occurred | Birthday Countdown",
  description:
    "🔧 We're sorry, something went wrong. Please refresh the page or try again later.",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-8 rounded-lg">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
          ⚠️
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We're sorry, but something went wrong. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
