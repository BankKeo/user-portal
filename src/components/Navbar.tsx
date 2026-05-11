import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    Search,
    Menu,
    X,
    Sun,
    Moon,
    User,
    LogOut,
    Bookmark,
    Clock,
    ChevronDown,
    FilePlus,
    BookOpen,
} from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/download.png";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Articles", to: "/search" },
    { label: "Authors", to: "/authors" },
    { label: "About", to: "/about" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [userDropOpen, setUserDropOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, toggle } = useDarkMode();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    useEffect(() => {
        setMenuOpen(false);
        setSearchOpen(false);
        setUserDropOpen(false);
    }, [location.pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setSearchOpen(false);
        }
    };

    const isActive = (to: string) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-sm font-bold text-green-700 dark:text-green-400 tracking-widest">
                                JESAM
                            </span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    isActive(link.to)
                                        ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40"
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                        {/* Search toggle */}
                        {!searchOpen ? (
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Open search"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        ) : (
                            <form onSubmit={handleSearch} className="flex items-center gap-2">
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles…"
                                    className="w-48 sm:w-64 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setSearchOpen(false)}
                                    className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </form>
                        )}

                        {/* Dark mode toggle */}
                        <button
                            onClick={toggle}
                            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Auth */}
                        {/* Submit button — visible when logged in */}
                        {user && (
                            <Link
                                to="/submit"
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700 rounded-md hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
                            >
                                <FilePlus className="w-4 h-4" /> Submit
                            </Link>
                        )}

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserDropOpen((p) => !p)}
                                    className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-semibold">
                                        {user.avatar}
                                    </div>
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                                </button>
                                {userDropOpen && (
                                    <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                                        <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <User className="w-4 h-4" /> Profile
                                        </Link>
                                        <Link
                                            to="/profile?tab=bookmarks"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <Bookmark className="w-4 h-4" /> Saved Articles
                                        </Link>
                                        <Link
                                            to="/profile?tab=history"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <Clock className="w-4 h-4" /> Reading History
                                        </Link>
                                        <div className="border-t border-gray-100 dark:border-gray-800 mt-1">
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setUserDropOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-md transition-colors"
                            >
                                <BookOpen className="w-4 h-4" />
                                Sign in
                            </Link>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMenuOpen((p) => !p)}
                            className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 fade-in">
                    <nav className="flex flex-col px-4 py-3 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                    isActive(link.to)
                                        ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user && (
                            <Link
                                to="/submit"
                                className="mt-1 flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 rounded-md"
                            >
                                <FilePlus className="w-4 h-4" /> Submit a Manuscript
                            </Link>
                        )}
                        {!user && (
                            <Link
                                to="/login"
                                className="mt-2 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-md transition-colors"
                            >
                                Sign in with Google
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
