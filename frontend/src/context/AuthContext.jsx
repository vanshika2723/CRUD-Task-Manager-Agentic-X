import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

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
      return savedUser
        ? JSON.parse(savedUser)
        : null;
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
      const response = await fetch(
        `${AUTH_URL}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text ||
            "Backend API is not responding."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      if (!data.token) {
        throw new Error(
          "Login successful, but token was not received."
        );
      }

      // Save token
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Update React state
      setToken(data.token);
      setUser(data.user || null);

      return data;
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

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
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          text ||
            "Backend API is not responding."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Registration failed"
        );
      }

      if (!data.token) {
        throw new Error(
          "Registration successful, but token was not received."
        );
      }

      // Save token
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user
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
        error.message ||
          "Unable to register"
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