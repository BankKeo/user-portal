import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ArticlePage from "./pages/ArticlePage";
import AuthorPage from "./pages/AuthorPage";
import AuthorsPage from "./pages/AuthorsPage";
import ProfilePage from "./pages/ProfilePage";
import AddArticlePage from "./pages/AddArticlePage";
import SubmissionDetailPage from "./pages/SubmissionDetailPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route path="author/:id" element={<AuthorPage />} />
            <Route path="authors" element={<AuthorsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="submit" element={<ProtectedRoute><AddArticlePage /></ProtectedRoute>} />
            <Route path="submission/:id" element={<ProtectedRoute><SubmissionDetailPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
