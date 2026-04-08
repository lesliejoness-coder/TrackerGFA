import React, { useState, useMemo } from "react";

/* ================= SIDEBAR ================= */
const Sidebar = ({ activePage, onNavigate }) => {
  const [openMenus, setOpenMenus] = useState({ groupes: false, users: false });

  const toggle = (key) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const navItem = (page, label) => (
    <button
      onClick={() => onNavigate(page)}
      className={`w-full text-left px-4 py-2.5 text-sm ${
        activePage === page
          ? "bg-blue-700 text-white"
          : "text-gray-200 hover:bg-blue-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="h-screen bg-blue-900 text-white w-64 hidden md:flex flex-col">
      <div className="text-2xl font-bold px-4 py-5 border-b border-blue-800">
        GFA
      </div>

      <nav className="flex flex-col gap-1 p-2 flex-1">
        {navItem("dashboard", "Tableau de bord")}

        <button onClick={() => toggle("groupes")} className="px-4 py-2 text-left">
          Gestion des groupes
        </button>

        {openMenus.groupes && (
          <>
            {navItem("filiales", "Filiales")}
            {navItem("agences", "Agences")}
          </>
        )}

        <button onClick={() => toggle("users")} className="px-4 py-2 text-left">
          Utilisateurs
        </button>

        {openMenus.users && (
          <>
            {navItem("utilisateurs", "Utilisateur")}
            {navItem("roles", "Rôle")}
          </>
        )}

        {navItem("suivi", "Suivi")}
        {navItem("rapports", "Rapports")}
        {navItem("parametres", "Paramètres")}
      </nav>
    </div>
  );
};

/* ================= HEADER ================= */
const Header = () => (
  <div className="w-full px-4 py-3 bg-white shadow">
    <input
      type="text"
      placeholder="Rechercher..."
      className="px-3 py-2 border rounded"
    />
  </div>
);

/* ================= STAT CARD ================= */
const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-xl font-bold">{value || "—"}</p>
  </div>
);

/* ================= DASHBOARD HOME ================= */
const DashboardHome = () => {
  const stats = {
    availability: "98%",
    incidents: "12",
    avgDelay: "1h",
  };

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Disponibilité" value={stats.availability} />
        <StatCard title="Incidents" value={stats.incidents} />
        <StatCard title="Délai moyen" value={stats.avgDelay} />
      </div>
    </div>
  );
};

/* ================= PAGES ================= */
const EmptyPage = ({ title }) => (
  <div className="p-6 text-gray-500">{title} - Aucune donnée</div>
);

const FilialesPage = () => <EmptyPage title="Filiales" />;
const AgencesPage = () => <EmptyPage title="Agences" />;
const UtilisateursPage = () => <EmptyPage title="Utilisateurs" />;
const RolesPage = () => <EmptyPage title="Rôles" />;
const SuiviPage = () => <EmptyPage title="Suivi" />;
const RapportsPage = () => <EmptyPage title="Rapports" />;
const ParametresPage = () => <EmptyPage title="Paramètres" />;

/* ================= MAIN DASHBOARD ================= */
const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;
      case "filiales":
        return <FilialesPage />;
      case "agences":
        return <AgencesPage />;
      case "utilisateurs":
        return <UtilisateursPage />;
      case "roles":
        return <RolesPage />;
      case "suivi":
        return <SuiviPage />;
      case "rapports":
        return <RapportsPage />;
      case "parametres":
        return <ParametresPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto">{renderPage()}</div>
      </div>
    </div>
  );
};

export default Dashboard;