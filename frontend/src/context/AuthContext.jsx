import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

// Authentication API URL
const AUTH_URL = `${API_URL}/auth`;

export function AuthProvider({ children }) {
  // =====================================================
  // TOKEN
  // =====================================================

  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(false);

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Read response safely
      const contentType =
        response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text ||
            "Backend API is not responding. Please check your API URL and server."
        );
      }

      // Handle backend errors
      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Make sure token exists
      if (!data.token) {
        throw new Error(
          "Login successful, but token was not received from the server."
        );
      }

      // Save authentication data
      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Update state
      setToken(data.token);
      setUser(data.user || null);

      return data;
    } catch (error) {
      console.error("Login Error:", error);

      throw new Error(
        error.message || "Unable to login"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const register = async (
    name,
    email,
    password
  ) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${AUTH_URL}/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      // Read response safely
      const contentType =
        response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text ||
            "Backend API is not responding. Please check your API URL and server."
        );
      }

      // Handle backend errors
      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      // Make sure token exists
      if (!data.token) {
        throw new Error(
          "Registration successful, but token was not received from the server."
        );
      }

      // Save authentication data
      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Update state
      setToken(data.token);
      setUser(data.user || null);

      return data;
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      throw new Error(
        error.message || "Unable to register"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = {
    token,
    user,
    loading,

    isAuthenticated: Boolean(token),

    login,
    register,
    logout,
  };

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// =====================================================
// USE AUTH
// =====================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}