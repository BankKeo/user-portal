import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { articles } from "../data/articles";

const SUGGESTIONS = [
  "Mediterranean climate change",
  "ocean acidification",
  "microplastic groundwater",
  "biodiversity loss",
  "urban heat island",
  "renewable energy agriculture",
  "bark beetle outbreak",
  "blue carbon seagrass",
];

interface Props {
  placeholder?: string;
  large?: boolean;
  defaultValue?: string;
  onSearch?: (q: string) => void;
}

export default function SearchBar({ placeholder = "Search articles, authors, keywords…", large = false, defaultValue = "", onSearch }: Props) {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [recentSearches] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("jesam-recent") ?? "[]"); } catch { return []; }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filtered = query.length > 1
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.keywords.some(k => k.toLowerCase().includes(query.toLowerCase())) ||
        a.authorNames.some(n => n.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = (q: string) => {
    if (!q.trim()) return;
    const recent: string[] = JSON.parse(localStorage.getItem("jesam-recent") ?? "[]");
    const updated = [q, ...recent.filter(r => r !== q)].slice(0, 5);
    localStorage.setItem("jesam-recent", JSON.stringify(updated));
    setOpen(false);
    if (onSearch) {
      onSearch(q);
    } else {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(query);
  };

  const textSize = large ? "text-base" : "text-sm";
  const padding = large ? "pl-12 pr-12 py-4" : "pl-10 pr-10 py-2.5";
  const iconSize = large ? "w-5 h-5 left-4" : "w-4 h-4 left-3";

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 ${iconSize} text-gray-400`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className={`w-full ${padding} ${textSize} bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow shadow-sm`}
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className={`absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-600`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
          {filtered.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-xs font-medium text-gray-400 uppercase tracking-wider">Articles</p>
              {filtered.map(article => (
                <button
                  key={article.id}
                  onClick={() => { navigate(`/article/${article.slug}`); setOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-900 dark:text-white line-clamp-1">{article.title}</span>
                </button>
              ))}
            </div>
          )}

          {query.length <= 1 && recentSearches.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" /> Recent
              </p>
              {recentSearches.map(s => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); submit(s); }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
                >
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{s}</span>
                </button>
              ))}
            </div>
          )}

          {query.length <= 1 && (
            <div className="pb-2">
              <p className="px-4 pt-3 pb-1 text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Trending
              </p>
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {SUGGESTIONS.slice(0, 6).map(s => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); submit(s); }}
                    className="px-3 py-1 text-xs bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
