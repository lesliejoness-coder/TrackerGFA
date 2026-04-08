// components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* ── Icons ── */
const DashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const AgenceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="7" r="4" />
  </svg>
);

const IncidentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="9" x2="12" y2="13" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
  </svg>
);

const ReportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="13" x2="16" y2="13" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChevronDownIcon = () => <span>▾</span>;
const ChevronRightIcon = () => <span>▸</span>;
const BuildingIcon = () => <span>🏢</span>;

/* ── SIDEBAR ── */
const Sidebar = () => {
  const location = useLocation();
  const [gestionOpen, setGestionOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  const navItemStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 20px",
    borderRadius: 8,
    margin: "2px 10px",
    color: active ? "#fff" : "#cbd5f5",
    background: active ? "#1e40af" : "transparent",
    textDecoration: "none",
    fontSize: 14,
  });

  const subItemStyle = (active) => ({
    ...navItemStyle(active),
    paddingLeft: 35,
    fontSize: 13,
  });

  return (
    <div style={{
      width: 240,
      background: "#1e3a8a",
      minHeight: "100vh",
      color: "white",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Logo */}
      <div style={{ padding: 20, fontWeight: "bold", fontSize: 18 }}>
        GFA
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        <Link to="/dashboard" style={navItemStyle(isActive("/dashboard"))}>
          <DashIcon /> Dashboard
        </Link>

        {/* Dropdown */}
        <div>
          <div
            onClick={() => setGestionOpen(!gestionOpen)}
            style={{ ...navItemStyle(false), cursor: "pointer", justifyContent: "space-between" }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <AgenceIcon /> Agences
            </span>
            {gestionOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </div>

          {gestionOpen && (
            <>
              <Link to="/filiales" style={subItemStyle(isActive("/filiales"))}>
                <BuildingIcon /> Filiales
              </Link>
              <Link to="/agences" style={subItemStyle(isActive("/agences"))}>
                <BuildingIcon /> Agences
              </Link>
            </>
          )}
        </div>

        <Link to="/suivi-incidents" style={navItemStyle(isActive("/suivi-incidents"))}>
          <IncidentIcon /> Incidents
        </Link>

        <Link to="/utilisateurs" style={navItemStyle(isActive("/utilisateurs"))}>
          <UserIcon /> Utilisateurs
        </Link>

        <Link to="/rapports" style={navItemStyle(isActive("/rapports"))}>
          <ReportIcon /> Rapports
        </Link>

        <Link to="/parametres" style={navItemStyle(isActive("/parametres"))}>
          <SettingsIcon /> Paramètres
        </Link>
      </nav>

      {/* Footer */}
      <div style={{
        padding: 10,
        fontSize: 12,
        textAlign: "center",
        opacity: 0.5
      }}>
        v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;