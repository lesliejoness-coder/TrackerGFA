import React from "react";
import "./profil.css";

const ProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👤 Mon Profil</h2>
          <span className="close-btn" onClick={onClose}>
            ×
          </span>
        </div>

        <div className="modal-body">
          <div>
            <label>Prénom</label>
            <input value={user.firstName || ""} readOnly />
          </div>

          <div>
            <label>Nom</label>
            <input value={user.lastName || ""} readOnly />
          </div>

          <div>
            <label>Email</label>
            <input value={user.email || ""} readOnly />
          </div>

          <div>
            <label>Téléphone</label>
            <input value={user.phone || ""} readOnly />
          </div>

          <div>
            <label>Rôle</label>
            <input value={user.role || ""} readOnly />
          </div>

          <div>
            <label>Entité</label>
            <input value={user.entity || ""} readOnly />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
