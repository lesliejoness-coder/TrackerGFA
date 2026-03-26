import React from "react";
import { Link } from "react-router-dom";
import {
  BsCart3, // Pour le logo principal
  BsGrid, // Pour Dashboard
  BsPersonPlus, // Pour Ajouter utilisateur
  BsPersonBadge, // Pour Ajouter client
  BsBuilding, // Pour Créer filiale
  BsShop, // Pour Créer agence
  BsX, // Pour l'icône de fermeture (X)
} from "react-icons/bs";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <aside className={collapsed ? "collapsed" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="menu-icon" />{" "}
          <span className={collapsed ? "hidden-text" : ""}>DASHBOARD</span>
        </div>
        <span className="icon close_icon" onClick={toggleSidebar}>
          <BsX />
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/Dashboard">
            <BsGrid className="icon" />
            <span className={collapsed ? "hidden-text" : ""}>Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Dashboard/add-user">
            <BsPersonPlus className="icon" />
            <span className={collapsed ? "hidden-text" : ""}>
              Ajouter un utilisateur
            </span>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsBuilding className="icon" />
            <span className={collapsed ? "hidden-text" : ""}>
              Créer une filiale
            </span>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsShop className="icon" />
            <span className={collapsed ? "hidden-text" : ""}>
              Créer une agence
            </span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
