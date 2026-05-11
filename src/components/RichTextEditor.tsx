import { useRef, useEffect, useState, useCallback } from "react";
import {
  Bold, Italic, Underline, List, ListOrdered, Eraser,
} from "lucide-react";

interface Props {
  value?: string;
  onChange: (html: string) => void;
  placeholder?: string;
  hasError?: boolean;
  minWords?: number;
  maxWords?: number;
  rows?: number;
}

function countWords(html: string): number {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .trim();
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

interface ToolbarButtonProps {
  onMouseDown: (e: React.MouseEvent) => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}

function ToolBtn({ onMouseDown, title, active, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active
          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing…",
  hasError = false,
  minWords,
  maxWords,
  rows = 8,
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [words, setWords] = useState(() => countWords(value));

  // Set initial HTML once on mount only (uncontrolled after that)
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
      setWords(countWords(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = useCallback(() => {
    const html = editorRef.current?.innerHTML ?? "";
    setWords(countWords(html));
    onChange(html);
  }, [onChange]);

  // Preserve focus when toolbar button is pressed
  const exec = (command: string, arg?: string) => (e: React.MouseEvent) => {
    e.preventDefault();          // do not blur editor
    editorRef.current?.focus();
    document.execCommand(command, false, arg ?? undefined);
    const html = editorRef.current?.innerHTML ?? "";
    setWords(countWords(html));
    onChange(html);
  };

  const minOk = minWords === undefined || words >= minWords;
  const maxOk = maxWords === undefined || words <= maxWords;
  const wordCountColor =
    words === 0 ? "text-gray-400"
    : (!minOk || !maxOk) ? "text-amber-600 dark:text-amber-400"
    : "text-green-600 dark:text-green-400";

  const minHeight = `${rows * 1.625}rem`; // approx line-height × rows

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-colors focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent ${
        hasError
          ? "border-red-400 dark:border-red-500"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-3 py-2 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700 flex-wrap">
        <ToolBtn onMouseDown={exec("bold")} title="Bold (Ctrl+B)">
          <Bold className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onMouseDown={exec("italic")} title="Italic (Ctrl+I)">
          <Italic className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onMouseDown={exec("underline")} title="Underline (Ctrl+U)">
          <Underline className="w-3.5 h-3.5" />
        </ToolBtn>

        <span className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1.5" />

        <ToolBtn onMouseDown={exec("insertUnorderedList")} title="Bullet list">
          <List className="w-3.5 h-3.5" />
        </ToolBtn>
        <ToolBtn onMouseDown={exec("insertOrderedList")} title="Numbered list">
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolBtn>

        <span className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1.5" />

        <ToolBtn onMouseDown={exec("removeFormat")} title="Clear formatting">
          <Eraser className="w-3.5 h-3.5" />
        </ToolBtn>

        {/* Word count in toolbar */}
        <span className={`ml-auto text-xs font-medium tabular-nums ${wordCountColor}`}>
          {words}{maxWords ? ` / ${maxWords}` : ""} words
        </span>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className="abstract-editor w-full px-4 py-3 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 focus:outline-none rich-content leading-relaxed"
        style={{ minHeight }}
      />
    </div>
  );
}

export { countWords };
