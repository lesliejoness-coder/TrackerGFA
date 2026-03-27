import React, { useState } from "react";
import {
  BsPersonPlus,          // Pour Ajouter utilisateur
  BsPersonBadge,         // Pour Ajouter client
  BsBuilding,            // Pour Créer filiale
  BsShop,                // Pour Créer agence
  BsXCircleFill,         // Pour l'icône de fermeture (X) en rouge
  BsPeople,              // Pour les utilisateurs
  BsPeopleFill,          // Pour les clients
  BsCheckCircle,         // Pour agences actives
  BsExclamationTriangle  // Pour agences avec incidents
  
} from 'react-icons/bs';
import { PieChart, Pie, Cell, Sector, Tooltip, Legend } from 'recharts';

  

// ============= DONNÉES STATIQUES =============
// Données pour le graphique
const CHART_DATA = [
  { name: "Utilisateurs actifs", value: 5 },
  { name: "Clients", value: 5 },
  { name: "Filiales", value: 5 },
  { name: "Agences", value: 5 },
  { name: "Agences en panne", value: 3 },
];

// Configuration des couleurs
const CHART_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4444"];
const RADIAN = Math.PI / 180;

// Configuration des cartes de statistiques
const STATS_CARDS = [
  { title: "Nombre d'utilisateurs", icon: BsPersonPlus, color: "#0088FE" },
  { title: "Nombre de clients", icon: BsPersonBadge, color: "#00C49F" },
  { title: "Nombre de filiales", icon: BsBuilding, color: "#FFBB28" },
  { title: "Nombre d'agences", icon: BsShop, color: "#FF8042" },
  { title: "Agences en panne", icon: BsXCircleFill, color: "#FF4444" },
];

// ============= DONNÉES DES TABLEAUX =============
// Données des utilisateurs
const USERS_DATA = [
  {
    id: 1,
    nom: "Jean Dupont",
    email: "jean.dupont@email.com",
    role: "Admin",
    statut: "Actif",
    dateInscription: "2024-01-15",
  },
  {
    id: 2,
    nom: "Marie Martin",
    email: "marie.martin@email.com",
    role: "Utilisateur",
    statut: "Actif",
    dateInscription: "2024-02-20",
  },
  {
    id: 3,
    nom: "Pierre Durand",
    email: "pierre.durand@email.com",
    role: "Modérateur",
    statut: "Inactif",
    dateInscription: "2024-01-10",
  },
  {
    id: 4,
    nom: "Sophie Lefebvre",
    email: "sophie.lefebvre@email.com",
    role: "Utilisateur",
    statut: "Actif",
    dateInscription: "2024-03-05",
  },
  {
    id: 5,
    nom: "Lucas Bernard",
    email: "lucas.bernard@email.com",
    role: "Utilisateur",
    statut: "Actif",
    dateInscription: "2024-02-28",
  },
];

// Données des clients
const CLIENTS_DATA = [
  {
    id: 1,
    nom: "Société ABC",
    contact: "Paul Martin",
    email: "contact@abc.com",
    type: "Entreprise",
  },
  {
    id: 2,
    nom: "Entreprise XYZ",
    contact: "Claire Dubois",
    email: "claire@xyz.com",
    type: "Entreprise",
  },
  {
    id: 3,
    nom: "Tech Solutions",
    contact: "Thomas Petit",
    email: "thomas@techsolutions.com",
    type: "Entreprise",
  },
  {
    id: 4,
    nom: "Global Corp",
    contact: "Nadia Fokou",
    email: "nadia@globalcorp.com",
    type: "Entreprise",
  },
  {
    id: 5,
    nom: "Innov Group",
    contact: "Marc Etoga",
    email: "marc@innovgroup.com",
    type: "Entreprise",
  },
];

