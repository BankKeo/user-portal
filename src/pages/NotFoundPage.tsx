import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center fade-in">
      <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center mb-6">
        <Leaf className="w-8 h-8 text-green-700 dark:text-green-400" />
      </div>
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">Page not found</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          to="/search"
          className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Browse Articles
        </Link>
      </div>
    </div>
  );
}
