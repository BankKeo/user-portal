import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Calendar, Tag, Users, ShieldCheck,
  Clock, FileText, CheckCircle2, AlertTriangle, XCircle,
  BookOpen, RefreshCw,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSubmissions } from "../hooks/useSubmissions";
import { categories } from "../data/categories";
import type { Status } from "../types/index";

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  Status,
  { label: string; dot: string; badge: string; strip: string; icon: React.ElementType; callout?: string; calloutStyle?: string }
> = {
  "Submitted": {
    label: "Submitted",
    dot: "bg-blue-400",
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    strip: "bg-blue-400",
    icon: FileText,
    callout: "Your manuscript has been received. The editorial team will complete an initial desk review within 5–7 business days.",
    calloutStyle: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
  },
  "Under Review": {
    label: "Under Review",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    strip: "bg-amber-400",
    icon: Clock,
    callout: "Your manuscript has passed desk review and is now in the hands of peer reviewers. Decisions typically take 6–10 weeks.",
    calloutStyle: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
  },
  "Revision Required": {
    label: "Revision Required",
    dot: "bg-orange-400",
    badge: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
    strip: "bg-orange-400",
    icon: RefreshCw,
    callout: "The reviewers have requested revisions. Please address all comments and resubmit at your earliest convenience. Detailed feedback has been sent to your email.",
    calloutStyle: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300",
  },
  "Accepted": {
    label: "Accepted",
    dot: "bg-green-500",
    badge: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400",
    strip: "bg-green-500",
    icon: CheckCircle2,
    callout: "Congratulations — your manuscript has been accepted for publication in JESAM! The production team will be in touch shortly regarding proofs.",
    calloutStyle: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
  },
  "Rejected": {
    label: "Rejected",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    strip: "bg-red-500",
    icon: XCircle,
    callout: "After careful consideration, the editors have decided not to accept this manuscript. Reviewer feedback, where available, has been sent to your email.",
    calloutStyle: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
  },
  "Published": {
    label: "Published",
    dot: "bg-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    strip: "bg-emerald-600",
    icon: BookOpen,
    callout: "Your article is now live in JESAM and indexed for open access. Thank you for your contribution to environmental science.",
    calloutStyle: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
  },
};

// ─── Plagiarism bar ───────────────────────────────────────────────────────────

function PlagBar({ score }: { score: number }) {
  const color = score === 0 ? "bg-gray-200 dark:bg-gray-700"
    : score <= 10 ? "bg-green-500"
    : score <= 20 ? "bg-amber-500"
    : "bg-red-500";
  const textColor = score === 0 ? "text-gray-400 dark:text-gray-500"
    : score <= 10 ? "text-green-700 dark:text-green-400"
    : score <= 20 ? "text-amber-700 dark:text-amber-400"
    : "text-red-700 dark:text-red-400";
  const label = score === 0 ? "Not yet checked" : `${score}% similarity`;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Plagiarism Check</span>
        <span className={`text-xs font-semibold tabular-nums ${textColor}`}>{label}</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: score === 0 ? "0%" : `${Math.min(score, 100)}%` }}
        />
      </div>
      {score > 0 && (
        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
          {score <= 10 ? "Acceptable similarity level." : score <= 20 ? "Moderate similarity — may require attention." : "High similarity — please review your sources."}
        </p>
      )}
    </div>
  );
}

// ─── Full vertical timeline ───────────────────────────────────────────────────

