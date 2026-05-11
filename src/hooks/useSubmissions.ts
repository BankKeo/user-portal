import { useState, useCallback } from "react";
import type { Article } from "../types/index";
import { MOCK_SUBMISSIONS } from "../data/submissions";

const KEY = "jesam-submissions";
const DEMO_EMAIL = "marko.peric@unizg.hr";

function loadStored(): Article[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveStored(items: Article[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function useSubmissions(userEmail: string | undefined) {
  const [stored, setStored] = useState<Article[]>(loadStored);

  // For the demo user merge in the pre-seeded mock data (deduplicated by id)
  const all: Article[] = (() => {
    const base = userEmail === DEMO_EMAIL ? [...MOCK_SUBMISSIONS] : [];
    const storedForUser = stored.filter(a => a.email === userEmail);
    const storedIds = new Set(storedForUser.map(a => a.id));
    return [...base.filter(a => !storedIds.has(a.id)), ...storedForUser];
  })();

  const addSubmission = useCallback((article: Article) => {
    setStored(prev => {
      const next = [article, ...prev];
      saveStored(next);
      return next;
    });
  }, []);

  return { submissions: all, addSubmission };
}
