import React from 'react';
import {
  BsCart3,              // Pour le logo principal
  BsGrid,                // Pour Dashboard
  BsPersonPlus,          // Pour Ajouter utilisateur
  BsPersonBadge,         // Pour Ajouter client
  BsBuilding,            // Pour Créer filiale
  BsShop,                // Pour Créer agence
  BsX                     // Pour l'icône de fermeture (X)
} from 'react-icons/bs';


const sidebar = () => {
  return (
    <aside>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='menu-icon' /> DASHBOARD
        </div>
        <span className='icon close_icon'><BsX />
        </span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsGrid className='icon' />Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsPersonPlus className='icon' />Ajouter un utilisateur
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsPersonBadge className='icon' />Ajouter un client
          </a>
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
      </ul>
    </aside>
  )
}

export default sidebar