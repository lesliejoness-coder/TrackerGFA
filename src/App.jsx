import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Suspense, lazy } from "react";
import { AuthProvider, useAuth } from "./hooks/AuthContext.jsx";

import UtilisateursRoles from "./components/Dashboard/UtilisateursRoles.jsx";
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

          <Route
            path="/utilisateurs"
            element={
              <ProtectedRoute>
                <UtilisateursRoles />
              </ProtectedRoute>
            }
          />

          <Route
            path="/suivi-incidents"
            element={
              <ProtectedRoute>
                <div className="flex items-center justify-center min-h-screen">
                  Suivi Incidents (à venir)
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/filiales"
            element={
              <ProtectedRoute>
                <div className="flex items-center justify-center min-h-screen">Filiales (à venir)</div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/agences"
            element={
              <ProtectedRoute>
                <div className="flex items-center justify-center min-h-screen">Agences (à venir)</div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/rapports"
            element={
              <ProtectedRoute>
                <div className="flex items-center justify-center min-h-screen">Rapports (à venir)</div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/parametres"
            element={
              <ProtectedRoute>
                <div className="flex items-center justify-center min-h-screen">Paramètres (à venir)</div>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
