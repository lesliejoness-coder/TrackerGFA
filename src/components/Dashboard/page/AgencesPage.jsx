// pages/AgencesPage.jsx
import React, { useState } from "react";

const mockFiliales = [
  {
    id: 1,
    nom: "Filiale Littoral",
    pays: "Cameroun",
    agences: [
      {
        id: 11,
        nom: "Agence Douala",
        location: "Douala",
        type: "Principale",
        phone: "+237 233 000 001",
        email: "douala@gfa.cm",
        statut: "Active",
        sousAgences: [
          { id: 111, nom: "Akwa", location: "Douala-Akwa", statut: "Active" },
          { id: 112, nom: "Bonanjo", location: "Douala-Bonanjo", statut: "Active" },
          { id: 113, nom: "Bassa", location: "Douala-Bassa", statut: "Maintenance" },
        ],
      },
    ],
  },
  {
    id: 2,
    nom: "Filiale Centre",
    pays: "Cameroun",
    agences: [
      {
        id: 21,
        nom: "Agence Yaoundé",
        location: "Yaoundé",
        type: "Principale",
        phone: "+237 222 000 002",
        email: "yaounde@gfa.cm",
        statut: "Active",
        sousAgences: [
          { id: 211, nom: "Bastos", location: "Yaoundé-Bastos", statut: "Active" },
          { id: 212, nom: "Mvan", location: "Yaoundé-Mvan", statut: "Active" },
        ],
      },
    ],
  },
  {
    id: 3,
    nom: "Filiale Nord",
    pays: "Cameroun",
    agences: [
      {
        id: 31,
        nom: "Agence Garoua",
        location: "Garoua",
        type: "Secondaire",
        phone: "+237 222 000 003",
        email: "garoua@gfa.cm",
        statut: "Bloqué",
        sousAgences: [],
      },
      {
        id: 32,
        nom: "Agence Maroua",
        location: "Maroua",
        type: "Secondaire",
        phone: "+237 222 000 004",
        email: "maroua@gfa.cm",
        statut: "Active",
        sousAgences: [],
      },
    ],
  },
];

