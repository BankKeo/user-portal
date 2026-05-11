import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { MockUser } from "../types/public";

const DEMO_EMAIL    = "marko.peric@unizg.hr";
const DEMO_PASSWORD = "demo1234";

const MOCK_USER: MockUser = {
  id: "user-001",
  name: "Marko Perić",
  email: DEMO_EMAIL,
  avatar: "MP",
  institution: "University of Zagreb",
};

interface AuthContextValue {
  user: MockUser | null;
  isLoading: boolean;
  loginError: string | null;
  login: (email: string, password: string, onSuccess?: () => void) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => {
    try {
      const saved = localStorage.getItem("jesam-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading]   = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = useCallback((email: string, password: string, onSuccess?: () => void) => {
    setIsLoading(true);
    setLoginError(null);
    setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setUser(MOCK_USER);
        localStorage.setItem("jesam-user", JSON.stringify(MOCK_USER));
        setIsLoading(false);
        onSuccess?.();
      } else {
        setLoginError("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setLoginError(null);
    localStorage.removeItem("jesam-user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, loginError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
