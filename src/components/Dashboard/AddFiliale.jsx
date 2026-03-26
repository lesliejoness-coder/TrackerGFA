import React, { useState } from "react";
import "./agence.css";

const agencesDisponibles = [
  "AGENECE BADALABOUGOU","AGENCE MEDINE","LOCAL TEST","KIOSK TEST",
  "PLAYER TEST","AGENCE PRIMA","Agence Treichville marché",
  "AGENCE2 PLATEAU CI","AGENCE3 BIETRY CI","AGENCE1 CAM",
  "AGENCE2 CAM (HYPODROME)","AGENCE ADL","AGENCE MADA","AGENCE MADA 1",
  "Agence RR2","AGENCE RR CARTE 2"
];

const filialesData = [
  { id:1, nom:"Default Group", agences: agencesDisponibles },
];

const AddFiliale = () => {
  const [showForm, setShowForm] = useState(false);
  const [filiales, setFiliales] = useState(filialesData);
  const [search, setSearch] = useState("");
  const [nom, setNom] = useState("");
  const [groupe, setGroupe] = useState("");
  const [agencesChoisies, setAgencesChoisies] = useState([]);

  const toggleAgence = (a) => {
    setAgencesChoisies(prev =>
      prev.includes(a) ? prev.filter(x=>x!==a) : [...prev, a]
    );
  };

  const handleSave = () => {
    if (!nom) return alert("Le nom est obligatoire.");
    setFiliales(prev => [...prev, { id: prev.length+1, nom, agences: agencesChoisies }]);
    setNom(""); setGroupe(""); setAgencesChoisies([]);
    setShowForm(false);
  };

  const filtered = filiales.filter(f =>
    f.nom.toLowerCase().includes(search.toLowerCase())
  );

  if (showForm) return (
    <main className="gfa-main">
      <div className="gfa-page-header">
        <h2 className="gfa-title">Groupes d'agences</h2>
        <div className="gfa-breadcrumb">Accueil &gt; <span>Groupes d'agences</span></div>
      </div>

      <div className="gfa-card">
        <div className="gfa-section-title">Créer un groupe d'agences</div>

        <div className="gfa-field" style={{marginBottom:"16px"}}>
          <label>Nom <span className="req">*</span></label>
          <input value={nom} onChange={e=>setNom(e.target.value)} placeholder="Name"/>
        </div>

        <div className="gfa-field" style={{marginBottom:"16px"}}>
          <label>Groupes d'agences</label>
          <select value={groupe} onChange={e=>setGroupe(e.target.value)}>
            <option value="">Sélectionnez une option</option>
            {filiales.map(f=><option key={f.id}>{f.nom}</option>)}
          </select>
        </div>

        <div className="gfa-field" style={{marginBottom:"16px"}}>
          <label>
            Agences
            {agencesChoisies.length > 0 &&
              <span className="gfa-count">{agencesChoisies.length} sélectionnée(s)</span>
            }
          </label>
          <div className="gfa-agences-list">
            {agencesDisponibles.map(a => (
              <label key={a} className={`gfa-agence-item ${agencesChoisies.includes(a)?"selected":""}`}>
                <input type="checkbox" checked={agencesChoisies.includes(a)} onChange={()=>toggleAgence(a)}/>
                {a}
              </label>
            ))}
          </div>
        </div>

        <div className="gfa-actions">
          <button className="gfa-btn-cancel" onClick={()=>setShowForm(false)}>Fermer</button>
          <button className="gfa-btn-save" onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </main>
  );

  return (
    <main className="gfa-main">
      <div className="gfa-page-header">
        <div>
          <h2 className="gfa-title">Groupes d'agences</h2>
          <div className="gfa-breadcrumb">Accueil &gt; <span>Groupes d'agences</span></div>
        </div>
      </div>

      <div className="gfa-card">
        <div className="gfa-toolbar">
          <div className="gfa-search-wrap">
            <input
              className="gfa-search"
              placeholder="Barre de recherche"
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />
          </div>
          <button className="gfa-btn-save" onClick={()=>setShowForm(true)}>+ Ajouter</button>
        </div>

        <table className="gfa-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Agences</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id}>
                <td style={{fontWeight:500, color:"#1a2940", verticalAlign:"top", paddingTop:"12px"}}>{f.nom}</td>
                <td>
                  <ul className="gfa-agences-bullet">
                    {f.agences.slice(0,5).map(a=><li key={a}>{a}</li>)}
                    {f.agences.length > 5 && <li style={{color:"#a0aec0"}}>+{f.agences.length-5} autres...</li>}
                  </ul>
                </td>
                <td className="gfa-actions-cell">
                  <span className="gfa-action-btn">✎</span>
                  <span className="gfa-action-btn red">🗑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AddFiliale;