import { useState, useCallback } from "react";
import type { HistoryEntry } from "../types/public";

const KEY = "jesam-history";
const MAX = 50;

function load(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(items: HistoryEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function useReadingHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(load);

  const addToHistory = useCallback((articleId: string, progress = 0) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.articleId !== articleId);
      const next = [{ articleId, viewedAt: new Date().toISOString(), progress }, ...filtered].slice(0, MAX);
      save(next);
      return next;
    });
  }, []);

  const updateProgress = useCallback((articleId: string, progress: number) => {
    setHistory(prev => {
      const next = prev.map(h => h.articleId === articleId ? { ...h, progress } : h);
      save(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(KEY);
  }, []);

  const getProgress = useCallback(
    (articleId: string) => history.find(h => h.articleId === articleId)?.progress ?? 0,
    [history]
  );

  return { history, addToHistory, updateProgress, clearHistory, getProgress };
}
