import { useState, useCallback } from "react";
import type { BookmarkedArticle } from "../types/public";

const KEY = "jesam-bookmarks";

function load(): BookmarkedArticle[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(items: BookmarkedArticle[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>(load);

  const isBookmarked = useCallback(
    (articleId: string) => bookmarks.some(b => b.articleId === articleId),
    [bookmarks]
  );

  const toggleBookmark = useCallback((articleId: string) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.articleId === articleId);
      const next = exists
        ? prev.filter(b => b.articleId !== articleId)
        : [...prev, { articleId, savedAt: new Date().toISOString() }];
      save(next);
      return next;
    });
  }, []);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
    localStorage.removeItem(KEY);
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark, clearBookmarks };
}
