import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { useAuth } from "../../../hooks/AuthContext.jsx";
import Sidebar from "../Sidebar.jsx";
import Header from "../Header.jsx";
import StatCard from "../statCard.jsx";
const LazyChart = lazy(() => import("../chart.jsx"));

// Mock data fallback
const mockStats = {
  availability: "98.2%",
  incidents: "12",
  avgDelay: "1h 25min",
};

const mockAgencies = [
  { name: "Douala", status: "Bloqué", duration: "9h" },
  { name: "Yaoundé", status: "OK", duration: "0h" },
  { name: "Garoua", status: "Maintenance", duration: "2h" },
  { name: "Bafoussam", status: "Bloqué", duration: "5h" },
  { name: "Maroua", status: "OK", duration: "0h" },
];

const Dashboard = React.memo(() => {
  const { token, logout } = useAuth();
  const [stats, setStats] = useState(mockStats);
  const [agencies, setAgencies] = useState(mockAgencies);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      // Parallel fetches
      const [statsRes, agenciesRes] = await Promise.all([
        fetch("http://localhost:5000/api/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => (r.ok ? r.json() : null)),
        fetch("http://localhost:5000/api/agencies", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => (r.ok ? r.json() : null)),
      ]);

      setStats(statsRes || mockStats);
      setAgencies(agenciesRes || mockAgencies);
    } catch {
      // Fallback mock
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const downCount = useMemo(
    () => agencies.filter((a) => a.status === "Bloqué").length,
    [agencies],
  );

  const handleLogout = () => {
    logout();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        Chargement du tableau de bord...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {/* Stats grid - responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Disponibilité" value={stats.availability} />
            <StatCard title="Incidents" value={stats.incidents} />
            <StatCard title="Agences en panne" value={downCount.toString()} />
            <StatCard title="Délai moyen" value={stats.avgDelay} />
          </div>

          {/* Table + Chart grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Table - full width mobile, 2/3 desktop */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Suivi des agences
                </h3>
                <span className="text-sm text-gray-500">Live</span>
              </div>
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                        Agence
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                        Durée panne
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {agencies.map((agency, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">
                          {agency.name}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              agency.status === "OK"
                                ? "bg-green-100 text-green-800"
                                : agency.status === "Maintenance"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {agency.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">
                          {agency.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <Suspense
                fallback={
                  <div className="text-gray-500 text-center py-8">
                    Chargement du graphique...
                  </div>
                }
              >
                <LazyChart />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
});

export default Dashboard;
