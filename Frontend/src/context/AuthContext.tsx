import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// User type definition
interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
}

// Context type definition
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  // Stable logout function using useCallback
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  // Fetch user profile if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const res = await axios.get(
            "https://moy-bank-backend.onrender.com/api/users/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(res.data);
        } catch (err) {
          console.error("❌ Auth fetch error:", err);
          logout();
        }
      }
    };

    fetchUser();
  }, [token, user, logout]);

  // Login function
  const login = async (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    await new Promise((res) => setTimeout(res, 200)); // Wait for token to update
    navigate("/dashboard");
  };

  // Context value
  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to consume auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};

export { AuthContext };
