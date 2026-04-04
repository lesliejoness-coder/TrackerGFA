// components/Sidebar.jsx
import React from "react";
import Dropdown from "./Dropdown";

const Sidebar = () => {
  return (
    <div className="
      h-screen bg-blue-900 text-white 
      w-64 
      hidden md:block   
    ">
      <h1 className="text-xl font-bold p-4">GFA</h1>

      <nav className="flex flex-col gap-2">
        <p className="px-4 py-2 hover:bg-gray-700">Tableau de bord</p>

        <Dropdown
          title="Gestion des groupes"
          items={["Filiales", "Agences"]}
        />

        <Dropdown
          title="Utilisateurs"
          items={["Utilisateur", "Rôle"]}
        />

        <p className="px-4 py-2 hover:bg-gray-700">Suivi des agences</p>
        <p className="px-4 py-2 hover:bg-gray-700">Rapports</p>
        <p className="px-4 py-2 hover:bg-gray-700">Paramètres</p>
      </nav>
    </div>
  );
};

export default Sidebar;