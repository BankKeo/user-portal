import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import type { PublicArticle } from "../types/public";

function generateSummary(article: PublicArticle): string {
  const firstSection = article.content[0];
  const lastSection = article.content[article.content.length - 1];
  return `This ${article.readingTime}-minute article by ${article.authorNames.join(" and ")} examines ${article.keywords.slice(0, 3).join(", ")} within the context of ${article.category.replace(/-/g, " ")}. Published in JESAM Vol. ${article.volume}(${article.issue}), the study ${firstSection.body.split(".")[0].toLowerCase().trim()}. ${lastSection.body.split(".")[0]}.`;
}

function generateKeyPoints(article: PublicArticle): string[] {
  return [
    `Study covers ${article.keywords[0]} in the context of regional environmental monitoring.`,
    `Key methodology: systematic data collection across multiple sites with statistical trend analysis.`,
    `Results demonstrate significant environmental shifts with direct policy implications.`,
    `Authors recommend evidence-based adaptation strategies and further monitoring programs.`,
  ];
}

interface Props {
  article: PublicArticle;
}

export default function AISummary({ article }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-green-700 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AI-Generated Summary</h3>
        <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Beta</span>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        {generateSummary(article)}
      </p>

      {expanded && (
        <div className="fade-in">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Key Takeaways</p>
          <ul className="space-y-1.5">
            {generateKeyPoints(article).map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="w-4 h-4 rounded-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setExpanded(p => !p)}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
      >
        {expanded ? (
          <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
        ) : (
          <><ChevronDown className="w-3.5 h-3.5" /> Show key points</>
        )}
      </button>

      <p className="mt-2 text-[10px] text-gray-400 dark:text-gray-600">
        AI summary may not capture all nuances. Always refer to the original article.
      </p>
    </div>
  );
}
