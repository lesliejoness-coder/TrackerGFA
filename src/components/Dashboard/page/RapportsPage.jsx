// pages/RapportsPage.jsx
import React, { useState, lazy, Suspense } from "react";
const LazyChart = lazy(() => import("../Chart.jsx"));

const mockRapports = [
  {
    id: 1,
    titre: "Rapport mensuel - Mars 2025",
    type: "Mensuel",
    dateGeneration: "2025-04-01",
    agence: "Toutes",
    incidents: 12,
    disponibilite: "98.2%",
    statut: "Généré",
  },
  {
    id: 2,
    titre: "Rapport hebdomadaire - Semaine 13",
    type: "Hebdomadaire",
    dateGeneration: "2025-03-30",
    agence: "Douala",
    incidents: 3,
    disponibilite: "99.1%",
    statut: "Généré",
  },
  {
    id: 3,
    titre: "Rapport incident critique - Garoua",
    type: "Incident",
    dateGeneration: "2025-03-28",
    agence: "Garoua",
    incidents: 1,
    disponibilite: "72.0%",
    statut: "En attente",
  },
  {
    id: 4,
    titre: "Rapport trimestriel - Q1 2025",
    type: "Trimestriel",
    dateGeneration: "2025-03-31",
    agence: "Toutes",
    incidents: 38,
    disponibilite: "96.8%",
    statut: "Généré",
  },
];

const typeBadge = (type) => {
  const map = {
    Mensuel: "bg-blue-100 text-blue-800",
    Hebdomadaire: "bg-purple-100 text-purple-800",
    Trimestriel: "bg-indigo-100 text-indigo-800",
    Incident: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${map[type] || "bg-gray-100 text-gray-700"}`}>
      {type}
    </span>
  );
};

const statutBadge = (statut) => {
  const map = {
    Généré: "bg-green-100 text-green-800",
    "En attente": "bg-yellow-100 text-yellow-800",
    Erreur: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${map[statut] || "bg-gray-100 text-gray-700"}`}>
      {statut}
    </span>
  );
};

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

const RapportsPage = () => {
  const [rapports] = useState(mockRapports);
  const [modal, setModal] = useState(false);
  const [filterType, setFilterType] = useState("Tous");
  const [search, setSearch] = useState("");

  const types = ["Tous", "Mensuel", "Hebdomadaire", "Trimestriel", "Incident"];

  const filtered = rapports.filter(r => {
    const matchType = filterType === "Tous" || r.type === filterType;
    const matchSearch = r.titre.toLowerCase().includes(search.toLowerCase()) ||
      r.agence.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 bg-white border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rapports</h1>
            <p className="text-sm text-gray-500 mt-0.5">Génération et consultation des rapports</p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 self-start sm:self-auto"
          >
            + Générer un rapport
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { label: "Total rapports", value: rapports.length },
            { label: "Ce mois", value: 2 },
            { label: "En attente", value: rapports.filter(r => r.statut === "En attente").length },
            { label: "Incidents", value: rapports.reduce((acc, r) => acc + r.incidents, 0) },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-blue-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Rechercher un rapport..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-64 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2 flex-wrap">
            {types.map(t => (
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

        {/* Two-column layout: table + chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="font-semibold text-gray-900">Liste des rapports</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <th className="text-left py-3 px-4 font-semibold">Titre</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Agence</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Dispo.</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(rapport => (
                    <tr key={rapport.id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900 truncate max-w-[200px]">{rapport.titre}</p>
                        <p className="text-xs text-gray-400">{rapport.incidents} incident(s)</p>
                      </td>
                      <td className="py-3 px-4">{typeBadge(rapport.type)}</td>
                      <td className="py-3 px-4 text-gray-600">{rapport.agence}</td>
                      <td className="py-3 px-4 text-gray-500 text-xs">{rapport.dateGeneration}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${parseFloat(rapport.disponibilite) > 95 ? "text-green-600" : "text-red-600"}`}>
                          {rapport.disponibilite}
                        </span>
                      </td>
                      <td className="py-3 px-4">{statutBadge(rapport.statut)}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-xs text-blue-600 hover:underline">Voir</button>
                          <button className="text-xs text-gray-500 hover:underline">Export</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-gray-400">
                        Aucun rapport trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart panel */}
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <h3 className="font-semibold text-gray-900 mb-1">Aperçu graphique</h3>
            <p className="text-xs text-gray-400 mb-4">Incidents par type de rapport</p>
            <Suspense fallback={<div className="text-gray-400 text-sm text-center py-10">Chargement...</div>}>
              <LazyChart />
            </Suspense>

            {/* Mini stats */}
            <div className="mt-4 space-y-2 border-t pt-4">
              {rapports.map(r => (
                <div key={r.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate max-w-[130px]">{r.agence}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${parseFloat(r.disponibilite)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">{r.disponibilite}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Generate modal */}
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
                <option>Douala</option>
                <option>Yaoundé</option>
                <option>Garoua</option>
                <option>Bafoussam</option>
                <option>Maroua</option>
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
              <div className="flex gap-3">
                {["PDF", "Excel", "CSV"].map(fmt => (
                  <label key={fmt} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked={fmt === "PDF"} className="rounded" />
                    {fmt}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(false)} className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-50">
              Annuler
            </button>
            <button className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800">
              Générer
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RapportsPage;
