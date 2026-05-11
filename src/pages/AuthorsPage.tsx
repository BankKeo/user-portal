import { Link } from "react-router-dom";
import { BookOpen, Quote, TrendingUp } from "lucide-react";
import { authors } from "../data/authors";

export default function AuthorsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Authors</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Meet the researchers contributing to JESAM
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {authors.map(author => {
          const initials = author.name
            .split(" ")
            .filter(p => !["Dr.", "Prof."].includes(p))
            .map(p => p[0])
            .join("")
            .slice(0, 2);
          return (
            <Link
              key={author.id}
              to={`/author/${author.id}`}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md hover:border-green-200 dark:hover:border-green-800 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-700 flex items-center justify-center text-white font-bold shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {author.name}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{author.institution}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{author.country}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {author.expertise.slice(0, 2).map(e => (
                  <span key={e} className="px-2 py-0.5 text-[10px] bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full">
                    {e}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{author.articleCount} articles</span>
                <span className="flex items-center gap-1"><Quote className="w-3.5 h-3.5" />{author.totalCitations.toLocaleString()}</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />h={author.hIndex}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
