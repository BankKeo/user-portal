import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar, Eye, Download, Quote,
  Clock, FileText, ExternalLink, Share2, Printer
} from "lucide-react";
import ReadingProgress from "../components/ReadingProgress";
import CitationBox from "../components/CitationBox";
import AISummary from "../components/AISummary";
import RelatedArticles from "../components/RelatedArticles";
import BookmarkButton from "../components/BookmarkButton";
import { CategoryBadge } from "../components/ArticleCard";
import { getArticleBySlug, getRelatedArticles } from "../data/articles";
import { authors } from "../data/authors";
import { useReadingHistory } from "../hooks/useReadingHistory";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToHistory } = useReadingHistory();

  const article = slug ? getArticleBySlug(slug) : undefined;
  const related = article ? getRelatedArticles(article.id, 4) : [];
  const articleAuthors = article
    ? authors.filter(a => article.authors.includes(a.id))
    : [];

  useEffect(() => {
    if (article) {
      addToHistory(article.id);
      window.scrollTo(0, 0);
    }
  }, [article?.id]);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-green-700 dark:text-green-400 hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const publishedDate = new Date(article.publishedDate).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <>
      <ReadingProgress />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 fade-in">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-gray-700 dark:hover:text-gray-200">Articles</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white truncate max-w-xs">{article.title.slice(0, 50)}…</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          {/* Main article */}
          <main>
            {/* Article header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <CategoryBadge categoryId={article.category} />
                {article.featured && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 rounded-full">Featured</span>
                )}
                {article.trending && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 rounded-full">Trending</span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {article.title}
              </h1>

              {/* Authors */}
              <div className="flex items-center gap-3 flex-wrap mb-4">
                {article.authorNames.map((name, i) => {
                  const author = articleAuthors.find(a => a.name === name);
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-700 dark:text-green-400 text-xs font-semibold">
                        {name.split(" ").filter(p => !["Dr.", "Prof."].includes(p)).map(p => p[0]).join("").slice(0, 2)}
                      </div>
                      {author ? (
                        <Link to={`/author/${author.id}`} className="text-sm font-medium text-green-700 dark:text-green-400 hover:underline">
                          {name}
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{name}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Metadata row */}
              <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500 dark:text-gray-400 pb-5 border-b border-gray-200 dark:border-gray-800">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{publishedDate}</span>
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" />Vol. {article.volume}, Issue {article.issue}, pp. {article.pages}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readingTime} min read</span>
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{article.views.toLocaleString()} views</span>
                <span className="flex items-center gap-1.5"><Quote className="w-4 h-4" />{article.citations} citations</span>
              </div>

              {/* Action row */}
              <div className="flex items-center gap-2 pt-4">
                <BookmarkButton articleId={article.id} />
                {article.hasPdf && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 rounded-md hover:border-green-300 transition-colors">
                    <Download className="w-4 h-4" /> PDF
                  </button>
                )}
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 rounded-md hover:border-green-300 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 rounded-md hover:border-green-300 transition-colors">
                  <Printer className="w-4 h-4" /> Print
                </button>
                <a
                  href={`https://doi.org/${article.doi}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 rounded-md hover:border-green-300 transition-colors ml-auto"
                >
                  <ExternalLink className="w-4 h-4" /> DOI
                </a>
              </div>
            </header>

            {/* Abstract */}
            <section className="mb-8">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/50 rounded-xl p-6">
                <h2 className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-widest mb-3">Abstract</h2>
                <div
                  className="font-reading text-gray-800 dark:text-gray-200 leading-relaxed rich-content"
                  dangerouslySetInnerHTML={{ __html: article.abstract }}
                />
              </div>
            </section>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 self-center">Keywords:</span>
              {article.keywords.map(kw => (
                <Link
                  key={kw}
                  to={`/search?q=${encodeURIComponent(kw)}`}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-700 dark:hover:text-green-400 transition-colors border border-gray-200 dark:border-gray-700"
                >
                  {kw}
                </Link>
              ))}
            </div>

            {/* Article body */}
            <article className="article-body font-reading">
              {article.content.map((section, i) => (
                <section key={i}>
                  <h2>{section.heading}</h2>
                  {section.body.split("\n\n").map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </section>
              ))}
            </article>

            {/* Downloads stat */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5"><Download className="w-4 h-4" />{article.downloads.toLocaleString()} downloads</span>
                <span className="flex items-center gap-1.5"><Quote className="w-4 h-4" />{article.citations} citations</span>
              </div>
            </div>

            {/* Author cards */}
            {articleAuthors.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">About the Author{articleAuthors.length > 1 ? "s" : ""}</h2>
                <div className="space-y-4">
                  {articleAuthors.map(author => (
                    <div key={author.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-700 dark:text-green-400 font-semibold text-sm shrink-0">
                        {author.name.split(" ").filter(p => !["Dr.", "Prof."].includes(p)).map(p => p[0]).join("").slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link to={`/author/${author.id}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-green-700 dark:hover:text-green-400 transition-colors">
                          {author.name}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{author.institution}, {author.country}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{author.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AISummary article={article} />
            <CitationBox article={article} />
            <RelatedArticles articles={related} />

            {/* PDF download CTA */}
            {article.hasPdf && (
              <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 text-white text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium mb-1">Full-text PDF</p>
                <p className="text-xs text-gray-400 mb-3">Free to download · CC BY 4.0</p>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-sm font-medium transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