function FullTimeline({ events }: { events: { date: string; action: string; by: string }[] }) {
  return (
    <div className="space-y-0">
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        const date = new Date(event.date).toLocaleDateString("en-GB", {
          day: "numeric", month: "long", year: "numeric",
        });
        return (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                isLast
                  ? "bg-green-600 ring-4 ring-green-100 dark:ring-green-900/40"
                  : "bg-gray-300 dark:bg-gray-600"
              }`} />
              {!isLast && <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 my-1.5" />}
            </div>
            <div className="pb-6">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{event.action}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{date} · {event.by}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function Section({ title, icon: Icon, children }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <Icon className="w-4 h-4 text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SubmissionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submissions } = useSubmissions(user?.email);

  const article = submissions.find(s => s.id === id);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center fade-in">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Sign in to view your submissions.</p>
        <Link to="/profile" className="text-sm text-green-700 dark:text-green-400 hover:underline">
          ← Back to profile
        </Link>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center fade-in">
        <AlertTriangle className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Submission not found</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          This submission doesn't exist or doesn't belong to your account.
        </p>
        <Link
          to="/profile?tab=submissions"
          className="text-sm text-green-700 dark:text-green-400 hover:underline"
        >
          ← Back to My Submissions
        </Link>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[article.status];
  const StatusIcon = cfg.icon;
  const cat = categories.find(c => c.id === article.category);

  const submittedDate = new Date(article.submitted).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  const manuscriptId = `JESAM-${new Date(article.submitted).getFullYear()}-${article.id.replace("sub-", "").toUpperCase()}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 fade-in">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Submissions
      </button>

      {/* Status strip header */}
      <div className={`h-1.5 rounded-t-2xl ${cfg.strip}`} />
      <div className="bg-white dark:bg-gray-900 border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-2xl px-6 py-6 mb-6">

        {/* Status badge + ID row */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.badge}`}>
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <StatusIcon className="w-3.5 h-3.5" />
            {cfg.label}
          </span>
          <span className="font-mono text-xs text-gray-400 dark:text-gray-500">{manuscriptId}</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-4">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Submitted {submittedDate}
          </span>
          {cat && (
            <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${cat.bgColor} ${cat.color}`}>
              {cat.name}
            </span>
          )}
          {article.reviewers.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {article.reviewers.length} reviewer{article.reviewers.length > 1 ? "s" : ""} assigned
            </span>
          )}
        </div>

        {/* Keywords */}
        <div className="flex items-center flex-wrap gap-1.5">
          <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {article.keywords.map(kw => (
            <span key={kw} className="px-2.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Status callout */}
      {cfg.callout && (
        <div className={`flex items-start gap-3 px-5 py-4 rounded-xl border mb-6 ${cfg.calloutStyle}`}>
          <StatusIcon className="w-4 h-4 mt-0.5 shrink-0" />
          <p className="text-sm leading-relaxed">{cfg.callout}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">

        {/* Left column */}
        <div className="space-y-6">

          {/* Abstract */}
          {article.abstract && article.abstract !== "<br>" && (
            <Section title="Abstract" icon={FileText}>
              <div
                className="rich-content text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.abstract }}
              />
            </Section>
          )}

          {/* Review timeline */}
          <Section title="Review Timeline" icon={Clock}>
            {article.timeline.length > 0 ? (
              <FullTimeline events={article.timeline} />
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500">No events recorded yet.</p>
            )}
          </Section>

        </div>

        {/* Right sidebar */}
        <div className="space-y-6">

          {/* Plagiarism */}
          <Section title="Similarity Report" icon={ShieldCheck}>
            <PlagBar score={article.plagScore} />
          </Section>

          {/* Reviewers */}
          {article.reviewers.length > 0 && (
            <Section title="Assigned Reviewers" icon={Users}>
              <div className="space-y-2">
                {article.reviewers.map(r => (
                  <div key={r} className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5 text-green-700 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{r}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Quick actions */}
          <Section title="Actions" icon={FileText}>
            <div className="space-y-2">
              <Link
                to="/submit"
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-xl transition-colors justify-center"
              >
                <FileText className="w-4 h-4" /> Submit New Manuscript
              </Link>
              <Link
                to="/profile?tab=submissions"
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors justify-center"
              >
                <ArrowLeft className="w-4 h-4" /> All My Submissions
              </Link>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}
