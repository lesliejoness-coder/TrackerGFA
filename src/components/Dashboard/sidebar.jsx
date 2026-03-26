import React from "react";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid,
  BsPersonPlus,
  BsBuilding,
  BsShop,
  BsX,
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
    { icon: BsShop, label: "Créer une agence", to: "/Dashboard/create-agence" },
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
<<<<<<< HEAD

      <ul className='sidebar-list'>
<li className='sidebar-list-item'>
          <Link to='/Dashboard'>
            <BsGrid className='icon' />Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/Dashboard/add-user'>
  <BsPersonPlus className='icon' />Ajouter un utilisateur
</Link>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsBuilding className='icon' />Créer une filiale
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsShop className='icon' />Créer une agence
          </a>
        </li>
        <li className='sidebar-list-item'>
  <Link to='/Dashboard/employe'>
    <BsPersonBadge className='icon' /> Dashboard Employé
  </Link>
</li>
=======
      <ul className="sidebar-list">
        {menuItems.map(({ icon: Icon, label, to }) => (
          <li key={to} className="sidebar-list-item">
            <Link to={to}>
              <Icon className="icon" />
              <span className={collapsed ? "hidden-text" : ""}>{label}</span>
            </Link>
          </li>
        ))}
>>>>>>> 16c8a1c2d9867b641bee1270f8996c9983396919
      </ul>
    </aside>
  );
};

export default Sidebar;
