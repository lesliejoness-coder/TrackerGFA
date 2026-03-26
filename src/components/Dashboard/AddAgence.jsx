import React, { useState } from "react";
import "./agence.css";

const timezones = ["Africa/Douala","Africa/Abidjan","Africa/Bamako","Africa/Lagos","Africa/Nairobi","Asia/Kolkata","Asia/Hong_Kong","Europe/Paris"];
const paysList = ["Cameroun","Côte d'Ivoire","Mali","Sénégal","Madagascar","Guinée","Burkina Faso","Inde","France"];

const agencesData = [
  {id:1, nom:"AGENECE BADALABOUGOU", pays:"Mali", emplacement:"Mali", fuseau:"Africa/Bamako", langue:""},
  {id:2, nom:"AGENCE MEDINE", pays:"Mali", emplacement:"Mali", fuseau:"Africa/Bamako", langue:""},
  {id:3, nom:"LOCAL TEST", pays:"Inde", emplacement:"Calicut", fuseau:"Asia/Kolkata", langue:""},
  {id:4, nom:"KIOSK TEST", pays:"Cameroun", emplacement:"cameroun", fuseau:"Asia/Hong_Kong", langue:"English"},
  {id:5, nom:"AGENCE1 CAM", pays:"Cameroun", emplacement:"Douala", fuseau:"Africa/Douala", langue:"French"},
  {id:6, nom:"AGENCE2 CAM (HYPODROME)", pays:"Cameroun", emplacement:"Douala", fuseau:"Africa/Douala", langue:"French"},
  {id:7, nom:"Agence Treichville marché", pays:"Côte d'Ivoire", emplacement:"TREICHEVILLE", fuseau:"Africa/Abidjan", langue:"French"},
];

const emptyForm = {
  nom:"", emplacement:"", type:"Normal", pays:"", telephone:"", email:"",
  fuseau:"", formatDate:"", formatHeure:"", typeAppel:"Time Based", langue:"",
  sms:false, whatsapp:false, mobileNotif:false,
  userNom:"", userEmail:"", userPassword:""
};

