import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { PublicArticle } from "../types/public";

interface Props {
  article: PublicArticle;
}

type Format = "APA" | "MLA" | "Chicago";

function formatCitation(article: PublicArticle, fmt: Format): string {
  const year = new Date(article.publishedDate).getFullYear();
  const authors = article.authorNames;

  if (fmt === "APA") {
    const authStr = authors.map(a => {
      const parts = a.replace(/^(Dr\.|Prof\.)\s+/, "").split(" ");
      const last = parts[parts.length - 1];
      const initials = parts.slice(0, -1).map(p => p[0] + ".").join(" ");
      return `${last}, ${initials}`;
    }).join(", & ");
    return `${authStr} (${year}). ${article.title}. Journal of Environmental Science and Applied Methodology, ${article.volume}(${article.issue}), ${article.pages}. https://doi.org/${article.doi}`;
  }

  if (fmt === "MLA") {
    const authStr = authors.length === 1
      ? authors[0].replace(/^(Dr\.|Prof\.)\s+/, "")
      : authors[0].replace(/^(Dr\.|Prof\.)\s+/, "") + ", et al.";
    return `${authStr}. "${article.title}." Journal of Environmental Science and Applied Methodology, vol. ${article.volume}, no. ${article.issue}, ${year}, pp. ${article.pages}. DOI: ${article.doi}.`;
  }

  // Chicago
  const authStr = authors.map(a => a.replace(/^(Dr\.|Prof\.)\s+/, "")).join(", and ");
  return `${authStr}. "${article.title}." Journal of Environmental Science and Applied Methodology ${article.volume}, no. ${article.issue} (${year}): ${article.pages}. https://doi.org/${article.doi}.`;
}

export default function CitationBox({ article }: Props) {
  const [format, setFormat] = useState<Format>("APA");
  const [copied, setCopied] = useState(false);

  const citation = formatCitation(article, format);

  const copy = async () => {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Cite this article</h3>
        <div className="flex gap-1">
          {(["APA", "MLA", "Chicago"] as Format[]).map(f => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                format === f
                  ? "bg-green-700 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pr-8 font-mono">
          {citation}
        </p>
        <button
          onClick={copy}
          className="absolute top-0 right-0 p-1.5 text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-colors"
          title="Copy citation"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          DOI: <a href={`https://doi.org/${article.doi}`} className="text-green-700 dark:text-green-400 hover:underline font-mono">{article.doi}</a>
        </p>
      </div>
    </div>
  );
}
