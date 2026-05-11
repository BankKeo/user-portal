export type Status =
  | "Submitted"
  | "Under Review"
  | "Revision Required"
  | "Accepted"
  | "Rejected"
  | "Published";

export type Role = "Admin" | "Editor" | "Reviewer" | "Author";

export interface ReviewerComment {
  reviewer: string;
  date: string;
  recommendation?: Recommendation;
  comment: string;
}

export interface Article {
  id: string;
  title: string;
  author: string;
  email: string;
  category: string;
  status: Status;
  submitted: string;
  reviewers: string[];
  plagScore: number;
  abstract: string;
  keywords: string[];
  timeline: { date: string; action: string; by: string }[];
  reviewerComments?: ReviewerComment[];
}

export type ReviewStatus = "Pending" | "Completed" | "Overdue" | "Declined";
export type Recommendation = "Accept" | "Minor Revision" | "Major Revision" | "Reject";

export interface ReviewRecord {
  articleId: string;
  title: string;
  author: string;
  category: string;
  assignedDate: string;
  dueDate: string;
  completedDate?: string;
  status: ReviewStatus;
  recommendation?: Recommendation;
  rating?: number;
}

export interface Reviewer {
  id: string;
  name: string;
  institution: string;
  email: string;
  expertise: string[];
  assigned: number;
  completed: number;
  rating: number;
  active: boolean;
  reviews: ReviewRecord[];
}

export type ActivityType =
  | "submission" | "revision" | "acceptance" | "rejection" | "publication"
  | "review_assigned" | "review_completed"
  | "login" | "profile_update" | "comment" | "settings_change" | "account_created";

export interface UserActivity {
  date: string;
  type: ActivityType;
  description: string;
  ref?: string;
}

export interface UserArticleSummary {
  id: string;
  title: string;
  category: string;
  status: Status;
  submitted: string;
  plagScore: number;
}

export interface User {
  id: string;
  name: string;
  institution: string;
  email: string;
  role: Role;
  active: boolean;
  joined: string;
  lastActive: string;
  articles: number;
  bio?: string;
  activity: UserActivity[];
  submittedArticles?: UserArticleSummary[];
}
