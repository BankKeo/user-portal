import { useSearchParams, Link } from "react-router-dom";
import { Bookmark, Clock, User, Trash2, LogOut, FileText } from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import SubmissionCard from "../components/SubmissionCard";
import { useAuth } from "../context/AuthContext";
import { useBookmarks } from "../hooks/useBookmarks";
import { useReadingHistory } from "../hooks/useReadingHistory";
import { useSubmissions } from "../hooks/useSubmissions";
import { getArticleById } from "../data/articles";

type Tab = "submissions" | "bookmarks" | "history" | "settings";

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = (searchParams.get("tab") as Tab) ?? "bookmarks";
  const { user, logout } = useAuth();
  const { bookmarks, clearBookmarks } = useBookmarks();
  const { history, clearHistory } = useReadingHistory();
  const { submissions } = useSubmissions(user?.email);

  const setTab = (t: Tab) => setSearchParams({ tab: t });

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center fade-in">
        <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center mx-auto mb-6">
          <User className="w-8 h-8 text-green-700 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign in to JESAM</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Create a free account to save articles, track your reading history, and personalize your experience.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-xl transition-colors"
        >
          Sign in
        </Link>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
          Free to use · No spam · Cancel anytime
        </p>
      </div>
    );
  }

  const bookmarkedArticles = bookmarks
    .map(b => getArticleById(b.articleId))
    .filter(Boolean);

  const historyArticles = history
    .map(h => getArticleById(h.articleId))
    .filter(Boolean);

  const tabs: { id: Tab; label: string; icon: typeof Bookmark; count?: number }[] = [
    { id: "submissions", label: "My Submissions", icon: FileText, count: submissions.length },
    { id: "bookmarks", label: "Saved", icon: Bookmark, count: bookmarks.length },
    { id: "history", label: "History", icon: Clock, count: history.length },
    { id: "settings", label: "Account", icon: User },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 fade-in">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="w-16 h-16 rounded-2xl bg-green-700 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {user.avatar}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.institution}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                tab === t.id
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full">
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === "submissions" && (
        <div className="fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              My Submissions ({submissions.length})
            </h2>
            <Link
              to="/submit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> New submission
            </Link>
          </div>
          {submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map(article => (
                <SubmissionCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">No submissions yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Submit your first manuscript to JESAM and track its progress here.
              </p>
              <Link
                to="/submit"
                className="text-sm text-green-700 dark:text-green-400 hover:underline"
              >
                Submit a manuscript →
              </Link>
            </div>
          )}
        </div>
      )}

      {tab === "bookmarks" && (
        <div className="fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Saved Articles ({bookmarks.length})
            </h2>
            {bookmarks.length > 0 && (
              <button
                onClick={clearBookmarks}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>
          {bookmarkedArticles.length > 0 ? (
            <div className="space-y-4">
              {bookmarkedArticles.map(article => article && (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Bookmark className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">No saved articles yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Click the bookmark icon on any article to save it here.
              </p>
              <Link
                to="/search"
                className="text-sm text-green-700 dark:text-green-400 hover:underline"
              >
                Browse articles →
              </Link>
            </div>
          )}
        </div>
      )}

      {tab === "history" && (
        <div className="fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Reading History ({history.length})
            </h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear history
              </button>
            )}
          </div>
          {historyArticles.length > 0 ? (
            <div className="space-y-4">
              {historyArticles.map((article, i) => article && (
                <div key={article.id}>
                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-1.5 ml-1">
                    <Clock className="w-3 h-3" />
                    {new Date(history[i]?.viewedAt ?? "").toLocaleDateString("en-GB", {
                      weekday: "short", day: "numeric", month: "short"
                    })}
                  </div>
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Clock className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">No reading history yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Articles you read will appear here.
              </p>
              <Link
                to="/"
                className="text-sm text-green-700 dark:text-green-400 hover:underline"
              >
                Discover articles →
              </Link>
            </div>
          )}
        </div>
      )}

      {tab === "settings" && (
        <div className="fade-in max-w-md">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Profile</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Full name</label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{user.name}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{user.email}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Institution</label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{user.institution}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Account</p>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
