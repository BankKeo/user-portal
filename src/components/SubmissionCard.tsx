import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown, ChevronUp, Clock, Users,
  ShieldCheck, Calendar, Tag,
} from "lucide-react";
import type { Article, Status } from "../types/index";
import { categories } from "../data/categories";

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<Status, { label: string; dot: string; badge: string }> = {
  "Submitted":        { label: "Submitted",        dot: "bg-blue-400",   badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400" },
  "Under Review":     { label: "Under Review",     dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" },
  "Revision Required":{ label: "Revision Required",dot: "bg-orange-400", badge: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400" },
  "Accepted":         { label: "Accepted",         dot: "bg-green-500",  badge: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400" },
  "Rejected":         { label: "Rejected",         dot: "bg-red-500",    badge: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400" },
  "Published":        { label: "Published",        dot: "bg-emerald-600",badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" },
};

// ─── Plagiarism bar ───────────────────────────────────────────────────────────

function PlagBar({ score }: { score: number }) {
  const color = score === 0 ? "bg-gray-200 dark:bg-gray-700"
    : score <= 10 ? "bg-green-500"
    : score <= 20 ? "bg-amber-500"
    : "bg-red-500";
  const label = score === 0 ? "Not checked" : `${score}%`;
  const textColor = score === 0 ? "text-gray-400"
    : score <= 10 ? "text-green-700 dark:text-green-400"
    : score <= 20 ? "text-amber-700 dark:text-amber-400"
    : "text-red-700 dark:text-red-400";

  return (
    <div className="flex items-center gap-2">
      <ShieldCheck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: score === 0 ? "0%" : `${Math.min(score, 100)}%` }}
        />
      </div>
      <span className={`text-xs font-medium tabular-nums w-16 ${textColor}`}>
        {score === 0 ? "Pending" : `Similarity ${label}`}
      </span>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

function Timeline({ events }: { events: Article["timeline"] }) {
  return (
    <div className="space-y-0">
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        const date = new Date(event.date).toLocaleDateString("en-GB", {
          day: "numeric", month: "short", year: "numeric",
        });
        return (
          <div key={i} className="flex gap-3">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                isLast ? "bg-green-600 ring-2 ring-green-200 dark:ring-green-800" : "bg-gray-300 dark:bg-gray-600"
              }`} />
              {!isLast && <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 my-1" />}
            </div>
            {/* Content */}
            <div className={`pb-4 ${isLast ? "" : ""}`}>
              <p className="text-sm text-gray-800 dark:text-gray-200">{event.action}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {date} · {event.by}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────

interface Props {
  article: Article;
}

export default function SubmissionCard({ article }: Props) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[article.status];
  const cat = categories.find(c => c.id === article.category);

  const submittedDate = new Date(article.submitted).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-green-200 dark:hover:border-green-800 transition-colors">

      {/* Top strip — status indicator */}
      <div className={`h-1 ${cfg.dot}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              {/* Status badge */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </span>
              {/* Category badge */}
              {cat && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cat.bgColor} ${cat.color}`}>
                  {cat.name}
                </span>
              )}
            </div>
            <Link
              to={`/submission/${article.id}`}
              className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              {article.title}
            </Link>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Submitted {submittedDate}
          </span>
          {article.reviewers.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {article.reviewers.length} reviewer{article.reviewers.length > 1 ? "s" : ""} assigned
            </span>
          )}
          <span className="flex items-center gap-1 font-mono">
            ID: JESAM-{new Date(article.submitted).getFullYear()}-{article.id.replace("sub-", "").toUpperCase()}
          </span>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Tag className="w-3.5 h-3.5 text-gray-400 self-center" />
          {article.keywords.map(kw => (
            <span key={kw} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
              {kw}
            </span>
          ))}
        </div>

        {/* Plagiarism score */}
        <PlagBar score={article.plagScore} />

        {/* Expand / collapse */}
        <button
          onClick={() => setOpen(p => !p)}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
        >
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {open ? "Hide" : "View"} timeline ({article.timeline.length} event{article.timeline.length !== 1 ? "s" : ""})
        </button>

        {/* Expandable detail */}
        {open && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 fade-in">

            {/* Reviewers */}
            {article.reviewers.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Assigned Reviewers
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.reviewers.map(r => (
                    <span key={r} className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Review Timeline
            </p>
            <Timeline events={article.timeline} />
          </div>
        )}
      </div>
    </div>
  );
}
