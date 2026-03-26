import React from 'react';
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid,
  BsPersonPlus,
  BsPersonBadge,
  BsBuilding,
  BsShop,
  BsX
} from 'react-icons/bs';

const Sidebar = () => {
  return (
    <aside>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='menu-icon' /> DASHBOARD
        </div>
        <span className='icon close_icon'><BsX /></span>
      </div>

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
          <Link to='/Dashboard/create-filiale'>
            <BsBuilding className='icon' />Créer une filiale
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/Dashboard/create-agence'>
            <BsShop className='icon' />Créer une agence
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;