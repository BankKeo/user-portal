export interface PublicAuthor {
  id: string;
  name: string;
  institution: string;
  country: string;
  bio: string;
  expertise: string[];
  email: string;
  orcid?: string;
  hIndex: number;
  totalCitations: number;
  articleCount: number;
  joinedYear: number;
  avatar?: string;
}

export interface PublicArticle {
  id: string;
  title: string;
  slug: string;
  authors: string[]; // author IDs
  authorNames: string[];
  category: string;
  keywords: string[];
  abstract: string;
  content: ArticleSection[];
  publishedDate: string;
  volume: number;
  issue: number;
  pages: string;
  doi: string;
  views: number;
  downloads: number;
  citations: number;
  readingTime: number; // minutes
  featured: boolean;
  trending: boolean;
  hasPdf: boolean;
  imageColor: string; // tailwind color for placeholder
}

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  articleCount: number;
  color: string;
  bgColor: string;
  icon: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  year: string;
  author: string;
  sortBy: "newest" | "popular" | "cited";
}

export interface BookmarkedArticle {
  articleId: string;
  savedAt: string;
}

export interface HistoryEntry {
  articleId: string;
  viewedAt: string;
  progress: number;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  institution: string;
}