// Données des agences actives
const AGENCES_ACTIVES_DATA = [
  {
    id: 1,
    nom: "Agence Paris Centre",
    adresse: "15 rue de Rivoli, Paris",
    client: "Alice Moreau",
    tel: "01 23 45 67 89",
    agences: 8,
  },
  {
    id: 2,
    nom: "Agence Lyon Part-Dieu",
    adresse: "45 cours Lafayette, Lyon",
    client: "Bernard Blanc",
    tel: "04 78 90 12 34",
    agences: 5,
  },
  {
    id: 3,
    nom: "Agence Marseille Vieux-Port",
    adresse: "12 quai du Port, Marseille",
    client: "Catherine Roux",
    tel: "04 91 23 45 67",
    agences: 6,
  },
  {
    id: 4,
    nom: "Agence Bordeaux Centre",
    adresse: "8 rue Sainte-Catherine, Bordeaux",
    client: "David Lopez",
    tel: "05 56 78 90 12",
    agences: 4,
  },
  {
    id: 5,
    nom: "Agence Lille Grand Palais",
    adresse: "25 boulevard de la Liberté, Lille",
    client: "Emma Dubois",
    tel: "03 20 15 30 45",
    agences: 3,
  },
];

// Données des agences avec incidents
const AGENCES_INCIDENTS_DATA = [
  {
    id: 1,
    nom: "Agence Nice",
    adresse: "5 avenue Jean Médecin, Nice",
    incident: "Panne réseau",
    niveau: "Critique",
    statut: "En cours",
    dateIncident: "2024-03-15",
  },
  {
    id: 2,
    nom: "Agence Toulouse",
    adresse: "32 rue d'Alsace, Toulouse",
    incident: "Problème électrique",
    niveau: "Moyen",
    statut: "En attente",
    dateIncident: "2024-03-14",
  },
  {
    id: 3,
    nom: "Agence Strasbourg",
    adresse: "18 rue des Francs-Bourgeois, Strasbourg",
    incident: "Fuite d'eau",
    niveau: "Faible",
    statut: "Résolu",
    dateIncident: "2024-03-13",
  },
];

// Configuration des onglets
const TABS_CONFIG = [
  {
    id: "users",
    label: "Utilisateurs",
    icon: BsPeople,
    data: USERS_DATA,
    color: "#0088FE",
  },
  {
    id: "clients",
    label: "Clients",
    icon: BsPeopleFill,
    data: CLIENTS_DATA,
    color: "#00C49F",
  },
  {
    id: "agences-actives",
    label: "Agences Actives",
    icon: BsCheckCircle,
    data: AGENCES_ACTIVES_DATA,
    color: "#FFBB28",
  },
  {
    id: "agences-incidents",
    label: "Agences avec Incidents",
    icon: BsExclamationTriangle,
    data: AGENCES_INCIDENTS_DATA,
    color: "#FF4444",
  },
];

