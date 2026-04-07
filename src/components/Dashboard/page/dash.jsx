import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";

// ============================================================
// SIDEBAR
// ============================================================
const Sidebar = ({ activePage, onNavigate }) => {
  const [openMenus, setOpenMenus] = useState({ groupes: false, users: false });

  const toggle = (key) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const navItem = (page, label) => (
    <button
      onClick={() => onNavigate(page)}
      className={`w-full text-left px-4 py-2.5 text-sm transition-colors rounded-sm ${
        activePage === page
          ? "bg-blue-700 text-white font-medium"
          : "text-gray-200 hover:bg-blue-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="h-screen bg-blue-900 text-white w-64 hidden md:flex flex-col flex-shrink-0 overflow-y-auto">
      <div className="text-2xl font-bold px-4 py-5 border-b border-blue-800">
        GFA
      </div>

      <nav className="flex flex-col gap-1 p-2 flex-1">
        {navItem("dashboard", "Tableau de bord")}

        {/* Gestion des groupes */}
        <div>
          <button
            onClick={() => toggle("groupes")}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-blue-800 flex items-center justify-between"
          >
            <span>Gestion des groupes</span>
            <span className="text-xs">{openMenus.groupes ? "▾" : "▸"}</span>
          </button>
          {openMenus.groupes && (
            <div className="ml-2 border-l border-blue-700 pl-2">
              <button
                onClick={() => onNavigate("filiales")}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  activePage === "filiales"
                    ? "bg-blue-700 text-white font-medium rounded"
                    : "text-gray-300 hover:bg-blue-800 hover:text-white"
                }`}
              >
                Filiales
              </button>
              <button
                onClick={() => onNavigate("agences")}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  activePage === "agences"
                    ? "bg-blue-700 text-white font-medium rounded"
                    : "text-gray-300 hover:bg-blue-800 hover:text-white"
                }`}
              >
                Agences
              </button>
            </div>
          )}
        </div>

        {/* Utilisateurs */}
        <div>
          <button
            onClick={() => toggle("users")}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-blue-800 flex items-center justify-between"
          >
            <span>Utilisateurs</span>
            <span className="text-xs">{openMenus.users ? "▾" : "▸"}</span>
          </button>
          {openMenus.users && (
            <div className="ml-2 border-l border-blue-700 pl-2">
              <button
                onClick={() => onNavigate("utilisateurs")}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  activePage === "utilisateurs"
                    ? "bg-blue-700 text-white font-medium rounded"
                    : "text-gray-300 hover:bg-blue-800 hover:text-white"
                }`}
              >
                Utilisateur
              </button>
              <button
                onClick={() => onNavigate("roles")}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  activePage === "roles"
                    ? "bg-blue-700 text-white font-medium rounded"
                    : "text-gray-300 hover:bg-blue-800 hover:text-white"
                }`}
              >
                Rôle
              </button>
            </div>
          )}
        </div>

        {navItem("suivi", "Suivi des agences")}
        {navItem("rapports", "Rapports")}
        {navItem("parametres", "Paramètres")}
      </nav>
    </div>
  );
};

// ============================================================
// HEADER
// ============================================================
const Header = ({ onNavigate }) => {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/40");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b flex-shrink-0">
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-full md:w-1/3 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex items-center gap-3 ml-4">
        <label className="cursor-pointer">
          <img
            src={avatar}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-200"
          />
          <input type="file" hidden onChange={handleChange} />
        </label>
        <div className="hidden sm:block">
          <p className="font-semibold text-sm text-gray-800">Leslie</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// STAT CARD
// ============================================================
const StatCard = ({ title, value, color = "blue" }) => {
  const colors = {
    blue: "text-blue-900",
    red: "text-red-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border w-full">
      <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
      <p className={`text-2xl font-bold ${colors[color]}`}>{value || "—"}</p>
    </div>
  );
};

// ============================================================
// MODAL
// ============================================================
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
        >
          ×
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

// ============================================================
// PAGE VIDE (pour les pages sans données encore)
// ============================================================
const EmptyPage = ({ title, description, icon }) => (
  <div className="flex-1 flex flex-col overflow-hidden">
    <div className="px-6 py-5 bg-white border-b">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500 mt-0.5">{description}</p>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Aucune donnée disponible
      </h2>
      <p className="text-sm text-gray-400 max-w-sm">
        Cette section sera alimentée automatiquement une fois la base de données
        connectée.
      </p>
    </div>
  </div>
);

// ============================================================
// PAGE TABLEAU DE BORD
// ============================================================
const DashboardPage = ({ stats, agencies, downCount }) => {
  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Disponibilité" value={stats?.availability} color="blue" />
        <StatCard title="Incidents" value={stats?.incidents} color="red" />
        <StatCard title="Agences en panne" value={downCount?.toString()} color="red" />
        <StatCard title="Délai moyen" value={stats?.avgDelay} color="yellow" />
      </div>

      {/* Table + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Suivi des agences
            </h3>
            <span className="text-sm text-gray-500 bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Agence
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Statut
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Durée panne
                  </th>
                </tr>
              </thead>
              <tbody>
                {agencies.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-400">
                      Aucune agence disponible
                    </td>
                  </tr>
                ) : (
                  agencies.map((agency, index) => (
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
                      <td className="py-4 px-4 text-gray-600">
                        {agency.duration}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Types de problèmes
          </h3>
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
            Graphique disponible après connexion BD
          </div>
        </div>
      </div>
    </main>
  );
};

// ============================================================
// PAGE AGENCES
// ============================================================
const AgencesPage = () => {
  const [modal, setModal] = useState(null);
  const [expandedFiliales, setExpandedFiliales] = useState({});
  const [expandedAgences, setExpandedAgences] = useState({});
  const [filiales, setFiliales] = useState([]);

  const toggleFiliale = (id) =>
    setExpandedFiliales((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleAgence = (id) =>
    setExpandedAgences((prev) => ({ ...prev, [id]: !prev[id] }));

  const statusBadge = (statut) => {
    const map = {
      Active: "bg-green-100 text-green-800",
      Bloqué: "bg-red-100 text-red-800",
      Maintenance: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
          map[statut] || "bg-gray-100 text-gray-700"
        }`}
      >
        {statut || "Inconnu"}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header page */}
      <div className="px-6 py-5 bg-white border-b flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Agences & Filiales
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Gestion du réseau d'agences et sous-agences
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setModal("filiale")}
              className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              + Filiale
            </button>
            <button
              onClick={() => setModal("agence")}
              className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            >
              + Agence
            </button>
          </div>
        </div>
      </div>

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {filiales.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🏢</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Aucune filiale enregistrée
            </h2>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              Les filiales et agences apparaîtront ici une fois la base de
              données connectée, ou vous pouvez en créer une maintenant.
            </p>
            <button
              onClick={() => setModal("filiale")}
              className="px-5 py-2.5 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800"
            >
              Créer une filiale
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filiales.map((filiale) => (
              <div
                key={filiale.id}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
              >
                <div
                  className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white cursor-pointer"
                  onClick={() => toggleFiliale(filiale.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">
                      {expandedFiliales[filiale.id] ? "▾" : "▸"}
                    </span>
                    <div>
                      <h3 className="font-semibold">{filiale.nom}</h3>
                      <p className="text-blue-200 text-xs">
                        {filiale.pays} •{" "}
                        {filiale.agences?.length || 0} agence(s)
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="text-xs border border-blue-300 text-blue-100 px-3 py-1 rounded hover:bg-blue-800">
                      Modifier
                    </button>
                    <button className="text-xs border border-red-400 text-red-200 px-3 py-1 rounded hover:bg-red-900/30">
                      Supprimer
                    </button>
                  </div>
                </div>

                {expandedFiliales[filiale.id] && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                          <th className="text-left py-3 px-4 font-semibold">
                            Agence
                          </th>
                          <th className="text-left py-3 px-4 font-semibold">
                            Localisation
                          </th>
                          <th className="text-left py-3 px-4 font-semibold">
                            Type
                          </th>
                          <th className="text-left py-3 px-4 font-semibold">
                            Statut
                          </th>
                          <th className="text-left py-3 px-4 font-semibold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(filiale.agences || []).map((agence) => (
                          <React.Fragment key={agence.id}>
                            <tr
                              className="border-t hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleAgence(agence.id)}
                            >
                              <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                                {agence.sousAgences?.length > 0 && (
                                  <span className="text-blue-500 text-xs">
                                    {expandedAgences[agence.id] ? "▾" : "▸"}
                                  </span>
                                )}
                                {agence.nom}
                                {agence.sousAgences?.length > 0 && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                                    {agence.sousAgences.length}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-gray-600">
                                {agence.location}
                              </td>
                              <td className="py-3 px-4 text-gray-500">
                                {agence.type}
                              </td>
                              <td className="py-3 px-4">
                                {statusBadge(agence.statut)}
                              </td>
                              <td
                                className="py-3 px-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setModal("sous-agence")}
                                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
                                  >
                                    + Sous-agence
                                  </button>
                                  <button className="text-xs text-blue-600 hover:underline">
                                    Modifier
                                  </button>
                                  <button className="text-xs text-red-500 hover:underline">
                                    Supprimer
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {expandedAgences[agence.id] &&
                              (agence.sousAgences || []).map((sa) => (
                                <tr
                                  key={sa.id}
                                  className="border-t bg-blue-50/30"
                                >
                                  <td className="py-2 px-4 pl-10 text-sm text-gray-600">
                                    <span className="text-blue-400 mr-2">
                                      ↳
                                    </span>
                                    {sa.nom}
                                  </td>
                                  <td className="py-2 px-4 text-sm text-gray-500">
                                    {sa.location}
                                  </td>
                                  <td className="py-2 px-4 text-sm text-gray-400">
                                    —
                                  </td>
                                  <td className="py-2 px-4">
                                    {statusBadge(sa.statut)}
                                  </td>
                                  <td className="py-2 px-4">
                                    <div className="flex gap-2">
                                      <button className="text-xs text-blue-600 hover:underline">
                                        Modifier
                                      </button>
                                      <button className="text-xs text-red-500 hover:underline">
                                        Supprimer
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Filiale */}
      {modal === "filiale" && (
        <Modal title="Nouvelle filiale" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la filiale
              </label>
              <input
                type="text"
                placeholder="ex: Filiale Littoral"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pays
              </label>
              <input
                type="text"
                placeholder="ex: Cameroun"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">
              Créer
            </button>
          </div>
        </Modal>
      )}

      {/* Modal Agence */}
      {modal === "agence" && (
        <Modal title="Nouvelle agence" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filiale parente
              </label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sélectionner une filiale</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'agence
              </label>
              <input
                type="text"
                placeholder="ex: Agence Douala"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localisation
              </label>
              <input
                type="text"
                placeholder="ex: Douala"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Principale</option>
                <option>Secondaire</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="text"
                placeholder="+237 ..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="agence@gfa.cm"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">
              Créer
            </button>
          </div>
        </Modal>
      )}

      {/* Modal Sous-agence */}
      {modal === "sous-agence" && (
        <Modal title="Nouvelle sous-agence" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agence parente
              </label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sélectionner une agence</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la sous-agence
              </label>
              <input
                type="text"
                placeholder="ex: Akwa"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localisation précise
              </label>
              <input
                type="text"
                placeholder="ex: Douala-Akwa"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">
              Créer
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ============================================================
// PAGE FILIALES
// ============================================================
const FilialesPage = () => {
  const [modal, setModal] = useState(false);
  const [filiales, setFiliales] = useState([]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 py-5 bg-white border-b flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Filiales</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Gestion des filiales du groupe
            </p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 self-start sm:self-auto"
          >
            + Nouvelle filiale
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {filiales.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🏦</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Aucune filiale enregistrée
            </h2>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              Les filiales apparaîtront ici une fois la base de données
              connectée.
            </p>
            <button
              onClick={() => setModal(true)}
              className="px-5 py-2.5 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800"
            >
              Créer une filiale
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filiales.map((f) => (
              <div key={f.id} className="bg-white rounded-xl border shadow-sm p-5">
                <h3 className="font-semibold text-gray-900">{f.nom}</h3>
                <p className="text-xs text-gray-500">{f.pays}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <Modal title="Nouvelle filiale" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input type="text" placeholder="ex: Filiale Nord" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
              <input type="text" placeholder="ex: Cameroun" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(false)} className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50">Annuler</button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">Créer</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ============================================================
// PAGE RAPPORTS
// ============================================================
const RapportsPage = () => {
  const [modal, setModal] = useState(false);
  const [filterType, setFilterType] = useState("Tous");
  const [rapports, setRapports] = useState([]);

  const types = ["Tous", "Mensuel", "Hebdomadaire", "Trimestriel", "Incident"];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 py-5 bg-white border-b flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rapports</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Génération et consultation des rapports
            </p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 self-start sm:self-auto"
          >
            + Générer un rapport
          </button>
        </div>

        {/* Filtres */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                filterType === t
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {rapports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Aucun rapport disponible
            </h2>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              Les rapports générés apparaîtront ici. Vous pouvez en générer un
              maintenant.
            </p>
            <button
              onClick={() => setModal(true)}
              className="px-5 py-2.5 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800"
            >
              Générer un rapport
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <th className="text-left py-3 px-4 font-semibold">Titre</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Agence</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rapports.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{r.titre}</td>
                    <td className="py-3 px-4">{r.type}</td>
                    <td className="py-3 px-4 text-gray-600">{r.agence}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{r.date}</td>
                    <td className="py-3 px-4">{r.statut}</td>
                    <td className="py-3 px-4">
                      <button className="text-xs text-blue-600 hover:underline">Voir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <Modal title="Générer un rapport" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de rapport</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Mensuel</option>
                <option>Hebdomadaire</option>
                <option>Trimestriel</option>
                <option>Incident</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agence / Périmètre</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Toutes les agences</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format d'export</label>
              <div className="flex gap-4">
                {["PDF", "Excel", "CSV"].map((fmt) => (
                  <label key={fmt} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked={fmt === "PDF"} className="rounded" />
                    {fmt}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(false)} className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50">Annuler</button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">Générer</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ============================================================
// PAGE UTILISATEURS
// ============================================================
const UtilisateursPage = () => {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 py-5 bg-white border-b flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
            <p className="text-sm text-gray-500 mt-0.5">Gestion des comptes utilisateurs</p>
          </div>
          <button onClick={() => setModal(true)} className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 self-start sm:self-auto">
            + Nouvel utilisateur
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Aucun utilisateur enregistré</h2>
            <p className="text-sm text-gray-400 max-w-sm mb-6">Les utilisateurs apparaîtront ici une fois la base de données connectée.</p>
            <button onClick={() => setModal(true)} className="px-5 py-2.5 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800">Créer un utilisateur</button>
          </div>
        ) : null}
      </div>

      {modal && (
        <Modal title="Nouvel utilisateur" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input type="text" placeholder="Nom" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input type="text" placeholder="Prénom" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="email@gfa.cm" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Admin</option>
                <option>Employé</option>
                <option>Client</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input type="password" placeholder="••••••••" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(false)} className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50">Annuler</button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">Créer</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ============================================================
// PAGE RÔLES
// ============================================================
const RolesPage = () => (
  <EmptyPage
    title="Rôles"
    description="Gestion des rôles et permissions"
    icon="🔐"
  />
);

// ============================================================
// PAGE SUIVI DES AGENCES
// ============================================================
const SuiviPage = () => {
  const [agences, setAgences] = useState([]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 py-5 bg-white border-b flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Suivi des agences</h1>
        <p className="text-sm text-gray-500 mt-0.5">Monitoring en temps réel</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {agences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">📡</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Aucune donnée de suivi</h2>
            <p className="text-sm text-gray-400 max-w-sm">Les données de suivi en temps réel apparaîtront ici après connexion à la base de données.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// ============================================================
// PAGE PARAMÈTRES
// ============================================================
const ParametresPage = () => (
  <div className="flex-1 flex flex-col overflow-hidden">
    <div className="px-6 py-5 bg-white border-b flex-shrink-0">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
      <p className="text-sm text-gray-500 mt-0.5">Configuration de l'application</p>
    </div>
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'organisation</label>
              <input type="text" placeholder="GFA" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email de contact</label>
              <input type="email" placeholder="contact@gfa.cm" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800">Sauvegarder</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-3">
            {["Alertes incidents", "Rapports hebdomadaires", "Rapports mensuels"].map((item) => (
              <label key={item} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700">{item}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-900" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// COMPOSANT PRINCIPAL DASHBOARD
// ============================================================
const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Décommenter quand le backend sera prêt :
  // const { token } = useAuth();
  // useEffect(() => {
  //   if (!token) return;
  //   setLoading(true);
  //   Promise.all([
  //     fetch("http://localhost:5000/api/stats", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
  //     fetch("http://localhost:5000/api/agencies", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
  //   ]).then(([statsRes, agenciesRes]) => {
  //     setStats(statsRes);
  //     setAgencies(agenciesRes || []);
  //   }).finally(() => setLoading(false));
  // }, [token]);

  const downCount = useMemo(
    () => agencies.filter((a) => a.status === "Bloqué").length,
    [agencies]
  );

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage stats={stats} agencies={agencies} downCount={downCount} />;
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
        return <DashboardPage stats={stats} agencies={agencies} downCount={downCount} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar fixe */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Zone principale */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header fixe */}
        <Header />

        {/* Contenu de la page — seule cette zone défile */}
        <div className="flex-1 flex overflow-hidden">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
