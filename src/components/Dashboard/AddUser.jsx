import React, { useState } from "react";

const AddUser = () => {
  const [type, setType] = useState("client");

  return (
    <main className="main-container">
      <div className="add-user-wrap">
        <h2 className="add-user-title">Créer un utilisateur</h2>
        <p className="add-user-sub">Sélectionnez le type puis remplissez les informations.</p>

        {/* Onglets type */}
        <div className="type-tabs">
          {["client", "employe", "admin"].map((t) => (
            <button
              key={t}
              className={`tab tab-${t} ${type === t ? "active" : ""}`}
              onClick={() => setType(t)}
            >
              {t === "client" ? "Client" : t === "employe" ? "Employé" : "Administrateur"}
            </button>
          ))}
        </div>

        {/* Champs communs */}
        <p className="section-label">Informations communes</p>
        <div className="form-row">
          <div className="field"><label>Nom</label><input type="text" placeholder="Dupont" /></div>
          <div className="field"><label>Prénom</label><input type="text" placeholder="Jean" /></div>
        </div>
        <div className="field"><label>Email</label><input type="email" placeholder="jean@email.com" /></div>
        <div className="form-row">
          <div className="field"><label>Mot de passe</label><input type="password" placeholder="••••••••" /></div>
          <div className="field"><label>Confirmer</label><input type="password" placeholder="••••••••" /></div>
        </div>

        <hr className="form-divider" />

        {/* Champs dynamiques */}
        {type === "client" && (
          <div className="specific-block block-client">
            <p className="section-label">Informations client</p>
            <div className="field"><label>Téléphone</label><input type="tel" placeholder="+237 6XX XXX XXX" /></div>
          </div>
        )}

        {type === "employe" && (
          <div className="specific-block block-employe">
            <p className="section-label">Informations employé</p>
            <div className="form-row">
              <div className="field"><label>Poste</label><input type="text" placeholder="Technicien" /></div>
            </div>
           
          </div>
        )}

     

        <button className={`btn-submit btn-${type}`}>
          {type === "client" ? "Créer le compte client" : type === "employe" ? "Créer le compte employé" : "Créer le compte admin"}
        </button>
      </div>
    </main>
  );
};

export default AddUser;