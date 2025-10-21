import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 🔹 Login
  const handleLogin = async (email, password) => {
    const data = await authService.login(email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      const decoded = jwtDecode(data.token);
      setUser(decoded);
    }
    return data;
  };

  // 🔹 Logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // 🔹 Decode token on mount or token change
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          handleLogout();
        } else {
          setUser(decoded);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        handleLogout();
      }
    }
  }, [token]);

  const value = {
    user,
    userId: user?.id,
    token,
    isAuthenticated: !!token,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
