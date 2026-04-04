import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import "./Login.css";
import { useAuth } from "../../hooks/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple validation
    if (!form.email || !form.password) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    // Mock successful login for demo (no backend needed)
    setTimeout(() => {
      const mockToken = "mock-jwt-token-for-dashboard-demo";
      login(mockToken, form.email);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="background"></div>

      <div className="login-container">
        <div className="login-card">
          <h2>Connexion</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="error-message text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Connexion...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
