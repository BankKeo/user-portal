import { Link } from "react-router-dom";
import { Eye, Clock } from "lucide-react";
import type { PublicArticle } from "../types/public";
import { CategoryBadge } from "./ArticleCard";

interface Props {
  articles: PublicArticle[];
}

export default function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Related Articles</h3>
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article.id} className="group">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${article.imageColor} shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <CategoryBadge categoryId={article.category} />
                </div>
                <Link to={`/article/${article.slug}`}>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors leading-snug">
                    {article.title}
                  </h4>
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{article.authorNames[0]}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime} min</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
