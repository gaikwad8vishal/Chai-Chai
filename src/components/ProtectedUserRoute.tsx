import { Navigate, useLocation } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import axios from "axios";


const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  role: "USER" | "ADMIN" | "DELIVERY_PERSON";
}

interface ProtectedUserRouteProps {
  children: JSX.Element;
}

const ProtectedUserRoute: React.FC<ProtectedUserRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  const verifyAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await axios.get<{ user: User }>(`${backendurl}/user/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsAuthenticated(response.data.user.role === "USER");
    } catch (error) {
      console.error("Auth verification failed:", error);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedUserRoute;