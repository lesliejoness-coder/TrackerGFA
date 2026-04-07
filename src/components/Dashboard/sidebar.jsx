// components/Sidebar.jsx
import React from "react";
import Dropdown from "./Dropdown";

const Sidebar = ({ activePage, onNavigate }) => {
  const navItem = (page, label) => (
    <button
      onClick={() => onNavigate(page)}
      className={`w-full text-left px-4 py-2 transition-colors rounded-sm ${
        activePage === page
          ? "bg-blue-700 text-white font-medium"
          : "hover:bg-gray-700 text-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="h-screen bg-blue-900 text-white w-64 hidden md:flex flex-col">
      <h1 className="text-xl font-bold p-4 border-b border-blue-800">GFA</h1>

      <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {navItem("dashboard", "Tableau de bord")}

        <Dropdown
          title="Gestion des groupes"
          items={["Filiales", "Agences"]}
          onItemClick={(item) => {
            if (item === "Filiales" || item === "Agences") onNavigate("agences");
          }}
        />

        <Dropdown
          title="Utilisateurs"
          items={["Utilisateur", "Rôle"]}
          onItemClick={(item) => onNavigate("utilisateurs")}
        />

        {navItem("suivi", "Suivi des agences")}
        {navItem("rapports", "Rapports")}
        {navItem("parametres", "Paramètres")}
      </nav>
    </div>
  );
};

export default Sidebar;
