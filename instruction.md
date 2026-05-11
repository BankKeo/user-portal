Build a modern public-facing university journal platform for the JESAM Peer Review and Article Approval System (RER), focused on Environmental Science research publications.

Design Goal:
Create a premium academic research experience inspired by modern editorial platforms, scientific journals, and 2026 SaaS UI/UX trends.

Theme:

- Green and white university branding
- Modern academic aesthetic
- Elegant research publication design
- Reader-focused experience
- Responsive layout
- Accessibility-friendly UI

Tech Stack:

- React
- TypeScript
- Tailwind CSS
- React Router
- shadcn/ui
- Lucide React

Requirements:

- Mock/sample data only
- Component-based architecture
- Responsive design
- Dark mode support
- Modern animations and transitions
- Reader-friendly typography

Main Layout:

- Sticky navbar
- Responsive mobile menu
- Footer with journal information
- Search-focused navigation

Features:

- Homepage
- Article search
- Article detail pages
- Full reading experience
- Google authentication
- Bookmark system
- Author profiles
- Reading history
- Article submission (authenticated authors only)

Homepage:

- Hero research spotlight
- Featured publications
- Trending environmental topics
- Latest articles
- Search section
- Category grid
- Research statistics

Article Search:

- Real-time filtering
- Search suggestions
- Filter by category, author, year, keywords
- Sort by newest/popular

Article Reading Page:

- Full article content
- Sticky reading progress
- Abstract section — rendered as HTML (supports bold, italic, underline, lists)
- Citation box
- PDF viewer
- AI-generated summary
- Related articles
- Reader-friendly spacing

Article Submission Page (authenticated):

- Auth gate: sign-in prompt for unauthenticated users
- Article form fields:
  - Title (required)
  - Category (required dropdown)
  - Keywords (required, 3–10 tags; type and press Enter or comma to add)
  - Co-Authors (optional, add/remove rows: name, institution, email)
  - Abstract (required, 150–400 words, saved and stored as HTML)
  - Manuscript File (required, PDF only, max 20 MB, drag-and-drop upload zone)
- 3-step wizard:
  - Step 1 — Details: title, category, keywords, co-authors
  - Step 2 — Abstract: rich text editor (contentEditable; toolbar: Bold, Italic, Underline, Bullet List, Numbered List, Clear Format; live word count 150–400; stores innerHTML)
  - Step 3 — File: PDF drag-and-drop upload + submission summary
- Step progress indicator with back/next navigation
- Per-step validation with inline error messages
- Simulated submission with loading state
- Success screen with manuscript reference number (JESAM-YYYY-XXXXXX) and next-steps guide
- Success screen "Track My Submission" button links to profile submissions tab
- "Submit" button visible in navbar and mobile menu for logged-in users
- Abstract HTML rendered via dangerouslySetInnerHTML on the Article Reading Page
- Submitted article saved to localStorage via useSubmissions hook as an Article object with status "Submitted", empty reviewers, plagScore 0, and a single timeline event

Submission Tracking (Profile → My Submissions tab):

- Authenticated users can track all their submitted articles in the profile page
- "My Submissions" tab is the first and default tab in the profile
- Tab shows article count badge
- Each submission rendered as a SubmissionCard with:
  - Colored top strip and status badge per status: Submitted (blue), Under Review (amber), Revision Required (orange), Accepted (green), Rejected (red), Published (emerald)
  - Plagiarism similarity bar (green ≤10%, amber ≤20%, red >20%, "Pending" when 0)
  - Keywords as rounded tags
  - Manuscript ID as JESAM-{year}-{id}
  - Expandable timeline showing all review events (date, action, actor)
  - Assigned reviewers list in expandable section
- Empty state with link to submit a manuscript
- Demo user (marko.peric@unizg.hr) pre-seeded with 3 mock submissions at different statuses
- New submissions from the form are merged with mock data via useSubmissions hook (localStorage, deduplicated by id)
- Submission title is a link to the full Submission Detail Page

Submission Detail Page (/submission/:id):

- Accessible only to the owning authenticated user; shows "not found" for invalid/foreign IDs
- Colored status strip + header card: status badge with icon, manuscript ID, full title, submitted date, category badge, reviewer count, keywords
- Status callout banner with context-specific message per status (Submitted, Under Review, Revision Required, Accepted, Rejected, Published)
- Two-column layout (main + sidebar) on desktop, stacked on mobile
- Main column:
  - Abstract rendered as HTML (dangerouslySetInnerHTML with rich-content styles)
  - Reviewer Comments section (shown only when comments exist): each comment card has a header row with reviewer name, date, and recommendation badge (Accept/Minor Revision/Major Revision/Reject) color-coded by outcome; comment body is split on double-newlines into readable paragraphs
  - Full vertical review timeline (all events, latest dot highlighted in green)
- Sidebar:
  - Plagiarism similarity progress bar with descriptive text
  - Assigned reviewers list with avatar initials
  - Quick action buttons: Submit New Manuscript, All My Submissions
- Back button navigates to previous page
- Route: /submission/:id

Route Protection:

- /submit and /submission/:id are protected by ProtectedRoute component
- Unauthenticated users visiting protected routes are redirected to /
- Login page removed; no dedicated sign-in route

User Features:

- User profile
- Saved articles
- Reading history
- Submission tracking
- Dark mode

Design System:

- Rounded cards
- Soft shadows
- Spacious layout
- Editorial typography
- Smooth transitions
- Elegant status indicators

Folder Structure:

- /components
- /pages
- /layouts
- /data
- /types
- /hooks
