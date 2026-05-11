import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import { articles } from "../data/articles";
import { categories } from "../data/categories";
import type { SearchFilters } from "../types/public";

const YEARS = ["2025", "2024", "2023", "2022", "2021"];
type SortKey = "newest" | "popular" | "cited";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "",
    year: searchParams.get("year") ?? "",
    author: "",
    sortBy: "newest",
  });

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const cat = searchParams.get("category") ?? "";
    setFilters(prev => ({ ...prev, query: q, category: cat }));
  }, [searchParams]);

  const handleSearch = (q: string) => {
    setFilters(prev => ({ ...prev, query: q }));
    setSearchParams(prev => {
      if (q) prev.set("q", q); else prev.delete("q");
      return prev;
    });
  };

  const setFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ query: "", category: "", year: "", author: "", sortBy: "newest" });
    setSearchParams({});
  };

  const results = useMemo(() => {
    let list = [...articles];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.abstract.toLowerCase().includes(q) ||
        a.keywords.some(k => k.toLowerCase().includes(q)) ||
        a.authorNames.some(n => n.toLowerCase().includes(q))
      );
    }

    if (filters.category) {
      list = list.filter(a => a.category === filters.category);
    }

    if (filters.year) {
      list = list.filter(a => new Date(a.publishedDate).getFullYear().toString() === filters.year);
    }

    if (filters.author) {
      const auth = filters.author.toLowerCase();
      list = list.filter(a => a.authorNames.some(n => n.toLowerCase().includes(auth)));
    }

    if (filters.sortBy === "newest") {
      list.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else if (filters.sortBy === "popular") {
      list.sort((a, b) => b.views - a.views);
    } else {
      list.sort((a, b) => b.citations - a.citations);
    }

    return list;
  }, [filters]);

  const activeFilterCount = [filters.category, filters.year, filters.author].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Search Articles</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {results.length} article{results.length !== 1 ? "s" : ""} found
          {filters.query && <> for "<span className="text-green-700 dark:text-green-400 font-medium">{filters.query}</span>"</>}
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <SearchBar
          defaultValue={filters.query}
          onSearch={handleSearch}
          placeholder="Search by title, abstract, keyword, or author…"
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Filters</h2>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Category</p>
              <div className="space-y-1">
                <button
                  onClick={() => setFilter("category", "")}
                  className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors ${!filters.category ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  All categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter("category", filters.category === cat.id ? "" : cat.id)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors flex items-center justify-between ${filters.category === cat.id ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-gray-400">{cat.articleCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Year filter */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Year</p>
              <div className="space-y-1">
                <button
                  onClick={() => setFilter("year", "")}
                  className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors ${!filters.year ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  All years
                </button>
                {YEARS.map(y => (
                  <button
                    key={y}
                    onClick={() => setFilter("year", filters.year === y ? "" : y)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors ${filters.year === y ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Author filter */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Author</p>
              <input
                type="text"
                value={filters.author}
                onChange={e => setFilter("author", e.target.value)}
                placeholder="Filter by author…"
                className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          </div>
        </aside>

        {/* Main results */}
        <div className="flex-1 min-w-0">
          {/* Mobile filters + sort bar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button
              onClick={() => setFiltersOpen(p => !p)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {activeFilterCount > 0 && <span className="bg-green-700 text-white text-xs px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}
              {filtersOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Sort */}
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-gray-500 dark:text-gray-400">Sort:</span>
              {(["newest", "popular", "cited"] as SortKey[]).map(s => (
                <button
                  key={s}
                  onClick={() => setFilter("sortBy", s)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors capitalize ${
                    filters.sortBy === s
                      ? "bg-green-700 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-green-400"
                  }`}
                >
                  {s === "cited" ? "Most Cited" : s === "popular" ? "Most Viewed" : "Newest"}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filter panel */}
          {filtersOpen && (
            <div className="lg:hidden mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Category</p>
                  <select
                    value={filters.category}
                    onChange={e => setFilter("category", e.target.value)}
                    className="w-full text-sm px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
                  >
                    <option value="">All categories</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Year</p>
                  <select
                    value={filters.year}
                    onChange={e => setFilter("year", e.target.value)}
                    className="w-full text-sm px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
                  >
                    <option value="">All years</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {filters.category && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs rounded-full border border-green-200 dark:border-green-800">
                  {categories.find(c => c.id === filters.category)?.name}
                  <button onClick={() => setFilter("category", "")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.year && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs rounded-full border border-green-200 dark:border-green-800">
                  {filters.year}
                  <button onClick={() => setFilter("year", "")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.author && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs rounded-full border border-green-200 dark:border-green-800">
                  Author: {filters.author}
                  <button onClick={() => setFilter("author", "")}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Results */}
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