const statusBadge = (statut) => {
  const styles = {
    Active: "bg-green-100 text-green-800",
    Bloqué: "bg-red-100 text-red-800",
    Maintenance: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${styles[statut] || "bg-gray-100 text-gray-800"}`}>
      {statut}
    </span>
  );
};

const SousAgenceRow = ({ sa, onEdit, onDelete }) => (
  <tr className="border-t hover:bg-blue-50 transition-colors bg-blue-50/30">
    <td className="py-2 px-4 pl-12 text-sm text-gray-600">
      <span className="text-blue-400 mr-2">↳</span>{sa.nom}
    </td>
    <td className="py-2 px-4 text-sm text-gray-500">{sa.location}</td>
    <td className="py-2 px-4 text-sm text-gray-400">—</td>
    <td className="py-2 px-4">{statusBadge(sa.statut)}</td>
    <td className="py-2 px-4">
      <div className="flex gap-2">
        <button onClick={() => onEdit(sa)} className="text-xs text-blue-600 hover:underline">Modifier</button>
        <button onClick={() => onDelete(sa)} className="text-xs text-red-500 hover:underline">Supprimer</button>
      </div>
    </td>
  </tr>
);

const AgenceSection = ({ agence, expanded, onToggle, onAddSousAgence, onEdit, onDelete }) => (
  <>
    <tr
      className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onToggle}
    >
      <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
        {agence.sousAgences.length > 0 && (
          <span className="text-blue-500 text-sm">{expanded ? "▾" : "▸"}</span>
        )}
        {agence.nom}
        {agence.sousAgences.length > 0 && (
          <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
            {agence.sousAgences.length}
          </span>
        )}
      </td>
      <td className="py-3 px-4 text-gray-600 text-sm">{agence.location}</td>
      <td className="py-3 px-4 text-gray-500 text-sm">{agence.type}</td>
      <td className="py-3 px-4">{statusBadge(agence.statut)}</td>
      <td className="py-3 px-4">
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onAddSousAgence(agence)}
            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
          >
            + Sous-agence
          </button>
          <button onClick={() => onEdit(agence)} className="text-xs text-blue-600 hover:underline">Modifier</button>
          <button onClick={() => onDelete(agence)} className="text-xs text-red-500 hover:underline">Supprimer</button>
        </div>
      </td>
    </tr>
    {expanded && agence.sousAgences.map(sa => (
      <SousAgenceRow key={sa.id} sa={sa} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const FormField = ({ label, type = "text", placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const AgencesPage = () => {
  const [filiales] = useState(mockFiliales);
  const [expandedAgences, setExpandedAgences] = useState({});
  const [expandedFiliales, setExpandedFiliales] = useState({ 1: true, 2: true, 3: true });
  const [modal, setModal] = useState(null); // 'filiale' | 'agence' | 'sous-agence'
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("agences"); // 'agences' | 'filiales'

  const toggleAgence = (agenceId) => {
    setExpandedAgences(prev => ({ ...prev, [agenceId]: !prev[agenceId] }));
  };

  const toggleFiliale = (filialeId) => {
    setExpandedFiliales(prev => ({ ...prev, [filialeId]: !prev[filialeId] }));
  };

  const totalAgences = filiales.reduce((acc, f) => acc + f.agences.length, 0);
  const totalSousAgences = filiales.reduce((acc, f) =>
    acc + f.agences.reduce((a, ag) => a + ag.sousAgences.length, 0), 0
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page header */}
      <div className="px-6 py-5 bg-white border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion du réseau</h1>
            <p className="text-sm text-gray-500 mt-0.5">Filiales, agences et sous-agences</p>
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

        {/* Stats */}
        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{filiales.length}</p>
            <p className="text-xs text-gray-500">Filiales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{totalAgences}</p>
            <p className="text-xs text-gray-500">Agences</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{totalSousAgences}</p>
            <p className="text-xs text-gray-500">Sous-agences</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 border-b -mb-px">
          {["agences", "filiales"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-900 text-blue-900 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "agences" ? "Vue par agence" : "Vue par filiale"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher une agence, filiale..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-80 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {activeTab === "agences" ? (
          /* Vue par filiale avec agences et sous-agences */
          <div className="space-y-4">
            {filiales.map(filiale => (
              <div key={filiale.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {/* Filiale header */}
                <div
                  className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white cursor-pointer"
                  onClick={() => toggleFiliale(filiale.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{expandedFiliales[filiale.id] ? "▾" : "▸"}</span>
                    <div>
                      <h3 className="font-semibold">{filiale.nom}</h3>
                      <p className="text-blue-200 text-xs">{filiale.pays} • {filiale.agences.length} agence(s)</p>
                    </div>
                  </div>
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <button className="text-xs border border-blue-300 text-blue-100 px-3 py-1 rounded hover:bg-blue-800">
                      Modifier
                    </button>
                    <button className="text-xs border border-red-400 text-red-200 px-3 py-1 rounded hover:bg-red-900/30">
                      Supprimer
                    </button>
                  </div>
                </div>

                {/* Agences table */}
                {expandedFiliales[filiale.id] && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                          <th className="text-left py-3 px-4 font-semibold">Agence</th>
                          <th className="text-left py-3 px-4 font-semibold">Localisation</th>
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Statut</th>
                          <th className="text-left py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filiale.agences.map(agence => (
                          <AgenceSection
                            key={agence.id}
                            agence={agence}
                            expanded={!!expandedAgences[agence.id]}
                            onToggle={() => toggleAgence(agence.id)}
                            onAddSousAgence={() => setModal("sous-agence")}
                            onEdit={() => setModal("agence")}
                            onDelete={() => {}}
                          />
                        ))}
                      </tbody>
                    </table>
                    {filiale.agences.length === 0 && (
                      <p className="text-center text-gray-400 py-6 text-sm">Aucune agence dans cette filiale</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Vue filiales en cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filiales.map(filiale => (
              <div key={filiale.id} className="bg-white rounded-xl border shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{filiale.nom}</h3>
                    <p className="text-xs text-gray-500">{filiale.pays}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {filiale.agences.length} agences
                  </span>
                </div>
                <div className="space-y-1.5">
                  {filiale.agences.map(ag => (
                    <div key={ag.id} className="flex items-center justify-between text-sm py-1 border-t border-gray-50">
                      <span className="text-gray-700">{ag.nom}</span>
                      {statusBadge(ag.statut)}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 text-xs py-1.5 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50">
                    Voir détails
                  </button>
                  <button
                    onClick={() => setModal("agence")}
                    className="flex-1 text-xs py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                  >
                    + Agence
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {modal === "filiale" && (
        <Modal title="Nouvelle filiale" onClose={() => setModal(null)}>
          <FormField label="Nom de la filiale" placeholder="ex: Filiale Ouest" />
          <FormField label="Pays" placeholder="ex: Cameroun" />
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(null)} className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50">
              Annuler
            </button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">
              Créer
            </button>
          </div>
        </Modal>
      )}

      {modal === "agence" && (
        <Modal title="Nouvelle agence" onClose={() => setModal(null)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filiale parente</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {filiales.map(f => <option key={f.id}>{f.nom}</option>)}
            </select>
          </div>
          <FormField label="Nom de l'agence" placeholder="ex: Agence Bafoussam" />
          <FormField label="Localisation" placeholder="ex: Bafoussam" />
          <FormField label="Type" placeholder="Principale / Secondaire" />
          <FormField label="Téléphone" placeholder="+237 ..." />
          <FormField label="Email" placeholder="agence@gfa.cm" />
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(null)} className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50">
              Annuler
            </button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">
              Créer
            </button>
          </div>
        </Modal>
      )}

      {modal === "sous-agence" && (
        <Modal title="Nouvelle sous-agence" onClose={() => setModal(null)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Agence parente</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {filiales.flatMap(f => f.agences).map(a => (
                <option key={a.id}>{a.nom}</option>
              ))}
            </select>
          </div>
          <FormField label="Nom de la sous-agence" placeholder="ex: Akwa" />
          <FormField label="Localisation précise" placeholder="ex: Douala-Akwa" />
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(null)} className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50">
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

export default AgencesPage;