const AddAgence = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [agences, setAgences] = useState(agencesData);
  const [search, setSearch] = useState("");

  const handle = (e) => {
    const {name, value, type, checked} = e.target;
    setForm(f => ({...f, [name]: type==="checkbox" ? checked : value}));
  };

  const handleSave = () => {
    if (!form.nom || !form.pays) return alert("Nom et Pays sont obligatoires.");
    setAgences(prev => [...prev, {
      id: prev.length + 1,
      nom: form.nom, pays: form.pays,
      emplacement: form.emplacement,
      fuseau: form.fuseau, langue: form.langue
    }]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const filtered = agences.filter(a =>
    a.nom.toLowerCase().includes(search.toLowerCase())
  );

  if (showForm) return (
    <main className="gfa-main">
      <div className="gfa-page-header">
        <h2 className="gfa-title">Créer une agence</h2>
        <div className="gfa-breadcrumb">Accueil &gt; Agence &gt; <span>Nouvelle agence</span></div>
      </div>

      <div className="gfa-card">
        <div className="gfa-section-title">Informations générales</div>
        <div className="gfa-grid3">
          <div className="gfa-field"><label>Nom <span className="req">*</span></label><input name="nom" value={form.nom} onChange={handle} placeholder="Name"/></div>
          <div className="gfa-field"><label>Emplacement <span className="req">*</span></label><input name="emplacement" value={form.emplacement} onChange={handle} placeholder="Location"/></div>
          <div className="gfa-field"><label>Type</label>
            <select name="type" value={form.type} onChange={handle}>
              <option>Normal</option><option>Kiosk</option><option>Digital Signage</option>
            </select>
          </div>
        </div>
        <div className="gfa-grid3">
          <div className="gfa-field"><label>Pays <span className="req">*</span></label>
            <select name="pays" value={form.pays} onChange={handle}>
              <option value="">Select option</option>
              {paysList.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="gfa-field"><label>Téléphone</label><input name="telephone" value={form.telephone} onChange={handle} placeholder="Phone"/></div>
          <div className="gfa-field"><label>Email</label><input name="email" type="email" value={form.email} onChange={handle} placeholder="Email"/></div>
        </div>
      </div>

      <div className="gfa-card">
        <div className="gfa-section-title">Paramètres régionaux</div>
        <div className="gfa-grid3">
          <div className="gfa-field"><label>Fuseau horaire</label>
            <select name="fuseau" value={form.fuseau} onChange={handle}>
              <option value="">Select option</option>
              {timezones.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="gfa-field"><label>Format de date</label>
            <select name="formatDate" value={form.formatDate} onChange={handle}>
              <option value="">Sélectionner</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option>
            </select>
          </div>
          <div className="gfa-field"><label>Format de l'heure</label>
            <select name="formatHeure" value={form.formatHeure} onChange={handle}>
              <option value="">Sélectionner</option><option>12h (AM/PM)</option><option>24h</option>
            </select>
          </div>
        </div>
        <div className="gfa-grid3">
          <div className="gfa-field"><label>Type d'appel</label>
            <select name="typeAppel" value={form.typeAppel} onChange={handle}>
              <option>Time Based</option><option>Token Based</option>
            </select>
          </div>
          <div className="gfa-field"><label>Langue par défaut</label>
            <select name="langue" value={form.langue} onChange={handle}>
              <option value="">Sélectionner</option><option>Français</option><option>English</option><option>Arabic</option>
            </select>
          </div>
          <div className="gfa-field"><label>Logo</label><input type="file" accept="image/*"/></div>
        </div>
      </div>

      <div className="gfa-card">
        <div className="gfa-section-title">Notifications</div>
        <div className="gfa-toggles">
          <label className="gfa-toggle-item">
            <div className={`gfa-toggle ${form.sms?"on":""}`} onClick={()=>setForm(f=>({...f,sms:!f.sms}))}></div>SMS
          </label>
          <label className="gfa-toggle-item">
            <div className={`gfa-toggle ${form.whatsapp?"on":""}`} onClick={()=>setForm(f=>({...f,whatsapp:!f.whatsapp}))}></div>Notification WhatsApp
          </label>
          <label className="gfa-toggle-item">
            <div className={`gfa-toggle ${form.mobileNotif?"on":""}`} onClick={()=>setForm(f=>({...f,mobileNotif:!f.mobileNotif}))}></div>Notification de l'application mobile
          </label>
        </div>
      </div>

      <div className="gfa-card">
        <div className="gfa-section-title">Utilisateur responsable</div>
        <div className="gfa-user-box">
          <div className="gfa-user-label">Utilisateur</div>
          <div className="gfa-grid3">
            <div className="gfa-field"><label>Nom <span className="req">*</span></label><input name="userNom" value={form.userNom} onChange={handle} placeholder="Nom"/></div>
            <div className="gfa-field"><label>Email <span className="req">*</span></label><input name="userEmail" type="email" value={form.userEmail} onChange={handle} placeholder="Email"/></div>
            <div className="gfa-field"><label>Mot de passe <span className="req">*</span></label><input name="userPassword" type="password" value={form.userPassword} onChange={handle} placeholder="••••••••"/></div>
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
          <h2 className="gfa-title">Agences</h2>
          <div className="gfa-breadcrumb">Accueil &gt; <span>Agences</span></div>
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
              <th>#</th>
              <th>Nom</th>
              <th>Pays</th>
              <th>Emplacement</th>
              <th>Fuseau horaire</th>
              <th>Langue par défaut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id}>
                <td>{i+1}</td>
                <td className="gfa-link">{a.nom}</td>
                <td>{a.pays}</td>
                <td>{a.emplacement}</td>
                <td>{a.fuseau}</td>
                <td>{a.langue}</td>
                <td className="gfa-actions-cell">
                  <span className="gfa-action-btn">→</span>
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

export default AddAgence;