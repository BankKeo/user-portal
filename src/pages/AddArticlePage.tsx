import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Check, ChevronRight, ChevronLeft, Plus, X,
  FileText, User, Tag, AlignLeft, Paperclip, Send,
  AlertCircle, UploadCloud, File as FileIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSubmissions } from "../hooks/useSubmissions";
import { categories } from "../data/categories";
import RichTextEditor, { countWords } from "../components/RichTextEditor";
import type { Article } from "../types/index";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CoAuthor {
  name: string;
  institution: string;
  email: string;
}

interface ArticleForm {
  title: string;
  category: string;
  keywords: string[];
  coAuthors: CoAuthor[];
  abstract: string;   // stored as HTML
  file: File | null;
}

type FieldErrors = Partial<Record<string, string>>;

// ─── Step indicator ──────────────────────────────────────────────────────────

const STEPS = [
  { label: "Details",  icon: User },
  { label: "Abstract", icon: AlignLeft },
  { label: "File",     icon: Paperclip },
];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done   = i < current;
        const active = i === current;
        const Icon   = step.icon;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                done   ? "bg-green-700 text-white"
                : active ? "bg-green-700 text-white ring-4 ring-green-100 dark:ring-green-900/40"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400"
              }`}>
                {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-[11px] font-medium hidden sm:block ${
                active ? "text-green-700 dark:text-green-400" : "text-gray-400"
              }`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${
                i < current ? "bg-green-700" : "bg-gray-200 dark:bg-gray-700"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared field helpers ─────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{msg}
    </p>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
      {children}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{children}</p>;
}

function inputCls(hasError?: boolean) {
  return `w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border ${
    hasError
      ? "border-red-400 dark:border-red-500 focus:ring-red-500"
      : "border-gray-200 dark:border-gray-700 focus:ring-green-500"
  } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 transition-colors`;
}

// ─── Step 1: Manuscript Details ───────────────────────────────────────────────

