import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { user, isLoading, loginError, login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") ?? "/profile";

    const [email, setEmail] = useState("marko.peric@unizg.hr");
    const [password, setPassword] = useState("demo1234");
    const [showPw, setShowPw] = useState(false);

    // Already logged in — bounce away
    useEffect(() => {
        if (user) navigate(redirect, { replace: true });
    }, [user, redirect, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password, () => navigate(redirect, { replace: true }));
    };

    const inputCls = (hasValue: boolean) =>
        `w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border ${
            hasValue ? "border-gray-300 dark:border-gray-600" : "border-gray-200 dark:border-gray-700"
        } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-colors`;

    return (
        <div className="min-h-[calc(100vh-4rem)] flex fade-in">
            {/* Right panel — sign-in form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Sign in As Author</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                        {redirect.startsWith("/submit")
                            ? "Sign in to submit a manuscript to JESAM."
                            : redirect.startsWith("/submission")
                              ? "Sign in to view your submission details."
                              : "Access your profile, submissions, and saved articles."}
                    </p>

                    {/* Error */}
                    {loginError && (
                        <div className="mb-5 flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {loginError}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@institution.edu"
                                required
                                autoComplete="email"
                                className={inputCls(!!email)}
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <button
                                    type="button"
                                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    tabIndex={-1}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    className={`${inputCls(!!password)} pr-11`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    tabIndex={-1}
                                    aria-label={showPw ? "Hide password" : "Show password"}
                                >
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-60 mt-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in…
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
