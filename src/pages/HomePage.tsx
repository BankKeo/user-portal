import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, FileText, Quote, TrendingUp, Sparkles } from "lucide-react";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";
import CategoryCard from "../components/CategoryCard";
import { articles, getFeaturedArticles, getTrendingArticles, getLatestArticles } from "../data/articles";
import { categories } from "../data/categories";

const TRENDING_TOPICS = [
  "Climate Adaptation", "Ocean Acidification", "Microplastics",
  "Carbon Sequestration", "Urban Heat Island", "Agrivoltaics",
  "Bark Beetle Outbreaks", "Blue Carbon", "Air Quality", "Biodiversity Loss",
  "Groundwater Contamination", "Pollinator Decline",
];

const stats = [
  { label: "Published Articles", value: "227", icon: FileText },
  { label: "Active Authors", value: "148", icon: Users },
  { label: "Total Citations", value: "15,420", icon: Quote },
  { label: "Open Access", value: "100%", icon: BookOpen },
];

export default function HomePage() {
  const featured = getFeaturedArticles();
  const trending = getTrendingArticles().slice(0, 4);
  const latest = getLatestArticles(6);
  const heroArticle = featured[0];

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 dark:from-gray-950 dark:via-green-950 dark:to-green-900">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: headline + search */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-800/50 dark:bg-green-900/50 border border-green-700/50 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs font-medium text-green-300">Volume 12, Issue 2 — 2025</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Advancing Environmental Science Through Open Research
              </h1>
              <p className="text-green-200/80 text-lg leading-relaxed mb-8">
                JESAM publishes peer-reviewed research in environmental science, ecology, and sustainability — free to read, forever.
              </p>
              <SearchBar large placeholder="Search 227 articles, authors, topics…" />
              <div className="mt-4 flex items-center gap-4">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-1.5 text-sm text-green-300 hover:text-white transition-colors"
                >
                  Browse all articles <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-green-700">·</span>
                <Link
                  to="/search?category=climate-change"
                  className="text-sm text-green-300 hover:text-white transition-colors"
                >
                  Climate Change
                </Link>
                <span className="text-green-700">·</span>
                <Link
                  to="/search?category=biodiversity"
                  className="text-sm text-green-300 hover:text-white transition-colors"
                >
                  Biodiversity
                </Link>
              </div>
            </div>

            {/* Right: hero article spotlight */}
            {heroArticle && (
              <div className="lg:block">
                <p className="text-xs font-medium text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> Research Spotlight
                </p>
                <Link to={`/article/${heroArticle.slug}`} className="group block">
                  <div className={`rounded-2xl bg-gradient-to-br ${heroArticle.imageColor} p-[1px]`}>
                    <div className="bg-green-950/90 dark:bg-gray-950/90 rounded-2xl p-5 h-full">
                      <div className="mb-3">
                        <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Featured Article</span>
                      </div>
                      <h2 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-green-300 transition-colors">
                        {heroArticle.title}
                      </h2>
                      <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4">
                        {heroArticle.abstract}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-300">{heroArticle.authorNames[0]}</p>
                          <p className="text-xs text-gray-500">{new Date(heroArticle.publishedDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-green-400 group-hover:gap-2 transition-all">
                          Read article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-200 dark:divide-gray-800">
            {stats.map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3 px-6 py-5">
                  <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-green-700 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending topics */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <TrendingUp className="w-3.5 h-3.5" /> Trending:
            </span>
            {TRENDING_TOPICS.map(topic => (
              <Link
                key={topic}
                to={`/search?q=${encodeURIComponent(topic)}`}
                className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full hover:border-green-400 hover:text-green-700 dark:hover:text-green-400 transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        {/* Featured articles */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Publications</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Editor-selected research of exceptional merit</p>
            </div>
            <Link to="/search" className="text-sm text-green-700 dark:text-green-400 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </section>

        {/* Two-column: Latest + Trending */}
        <div className="grid lg:grid-cols-3 gap-10 mb-14">
          {/* Latest articles */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Most recently published research</p>
              </div>
              <Link to="/search" className="text-sm text-green-700 dark:text-green-400 hover:underline flex items-center gap-1">
                All articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {latest.map(article => (
                <ArticleCard key={article.id} article={article} variant="default" />
              ))}
            </div>
          </section>

          {/* Sidebar: trending + quick links */}
          <aside>
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Trending Now</h2>
              <div className="space-y-5">
                {trending.map((article, i) => (
                  <div key={article.id} className="flex items-start gap-3 group">
                    <span className="text-2xl font-bold text-gray-200 dark:text-gray-700 leading-none w-6 shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <Link to={`/article/${article.slug}`}>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors leading-snug mb-1">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{article.authorNames[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick submit CTA */}
            <div className="bg-green-700 dark:bg-green-800 rounded-xl p-5 text-white">
              <h3 className="font-semibold mb-2">Submit Your Research</h3>
              <p className="text-sm text-green-100 leading-relaxed mb-4">
                JESAM welcomes high-quality manuscripts in environmental science and related disciplines.
              </p>
              <Link
                to="/submit"
                className="inline-flex items-center gap-1.5 text-sm font-medium bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                Author Guidelines <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>

        {/* Category grid */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Browse by Category</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Explore research across all environmental disciplines</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        {/* Recent issue highlight */}
        <section>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800/50 rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wider mb-1">Current Issue</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Volume 12, Issue 2 · 2025
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                  This issue features {articles.filter(a => a.volume === 12 && a.issue === 2).length} new articles spanning climate change, marine ecosystems, renewable energy, and sustainable agriculture.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  to="/search?volume=12&issue=2"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Read Issue <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
