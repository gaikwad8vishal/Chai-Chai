import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  role: "USER" | "ADMIN" | "DELIVERY_PERSON";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDeliveryPerson: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyAuth = async (token: string) => {
    try {
      const response = await axios.get<{ user: User }>("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth verification failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyAuth(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      await verifyAuth(token);
    } catch (error) {
      throw new Error("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin: user ? user.isAdmin || user.role === "ADMIN" : false,
    isDeliveryPerson: user ? user.role === "DELIVERY_PERSON" : false,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};