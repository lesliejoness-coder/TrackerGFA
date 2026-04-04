import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Suspense, lazy } from "react";
import { AuthProvider, useAuth } from "./hooks/AuthContext.jsx";

import Login from "./components/Login/Login.jsx";

const Dashboard = lazy(() =>
  import("./components/Dashboard/page/dash.jsx")
);

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      Chargement...
                    </div>
                  }
                >
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;