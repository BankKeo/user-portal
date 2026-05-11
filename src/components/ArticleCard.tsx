import { Link } from "react-router-dom";
import { Eye, Download, Quote, Clock, Calendar } from "lucide-react";
import type { PublicArticle } from "../types/public";
import { categories } from "../data/categories";
import BookmarkButton from "./BookmarkButton";

interface Props {
  article: PublicArticle;
  variant?: "default" | "compact" | "featured";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric"
  });
}

function CategoryBadge({ categoryId }: { categoryId: string }) {
  const cat = categories.find(c => c.id === categoryId);
  if (!cat) return null;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cat.bgColor} ${cat.color}`}>
      {cat.name}
    </span>
  );
}

export default function ArticleCard({ article, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <div className="flex gap-3 group">
        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${article.imageColor} shrink-0 flex items-center justify-center`}>
          <span className="text-white text-lg font-bold opacity-60">
            {article.volume}/{article.issue}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <CategoryBadge categoryId={article.category} />
          <Link to={`/article/${article.slug}`} className="block mt-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors leading-snug">
              {article.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{article.authorNames.join(", ")}</p>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
        <div className={`h-40 bg-gradient-to-br ${article.imageColor} relative`}>
          <div className="absolute inset-0 flex items-end p-4">
            <CategoryBadge categoryId={article.category} />
          </div>
          <div className="absolute top-3 right-3">
            <BookmarkButton articleId={article.id} size="sm" />
          </div>
        </div>
        <div className="p-5">
          <Link to={`/article/${article.slug}`}>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors leading-snug mb-2">
              {article.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{article.authorNames.join(", ")}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">{article.abstract}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{article.views.toLocaleString()}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readingTime} min</span>
            </div>
            <span>{formatDate(article.publishedDate)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition-all hover:border-green-200 dark:hover:border-green-800 group">
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${article.imageColor} shrink-0 flex items-center justify-center`}>
          <span className="text-white font-bold text-sm opacity-70">
            Vol.{article.volume}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <CategoryBadge categoryId={article.category} />
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(article.publishedDate)}
            </span>
          </div>
          <Link to={`/article/${article.slug}`}>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors leading-snug mb-1.5">
              {article.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{article.authorNames.join(" · ")}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">{article.abstract}</p>
        </div>
        <div className="shrink-0">
          <BookmarkButton articleId={article.id} size="sm" />
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{article.views.toLocaleString()} views</span>
        <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" />{article.downloads.toLocaleString()} downloads</span>
        <span className="flex items-center gap-1"><Quote className="w-3.5 h-3.5" />{article.citations} citations</span>
        <span className="flex items-center gap-1 ml-auto"><Clock className="w-3.5 h-3.5" />{article.readingTime} min read</span>
      </div>
    </article>
  );
}

export { CategoryBadge };
