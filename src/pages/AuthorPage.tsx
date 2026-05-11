import { useParams, Link } from "react-router-dom";
import { Mail, ExternalLink, BookOpen, Quote, TrendingUp, Globe } from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import { authors } from "../data/authors";
import { getArticlesByAuthor } from "../data/articles";

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const author = authors.find(a => a.id === id);
  const authorArticles = id ? getArticlesByAuthor(id) : [];

  if (!author) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center fade-in">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Author not found</h1>
        <Link to="/" className="text-sm text-green-700 dark:text-green-400 hover:underline">← Back to home</Link>
      </div>
    );
  }

  const initials = author.name.split(" ").filter(p => !["Dr.", "Prof."].includes(p)).map(p => p[0]).join("").slice(0, 2);

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <Link to="/authors" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 mb-6">
            ← All Authors
          </Link>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-20 h-20 rounded-2xl bg-green-700 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{author.name}</h1>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-0.5">{author.institution}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1 mt-0.5">
                <Globe className="w-3.5 h-3.5" />{author.country}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {author.expertise.map(e => (
                  <span key={e} className="px-2.5 py-1 text-xs bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                    {e}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${author.email}`} className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400">
                <Mail className="w-4 h-4" />{author.email}
              </a>
              {author.orcid && (
                <a href={`https://orcid.org/${author.orcid}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400">
                  <ExternalLink className="w-4 h-4" />ORCID: {author.orcid}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Articles", value: author.articleCount, icon: BookOpen },
            { label: "Citations", value: author.totalCitations.toLocaleString(), icon: Quote },
            { label: "h-Index", value: author.hIndex, icon: TrendingUp },
            { label: "Member Since", value: author.joinedYear, icon: Globe },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <Icon className="w-5 h-5 text-green-700 dark:text-green-400 mb-2" />
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bio */}
          <div className="lg:col-span-1">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Biography</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{author.bio}</p>
          </div>

          {/* Articles */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
              Published Articles ({authorArticles.length})
            </h2>
            {authorArticles.length > 0 ? (
              <div className="space-y-4">
                {authorArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No articles published yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