function Step1({
  form, setForm, errors,
}: {
  form: ArticleForm;
  setForm: React.Dispatch<React.SetStateAction<ArticleForm>>;
  errors: FieldErrors;
}) {
  const [kwInput, setKwInput] = useState("");

  const addKeyword = (raw: string) => {
    const kw = raw.trim().toLowerCase().replace(/,+$/, "");
    if (!kw || form.keywords.includes(kw) || form.keywords.length >= 10) return;
    setForm(p => ({ ...p, keywords: [...p.keywords, kw] }));
    setKwInput("");
  };

  const removeKeyword = (kw: string) =>
    setForm(p => ({ ...p, keywords: p.keywords.filter(k => k !== kw) }));

  const handleKwKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addKeyword(kwInput); }
  };

  const addAuthor = () =>
    setForm(p => ({ ...p, coAuthors: [...p.coAuthors, { name: "", institution: "", email: "" }] }));

  const removeAuthor = (i: number) =>
    setForm(p => ({ ...p, coAuthors: p.coAuthors.filter((_, j) => j !== i) }));

  const updateAuthor = (i: number, field: keyof CoAuthor, val: string) =>
    setForm(p => ({
      ...p,
      coAuthors: p.coAuthors.map((a, j) => j === i ? { ...a, [field]: val } : a),
    }));

  return (
    <div className="space-y-6 fade-in">

      {/* Title */}
      <div>
        <Label required>Article Title</Label>
        <input
          type="text"
          value={form.title}
          onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          placeholder="Enter the full title of your manuscript…"
          className={inputCls(!!errors.title)}
        />
        <FieldError msg={errors.title} />
        <Hint>Use title case. Avoid abbreviations unless widely understood.</Hint>
      </div>

      {/* Category */}
      <div>
        <Label required>Research Category</Label>
        <select
          value={form.category}
          onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
          className={inputCls(!!errors.category)}
        >
          <option value="">Select a category…</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <FieldError msg={errors.category} />
      </div>

      {/* Keywords */}
      <div>
        <Label required>Keywords</Label>
        <div className={`flex flex-wrap gap-2 p-3 bg-white dark:bg-gray-800 border ${
          errors.keywords ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
        } rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-colors`}>
          {form.keywords.map(kw => (
            <span key={kw} className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-xs rounded-full font-medium border border-green-200 dark:border-green-800">
              <Tag className="w-3 h-3" />
              {kw}
              <button type="button" onClick={() => removeKeyword(kw)} className="text-green-500 hover:text-red-500 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {form.keywords.length < 10 && (
            <input
              type="text"
              value={kwInput}
              onChange={e => setKwInput(e.target.value)}
              onKeyDown={handleKwKey}
              onBlur={() => addKeyword(kwInput)}
              placeholder={form.keywords.length === 0 ? "Type a keyword, press Enter…" : "Add more…"}
              className="flex-1 min-w-32 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 py-0.5"
            />
          )}
        </div>
        <FieldError msg={errors.keywords} />
        <Hint>3–10 keywords. Press Enter or comma to add each one.</Hint>
      </div>

      {/* Co-authors */}
      <div>
        <Label>Co-Authors</Label>
        <Hint>Your name is included automatically as the corresponding author. Add any co-authors below.</Hint>
        <div className="mt-3 space-y-3">
          {form.coAuthors.map((author, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Co-Author {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeAuthor(i)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={author.name}
                  onChange={e => updateAuthor(i, "name", e.target.value)}
                  placeholder="Full name"
                  className={inputCls()}
                />
                <input
                  type="text"
                  value={author.institution}
                  onChange={e => updateAuthor(i, "institution", e.target.value)}
                  placeholder="Institution / Affiliation"
                  className={inputCls()}
                />
                <input
                  type="email"
                  value={author.email}
                  onChange={e => updateAuthor(i, "email", e.target.value)}
                  placeholder="Email address"
                  className={inputCls()}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addAuthor}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Co-Author
          </button>
        </div>
      </div>

    </div>
  );
}

// ─── Step 2: Abstract ─────────────────────────────────────────────────────────

function Step2({
  form, setForm, errors,
}: {
  form: ArticleForm;
  setForm: React.Dispatch<React.SetStateAction<ArticleForm>>;
  errors: FieldErrors;
}) {
  return (
    <div className="fade-in">
      <Label required>Abstract</Label>
      <RichTextEditor
        value={form.abstract}
        onChange={html => setForm(p => ({ ...p, abstract: html }))}
        placeholder="Write a concise abstract covering background, objectives, methods, key results, and conclusion…"
        hasError={!!errors.abstract}
        minWords={150}
        maxWords={400}
        rows={12}
      />
      <FieldError msg={errors.abstract} />
      <Hint>
        150–400 words. Use the toolbar to apply bold, italic, or lists. Saved as formatted HTML and displayed as-is on the article page.
      </Hint>
    </div>
  );
}

// ─── Step 3: File Upload & Submit ─────────────────────────────────────────────

function Step3({
  form, setForm, errors,
}: {
  form: ArticleForm;
  setForm: React.Dispatch<React.SetStateAction<ArticleForm>>;
  errors: FieldErrors;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const accept = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      setForm(p => ({ ...p, file: null }));
      return;
    }
    setForm(p => ({ ...p, file: f }));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    accept(e.dataTransfer.files);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fade-in space-y-6">

      {/* Drop zone */}
      <div>
        <Label required>Manuscript File (PDF)</Label>

        {form.file ? (
          /* File selected */
          <div className="flex items-center gap-4 p-5 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-green-700 flex items-center justify-center shrink-0">
              <FileIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{form.file.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                PDF · {formatSize(form.file.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForm(p => ({ ...p, file: null }))}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Drop zone */
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
              dragging
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : errors.file
                ? "border-red-400 dark:border-red-500 bg-red-50/30 dark:bg-red-950/10"
                : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-950/10"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              dragging ? "bg-green-100 dark:bg-green-900/40" : "bg-gray-100 dark:bg-gray-800"
            }`}>
              <UploadCloud className={`w-6 h-6 ${dragging ? "text-green-700 dark:text-green-400" : "text-gray-400"}`} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Drop your PDF here, or <span className="text-green-700 dark:text-green-400">browse</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF only · Max 20 MB</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={e => accept(e.target.files)}
            />
          </div>
        )}
        <FieldError msg={errors.file} />
      </div>

      {/* Submission summary */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Submission Summary</p>
        <dl className="space-y-2.5 text-sm">
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-gray-500 dark:text-gray-400">Title</dt>
            <dd className="text-gray-900 dark:text-white font-medium line-clamp-1">{form.title || "—"}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-gray-500 dark:text-gray-400">Category</dt>
            <dd className="text-gray-900 dark:text-white">
              {categories.find(c => c.id === form.category)?.name ?? "—"}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-gray-500 dark:text-gray-400">Keywords</dt>
            <dd className="text-gray-900 dark:text-white">{form.keywords.join(", ") || "—"}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-gray-500 dark:text-gray-400">Co-Authors</dt>
            <dd className="text-gray-900 dark:text-white">
              {form.coAuthors.filter(a => a.name).map(a => a.name).join(", ") || "None"}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-gray-500 dark:text-gray-400">Abstract</dt>
            <dd className="text-gray-900 dark:text-white">{countWords(form.abstract)} words</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-gray-500 dark:text-gray-400">File</dt>
            <dd className="text-gray-900 dark:text-white">{form.file ? form.file.name : "Not attached"}</dd>
          </div>
        </dl>
      </div>

    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).slice(2, 8); }

function SuccessScreen({ refId }: { refId: string }) {
  return (
    <div className="text-center py-10 fade-in">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-5">
        <Check className="w-8 h-8 text-green-700 dark:text-green-400" strokeWidth={2.5} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Manuscript Submitted!</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-1">Your reference number:</p>
      <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-base font-semibold text-gray-900 dark:text-white mb-6">
        JESAM-{new Date().getFullYear()}-{refId.toUpperCase()}
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 max-w-md mx-auto text-left mb-8">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">What happens next?</p>
        <ol className="space-y-2">
          {[
            "Email confirmation within 24 hours.",
            "Editorial desk review within 5–7 business days.",
            "If suitable, assigned to expert peer reviewers.",
            "Decision communicated within 6–10 weeks.",
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link to="/profile?tab=submissions" className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-xl transition-colors">
          Track My Submission
        </Link>
        <Link to="/" className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(step: number, form: ArticleForm): FieldErrors {
  const errors: FieldErrors = {};
  if (step === 0) {
    if (!form.title.trim()) errors.title = "Title is required.";
    else if (form.title.trim().split(" ").length < 4) errors.title = "Title should be more descriptive (at least 4 words).";
    if (!form.category) errors.category = "Please select a research category.";
    if (form.keywords.length < 3) errors.keywords = "Please add at least 3 keywords.";
  }
  if (step === 1) {
    const w = countWords(form.abstract);
    if (!form.abstract || form.abstract === "<br>") errors.abstract = "Abstract is required.";
    else if (w < 150) errors.abstract = `Abstract too short (${w} words). Minimum 150.`;
    else if (w > 400) errors.abstract = `Abstract exceeds 400 words (${w} words).`;
  }
  if (step === 2) {
    if (!form.file) errors.file = "Please attach your manuscript as a PDF file.";
  }
  return errors;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AddArticlePage() {
  const { user } = useAuth();
  if (!user) return null; // ProtectedRoute guarantees user is set
  const { addSubmission } = useSubmissions(user?.email);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const [form, setForm] = useState<ArticleForm>({
    title: "",
    category: "",
    keywords: [],
    coAuthors: [],
    abstract: "",
    file: null,
  });

  const next = useCallback(() => {
    const errs = validate(step, form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, form]);

  const back = () => {
    setErrors({});
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    const errs = validate(2, form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setTimeout(() => {
      const refId = uid();
      const today = new Date().toISOString().split("T")[0];
      const newArticle: Article = {
        id: `sub-${refId}`,
        title: form.title,
        author: user!.name,
        email: user!.email,
        category: form.category,
        status: "Submitted",
        submitted: today,
        reviewers: [],
        plagScore: 0,
        abstract: form.abstract,
        keywords: form.keywords,
        timeline: [{ date: today, action: "Manuscript submitted", by: user!.name }],
      };
      addSubmission(newArticle);
      setSubmitting(false);
      setSubmitted(refId);
    }, 1800);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <SuccessScreen refId={submitted} />
      </div>
    );
  }

  const stepProps = { form, setForm, errors };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 fade-in">

      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-green-700 flex items-center justify-center shrink-0">
          <FileText className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Submit a Manuscript</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">JESAM · Open Access · CC BY 4.0</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-semibold">
            {user.avatar}
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">{user.name}</span>
        </div>
      </div>

      {/* Step bar */}
      <StepBar current={step} />

      {/* Step card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          {STEPS[step].label}
        </h2>
        {step === 0 && <Step1 {...stepProps} />}
        {step === 1 && <Step2 {...stepProps} />}
        {step === 2 && <Step3 {...stepProps} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <span className="text-xs text-gray-400">Step {step + 1} of {STEPS.length}</span>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-xl transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-xl disabled:opacity-60 transition-colors"
          >
            {submitting
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
              : <><Send className="w-4 h-4" /> Submit Manuscript</>
            }
          </button>
        )}
      </div>
    </div>
  );
}