function Home() {
  // État pour stocker quel onglet est actuellement sélectionné
  // 'users' est la valeur par défaut (premier onglet)
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("users");
  const isAnimationActive = true;

  // ============= FONCTIONS DU GRAPHIQUE =============
  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    if (!cx || !cy || !innerRadius || !outerRadius) return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy - 20}
          dy={8}
          textAnchor="middle"
          fill="#333"
          fontSize={14}
        >
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy + 10}
          dy={8}
          textAnchor="middle"
          fill="#666"
          fontSize={12}
        >
          {`${value} (${(percent * 100).toFixed(1)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // ============= FONCTIONS DE RENDU DES TABLEAUX =============
  const renderUsersTable = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Statut</th>
          <th>Date d'inscription</th>
        </tr>
      </thead>
      <tbody>
        {USERS_DATA.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nom}</td>
            <td>{user.email}</td>
            <td>
              <span className={`badge role-${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            </td>
            <td>
              <span className={`badge status-${user.statut.toLowerCase()}`}>
                {user.statut}
              </span>
            </td>
            <td>{user.dateInscription}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderClientsTable = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {CLIENTS_DATA.map((client) => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.nom}</td>
            <td>{client.contact}</td>
            <td>{client.email}</td>
            <td>
              <span className="badge type-entreprise">Entreprise</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderAgencesActivesTable = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom de l'agence</th>
          <th>Adresse</th>
          <th>Client</th>
          <th>Téléphone</th>
          
        </tr>
      </thead>
      <tbody>
        {AGENCES_ACTIVES_DATA.map((agence) => (
          <tr key={agence.id}>
            <td>{agence.id}</td>
            <td>{agence.nom}</td>
            <td>{agence.adresse}</td>
            <td>{agence.client}</td>
            <td>{agence.tel}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderAgencesIncidentsTable = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom de l'agence</th>
          <th>Adresse</th>
          <th>Incident</th>
          <th>Niveau</th>
          <th>Statut</th>
          <th>Date de l'incident</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {AGENCES_INCIDENTS_DATA.map((agence) => (
          <tr key={agence.id}>
            <td>{agence.id}</td>
            <td>{agence.nom}</td>
            <td>{agence.adresse}</td>
            <td>{agence.incident}</td>
            <td>
              <span className={`badge niveau-${agence.niveau.toLowerCase()}`}>
                {agence.niveau}
              </span>
            </td>
            <td>
              <span
                className={`badge statut-${agence.statut.replace(" ", "-").toLowerCase()}`}
              >
                {agence.statut}
              </span>
            </td>
            <td>{agence.dateIncident}</td>
            <td>
              <div className="dropdown-wrapper">
                <button className="dropdown-btn">Actions ▾</button>
                <div className="dropdown-menu">
                  <button className="dropdown-item item-encours">
                    🔄 En cours
                  </button>
                  <button className="dropdown-item item-terminer">
                    ✅ Résolu
                  </button>
                  <button className="dropdown-item item-detail">
                    🔍 Détail
                  </button>
                  <button className="dropdown-item item-affecter">
                    👤 Affecter
                  </button>
                  
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Fonction qui retourne le bon tableau selon l'onglet actif
  const renderActiveTable = () => {
    // switch sur la valeur de activeTab
    switch (activeTab) {
      case "users": // Si activeTab = 'users'
        return renderUsersTable(); // Affiche le tableau des utilisateurs
      case "clients": // Si activeTab = 'clients' (quand on clique sur Clients)
        return renderClientsTable(); // Affiche le tableau des clients
      case "agences-actives": // Si activeTab = 'agences-actives' (quand on clique sur Agences Actives)
        return renderAgencesActivesTable(); // Affiche le tableau des agences actives
      case "agences-incidents": // Si activeTab = 'agences-incidents' (quand on clique sur Agences avec Incidents)
        return renderAgencesIncidentsTable(); // Affiche le tableau des agences avec incidents
      default:
        return null;
    }
  };

  return (
    <main className="main-container">
      {/* En-tête du dashboard */}
      <div className="main-title">
        <h3>Bienvenue sur le Dashboard</h3>
      </div>

      {/* Section des cartes statistiques */}
      <div className="stats-grid">
        {STATS_CARDS.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className="stat-card"
              style={{ borderTop: `4px solid ${card.color}` }}
            >
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-value">
                  {index === 0 && USERS_DATA.length}
                  {index === 1 && CLIENTS_DATA.length}
                  {index === 2 && 5}
                  {index === 3 && AGENCES_ACTIVES_DATA.length}
                  {index === 4 && AGENCES_INCIDENTS_DATA.length}
                </p>
              </div>
              <div className="card-icon" style={{ color: card.color }}>
                <IconComponent size={32} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Section du graphique */}

      <div className="chart-section">
        <div className="chart-wrapper">
          <h4>Répartition des données</h4>
          <div className="pie-container">
            <PieChart width={570} height={350}>
              <Pie
                data={CHART_DATA}
                cx={285}
                cy={150}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={155}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={isAnimationActive}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
              >
                {CHART_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: 20 }}
                iconSize={14}
                iconType="circle"
              />
            </PieChart>
          </div>
        </div>
      </div>

      {/* Barre de navigation horizontale pour les tableaux */}
      <div className="tabs-section">
        <h4 className="tabs-title">Gestion des données</h4>
        <div className="tabs-nav">
          {TABS_CONFIG.map((tab) => {
            const IconComponent = tab.icon;
            // Vérifie si cet onglet est l'onglet actif
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`tab-button ${isActive ? "active" : ""}`}
                // QUAND ON CLIQUE : met à jour l'état avec l'ID de l'onglet
                onClick={() => setActiveTab(tab.id)}
                style={
                  isActive
                    ? { borderBottomColor: tab.color, color: tab.color }
                    : {}
                }
              >
                <IconComponent className="tab-icon" size={18} />
                <span>{tab.label}</span>
                <span
                  className="tab-count"
                  style={{ backgroundColor: tab.color }}
                >
                  {tab.data.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tableau correspondant à l'onglet actif */}
        <div className="table-container">{renderActiveTable()}</div>
      </div>

      <style jsx>{`
        .main-container {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, sans-serif;
          height: 500px;        /* hauteur fixe */
          overflow-y: auto;     /* scroll vertical automatique */
        }

        .main-title {
          margin-bottom: 30px;
        }

        .main-title h3 {
          font-size: 24px;
          color: #333;
          margin: 0;
        }

        /* Grille des cartes statistiques */
        .stats-grid {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .stat-card {
          flex: 1;
          min-width: 153px;
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .card-content {
          flex: 1;
        }

        .card-title {
          font-size: 14px;
          color: #666;
          margin: 0 0 8px 0;
          font-weight: 500;
        }

        .card-value {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.02);
        }

        /* Section du graphique */
        .chart-section {
          background: white;
          border-radius: 8px;
          padding: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
        }

        .chart-wrapper {
          width: 70%;
        }

        .chart-wrapper h4 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 18px;
        }

        .pie-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Section des onglets et tableaux */
        .tabs-section {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tabs-title {
          margin: 0 0 20px 0;
          color: #333;
          font-size: 18px;
        }

        .tabs-nav {
          display: flex;
          flex-direction: row;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 10px;
          overflow-x: auto;
          white-space: nowrap;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          border-radius: 0;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .tab-button:hover {
          color: #333;
          background: #f5f5f5;
        }

        .tab-button.active {
          font-weight: 600;
        }

        .tab-icon {
          margin-right: 4px;
        }

        .tab-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          color: white;
          margin-left: 4px;
        }

        /* Conteneur du tableau */
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
        }

        /* Style du tableau */
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .data-table th {
          background: #f8f9fa;
          color: #495057;
          font-weight: 600;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #dee2e6;
        }

        .data-table td {
          padding: 12px;
          border-bottom: 1px solid #e9ecef;
          color: #212529;
        }

        .data-table tbody tr:hover {
          background-color: #f8f9fa;
        }

        /* Badges pour les différents statuts */
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge.status-actif {
          background: #d4edda;
          color: #155724;
        }

        .badge.status-inactif {
          background: #f8d7da;
          color: #721c24;
        }

        .badge.role-admin {
          background: #cce5ff;
          color: #004085;
        }

        .badge.role-modérateur {
          background: #fff3cd;
          color: #856404;
        }

        .badge.role-utilisateur {
          background: #e2e3e5;
          color: #383d41;
        }

        .badge.type-entreprise {
          background: #d1ecf1;
          color: #0c5460;
        }

        .badge.type-particulier {
          background: #d6d8d9;
          color: #1b1e21;
        }

        .badge.niveau-critique {
          background: #f8d7da;
          color: #721c24;
        }

        .badge.niveau-moyen {
          background: #fff3cd;
          color: #856404;
        }

        .badge.niveau-faible {
          background: #d1ecf1;
          color: #0c5460;
        }

        .badge.statut-en-cours {
          background: #cce5ff;
          color: #004085;
        }

        .badge.statut-en-attente {
          background: #fff3cd;
          color: #856404;
        }

        .badge.statut-résolu {
          background: #d4edda;
          color: #155724;
        }

        /* Dropdown Actions */
        .dropdown-wrapper {
          position: relative;
          display: inline-block;
        }

        .dropdown-btn {
          background: #4a6fa5;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .dropdown-btn:hover {
          background: #3a5a8a;
        }

        .dropdown-wrapper:hover .dropdown-menu {
          display: block;
        }

        .dropdown-menu {
          display: none;
          position: absolute;
          right: 0;
          top: 100%;
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 100;
          min-width: 150px;
          overflow: hidden;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 8px 14px;
          background: none;
          border: none;
          text-align: left;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.15s;
          color: #333;
          white-space: nowrap;
        }

        .dropdown-item:hover {
          background: #f0f4ff;
        }
        .item-encours:hover {
          color: #004085;
        }
        .item-terminer:hover {
          color: #155724;
        }
        .item-detail:hover {
          color: #0c5460;
        }
        .item-affecter:hover {
          color: #856404;
        }
        .item-probleme:hover {
          color: #721c24;
        }

        /* Styles responsifs */
        @media (max-width: 768px) {
          .stats-grid {
            flex-direction: column;
          }

          .stat-card {
            width: 100%;
          }

          .pie-container {
            overflow-x: auto;
            justify-content: flex-start;
          }

          .tabs-nav {
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
          }

          .tab-button {
            padding: 8px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}

export default Home;
