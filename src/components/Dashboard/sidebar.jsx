import React from "react";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid,
  BsPersonPlus,
  BsBuilding,
  BsShop,
  BsX,
  BsPersonBadge,
} from "react-icons/bs";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const menuItems = [
    { icon: BsGrid, label: "Dashboard", to: "/Dashboard" },
    {
      icon: BsPersonPlus,
      label: "Ajouter un utilisateur",
      to: "/Dashboard/add-user",
    },
    {
      icon: BsBuilding,
      label: "Créer une filiale",
      to: "/Dashboard/create-filiale",
    },
    {
      icon: BsShop,
      label: "Créer une agence",
      to: "/Dashboard/create-agence",
    },
    {
      icon: BsPersonBadge,
      label: "Dashboard Employé",
      to: "/Dashboard/employe",
    },
  ];

  return (
    <aside className={collapsed ? "collapsed" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="menu-icon" />
          <span className={collapsed ? "hidden-text" : ""}>DASHBOARD</span>
        </div>
        <span className="icon close_icon" onClick={toggleSidebar}>
          <BsX />
        </span>
      </div>

      <ul className="sidebar-list">
        {menuItems.map(({ icon: Icon, label, to }) => (
          <li key={to} className="sidebar-list-item">
            <Link to={to}>
              <Icon className="icon" />
              <span className={collapsed ? "hidden-text" : ""}>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;