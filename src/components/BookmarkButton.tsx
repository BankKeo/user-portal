import { Bookmark } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  articleId: string;
  size?: "sm" | "md";
}

export default function BookmarkButton({ articleId, size = "md" }: Props) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const saved = isBookmarked(articleId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { navigate("/login"); return; }
    toggleBookmark(articleId);
  };

  const sz = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const pad = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      onClick={handleClick}
      title={saved ? "Remove bookmark" : "Save article"}
      className={`${pad} rounded-md transition-colors ${
        saved
          ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40 hover:bg-green-100 dark:hover:bg-green-950/60"
          : "text-gray-400 hover:text-green-700 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      aria-label={saved ? "Remove bookmark" : "Bookmark article"}
    >
      <Bookmark className={sz} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
