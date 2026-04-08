// components/Dashboard/UtilisateursRoles.jsx
import React, { useState } from "react";
import Sidebar from "./sidebar.jsx";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
);
const PencilIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const BanIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);
const TrashIcon = ({ color = "#6b7280" }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const PrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const NextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

/* ═══════════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════════ */
const Avatar = () => (
  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#d1d9e6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#9aadc4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#9aadc4" />
    </svg>
  </div>
);

const Toggle = ({ on, onChange }) => (
  <div onClick={onChange} style={{ width: 42, height: 22, borderRadius: 11, background: on ? "#3b82f6" : "#d1d5db", position: "relative", cursor: "pointer", transition: "background .2s", flexShrink: 0 }}>
    <div style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,.22)", transition: "left .2s" }} />
  </div>
);

const roleMeta = {
  "Super-Admin":          { bg: "#ede9fe", color: "#6d28d9" },
  "Agent Support":        { bg: "#dbeafe", color: "#1d4ed8" },
  "Propriétaire Agence":  { bg: "#d1fae5", color: "#065f46" },
  "Viewer":               { bg: "#f1f5f9", color: "#475569" },
};
const RoleBadge = ({ role }) => {
  const m = roleMeta[role] || { bg: "#f3f4f6", color: "#374151" };
  return <span style={{ display: "inline-block", padding: "3px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: m.bg, color: m.color, whiteSpace: "nowrap" }}>{role}</span>;
};

const IconBtn = ({ children, onClick, title }) => (
  <button onClick={onClick} title={title} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", borderRadius: 5 }}
    onMouseEnter={e => e.currentTarget.style.background = "#f1f5f9"}
    onMouseLeave={e => e.currentTarget.style.background = "none"}>
    {children}
  </button>
);

const PageBtn = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{ width: 32, height: 32, borderRadius: 6, border: active ? "none" : "1px solid #e5e7eb", background: active ? "#3b82f6" : "#fff", color: active ? "#fff" : "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
    {label}
  </button>
);

/* ── Input field ── */
const Field = ({ label, required, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <label style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>
      {label}{required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const inputStyle = {
  padding: "9px 13px", borderRadius: 8, border: "1px solid #d1d5db",
  fontSize: 13.5, color: "#111827", outline: "none", width: "100%",
  boxSizing: "border-box", background: "#fff",
  transition: "border-color .15s",
};

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const INIT_USERS = [
  { id: 1, nom: "Yvan Akwa",      email: "eyanhan1@gmail.com",  role: "Super-Admin",        agence: "Toutes",      activite: "5 min ago",   on: true  },
  { id: 2, nom: "Yaoundé - Hipp", email: "henrram2@gmail.com",  role: "Agent Support",      agence: "Douala-Akwa", activite: "2 hours ago", on: false },
  { id: 3, nom: "Bafoussam 1",    email: "neutmin1@gmail.com",  role: "Propriétaire Agence",agence: "Littoral",    activite: "2 hours ago", on: false },
];

const ROLES_INIT = [
  {
    id: 1, nom: "Super-Admin", couleur: "#6d28d9", description: "Accès total à toutes les fonctionnalités",
    permissions: { dashboard: true, utilisateurs: true, incidents: true, rapports: true, parametres: true, agences: true },
  },
  {
    id: 2, nom: "Agent Support", couleur: "#1d4ed8", description: "Gestion des incidents et suivi des agences",
    permissions: { dashboard: true, utilisateurs: false, incidents: true, rapports: true, parametres: false, agences: true },
  },
  {
    id: 3, nom: "Propriétaire Agence", couleur: "#065f46", description: "Vue sur son agence uniquement",
    permissions: { dashboard: true, utilisateurs: false, incidents: true, rapports: false, parametres: false, agences: false },
  },
  {
    id: 4, nom: "Viewer", couleur: "#475569", description: "Lecture seule, aucune modification",
    permissions: { dashboard: true, utilisateurs: false, incidents: false, rapports: true, parametres: false, agences: false },
  },
];

const PERMISSION_LABELS = {
  dashboard: "Tableau de bord",
  utilisateurs: "Utilisateurs & Rôles",
  incidents: "Suivi des incidents",
  rapports: "Rapports",
  parametres: "Paramètres",
  agences: "Gestion des agences",
};

const AGENCES = ["Toutes", "Douala-Akwa", "Yaoundé Centre", "Bafoussam 1", "Limbé", "Edéa", "Garoua", "Littoral"];
const ROLES_LIST = ["Super-Admin", "Agent Support", "Propriétaire Agence", "Viewer"];

/* ═══════════════════════════════════════════════════
   MODAL — NOUVEL UTILISATEUR / MODIFIER
═══════════════════════════════════════════════════ */
const ModalUtilisateur = ({ user, onClose, onSave }) => {
  const isEdit = !!user?.id;
  const [form, setForm] = useState({
    nom: user?.nom || "",
    email: user?.email || "",
    role: user?.role || "Agent Support",
    agence: user?.agence || "Toutes",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Nom requis";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide";
    if (!isEdit && !form.password) e.password = "Mot de passe requis";
    if (!isEdit && form.password !== form.confirmPassword) e.confirmPassword = "Les mots de passe ne correspondent pas";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ ...user, ...form, id: user?.id || Date.now(), on: user?.on ?? true, activite: "À l'instant" });
    onClose();
  };

  const overlayStyle = {
    position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, backdropFilter: "blur(3px)",
  };

  const modalStyle = {
    background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520,
    boxShadow: "0 24px 64px rgba(0,0,0,0.18)", overflow: "hidden",
    animation: "slideUp .22s ease",
  };

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{`@keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#0f172a" }}>
              {isEdit ? "Modifier l'utilisateur" : "Nouvel Utilisateur"}
            </h2>
            <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#6b7280" }}>
              {isEdit ? "Modifiez les informations ci-dessous" : "Remplissez les informations du nouvel utilisateur"}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", display: "flex" }}>
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Nom */}
          <Field label="Nom complet" required>
            <input
              style={{ ...inputStyle, borderColor: errors.nom ? "#ef4444" : "#d1d5db" }}
              value={form.nom} onChange={e => set("nom", e.target.value)}
              placeholder="Ex: Jean Dupont"
              onFocus={e => e.target.style.borderColor = "#3b82f6"}
              onBlur={e => e.target.style.borderColor = errors.nom ? "#ef4444" : "#d1d5db"}
            />
            {errors.nom && <span style={{ fontSize: 11.5, color: "#ef4444" }}>{errors.nom}</span>}
          </Field>

          {/* Email */}
          <Field label="Adresse email" required>
            <input
              style={{ ...inputStyle, borderColor: errors.email ? "#ef4444" : "#d1d5db" }}
              value={form.email} onChange={e => set("email", e.target.value)}
              placeholder="exemple@gmail.com" type="email"
              onFocus={e => e.target.style.borderColor = "#3b82f6"}
              onBlur={e => e.target.style.borderColor = errors.email ? "#ef4444" : "#d1d5db"}
            />
            {errors.email && <span style={{ fontSize: 11.5, color: "#ef4444" }}>{errors.email}</span>}
          </Field>

          {/* Rôle + Agence */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Rôle" required>
              <select style={inputStyle} value={form.role} onChange={e => set("role", e.target.value)}>
                {ROLES_LIST.map(r => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Agence / Groupe">
              <select style={inputStyle} value={form.agence} onChange={e => set("agence", e.target.value)}>
                {AGENCES.map(a => <option key={a}>{a}</option>)}
              </select>
            </Field>
          </div>

          {/* Password (seulement à la création) */}
          {!isEdit && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Mot de passe" required>
                <input
                  style={{ ...inputStyle, borderColor: errors.password ? "#ef4444" : "#d1d5db" }}
                  value={form.password} onChange={e => set("password", e.target.value)}
                  placeholder="••••••••" type="password"
                  onFocus={e => e.target.style.borderColor = "#3b82f6"}
                  onBlur={e => e.target.style.borderColor = errors.password ? "#ef4444" : "#d1d5db"}
                />
                {errors.password && <span style={{ fontSize: 11.5, color: "#ef4444" }}>{errors.password}</span>}
              </Field>
              <Field label="Confirmer" required>
                <input
                  style={{ ...inputStyle, borderColor: errors.confirmPassword ? "#ef4444" : "#d1d5db" }}
                  value={form.confirmPassword} onChange={e => set("confirmPassword", e.target.value)}
                  placeholder="••••••••" type="password"
                  onFocus={e => e.target.style.borderColor = "#3b82f6"}
                  onBlur={e => e.target.style.borderColor = errors.confirmPassword ? "#ef4444" : "#d1d5db"}
                />
                {errors.confirmPassword && <span style={{ fontSize: 11.5, color: "#ef4444" }}>{errors.confirmPassword}</span>}
              </Field>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ padding: "9px 22px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", fontSize: 13.5, fontWeight: 600, color: "#374151", cursor: "pointer" }}>
            Annuler
          </button>
          <button onClick={handleSave} style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
            {isEdit ? "Enregistrer" : "Créer l'utilisateur"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   MODAL — CONFIGURATION RÔLE
═══════════════════════════════════════════════════ */
const ModalRole = ({ role, onClose, onSave }) => {
  const isNew = !role?.id;
  const [form, setForm] = useState({
    nom: role?.nom || "",
    description: role?.description || "",
    couleur: role?.couleur || "#3b82f6",
    permissions: role?.permissions || Object.fromEntries(Object.keys(PERMISSION_LABELS).map(k => [k, false])),
  });

  const togglePerm = (k) => setForm(f => ({ ...f, permissions: { ...f.permissions, [k]: !f.permissions[k] } }));

  const handleSave = () => {
    if (!form.nom.trim()) return;
    onSave({ ...role, ...form, id: role?.id || Date.now() });
    onClose();
  };

  const overlayStyle = { position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(3px)" };

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 540, boxShadow: "0 24px 64px rgba(0,0,0,0.18)", overflow: "hidden", animation: "slideUp .22s ease" }}>
        {/* Header */}
        <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: form.couleur + "20", display: "flex", alignItems: "center", justifyContent: "center", color: form.couleur }}>
              <ShieldIcon />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{isNew ? "Nouveau Rôle" : "Modifier le rôle"}</h2>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>Définissez les permissions de ce rôle</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", display: "flex" }}><XIcon /></button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Nom + couleur */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "end" }}>
            <Field label="Nom du rôle" required>
              <input style={inputStyle} value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                placeholder="Ex: Manager Régional"
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#d1d5db"}
              />
            </Field>
            <Field label="Couleur">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="color" value={form.couleur} onChange={e => setForm(f => ({ ...f, couleur: e.target.value }))}
                  style={{ width: 42, height: 42, border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer", padding: 2 }} />
              </div>
            </Field>
          </div>

          {/* Description */}
          <Field label="Description">
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 68, fontFamily: "inherit" }}
              value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Décrivez les responsabilités de ce rôle…"
              onFocus={e => e.target.style.borderColor = "#3b82f6"}
              onBlur={e => e.target.style.borderColor = "#d1d5db"}
            />
          </Field>

          {/* Permissions */}
          <div>
            <p style={{ margin: "0 0 12px", fontSize: 12.5, fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: ".5px" }}>Permissions</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {Object.entries(PERMISSION_LABELS).map(([key, label]) => {
                const active = form.permissions[key];
                return (
                  <div key={key} onClick={() => togglePerm(key)} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                    borderRadius: 9, border: `1.5px solid ${active ? form.couleur : "#e5e7eb"}`,
                    background: active ? form.couleur + "0d" : "#fafafa",
                    cursor: "pointer", transition: "all .15s",
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                      background: active ? form.couleur : "#fff",
                      border: `2px solid ${active ? form.couleur : "#d1d5db"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all .15s",
                    }}>
                      {active && <CheckIcon />}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#0f172a" : "#6b7280" }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ padding: "9px 22px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", fontSize: 13.5, fontWeight: 600, color: "#374151", cursor: "pointer" }}>
            Annuler
          </button>
          <button onClick={handleSave} style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
            {isNew ? "Créer le rôle" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   PAGE PRINCIPALE
═══════════════════════════════════════════════════ */
export default function UtilisateursRoles() {
  const [tab, setTab] = useState("liste");
  const [users, setUsers] = useState(INIT_USERS);
  const [roles, setRoles] = useState(ROLES_INIT);
  const [page, setPage] = useState(1);

  // Modals
  const [modalUser, setModalUser] = useState(null);   // null = fermé | {} = nouveau | {…user} = edit
  const [modalRole, setModalRole] = useState(null);   // null = fermé | {} = nouveau | {…role} = edit

  const toggle = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, on: !u.on } : u));
  const removeUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));
  const removeRole = (id) => setRoles(prev => prev.filter(r => r.id !== id));

  const saveUser = (u) => {
    setUsers(prev => prev.find(x => x.id === u.id) ? prev.map(x => x.id === u.id ? u : x) : [...prev, u]);
  };
  const saveRole = (r) => {
    setRoles(prev => prev.find(x => x.id === r.id) ? prev.map(x => x.id === r.id ? r : x) : [...prev, r]);
  };

  const roleSummary = ROLES_INIT.map(r => ({ label: r.nom, count: users.filter(u => u.role === r.nom).length }));

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI','Helvetica Neue',sans-serif", background: "#f4f7fb" }}>
      <Sidebar />

      {/* Modals */}
      {modalUser !== null && (
        <ModalUtilisateur user={modalUser} onClose={() => setModalUser(null)} onSave={saveUser} />
      )}
      {modalRole !== null && (
        <ModalRole role={modalRole} onClose={() => setModalRole(null)} onSave={saveRole} />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 32px", height: 64, background: "#fff", borderBottom: "1px solid #e5e9f0" }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a", letterSpacing: ".6px", textTransform: "uppercase" }}>
            Gestion des Utilisateurs &amp; Rôles
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}><BellIcon /></button>
            <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
              <Avatar />
              <span style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Yvan (Admin)</span>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: "28px 32px" }}>

          {/* Tabs + bouton */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
            <div style={{ display: "flex", borderBottom: "2px solid #e5e9f0" }}>
              {[{ key: "liste", label: "LISTE DES UTILISATEURS" }, { key: "config", label: "CONFIGURATION DES RÔLES" }].map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  padding: "10px 26px", background: "none", border: "none",
                  borderBottom: tab === t.key ? "2.5px solid #3b82f6" : "2.5px solid transparent",
                  marginBottom: -2, cursor: "pointer", fontSize: 12.5,
                  fontWeight: tab === t.key ? 700 : 500,
                  color: tab === t.key ? "#3b82f6" : "#6b7280", letterSpacing: ".4px",
                }}>
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "liste" ? (
              <button onClick={() => setModalUser({})} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 20px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13.5, fontWeight: 600 }}>
                <span style={{ fontSize: 20, lineHeight: 1, marginTop: -1 }}>+</span>
                Nouvel Utilisateur
              </button>
            ) : (
              <button onClick={() => setModalRole({})} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 20px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13.5, fontWeight: 600 }}>
                <PlusIcon />
                Nouveau Rôle
              </button>
            )}
          </div>

          {/* ── TAB LISTE ── */}
          {tab === "liste" && (
            <>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e9f0", overflow: "hidden", marginBottom: 24 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e5e9f0" }}>
                      {["Avatar", "Nom Complet", "Email", "Rôle", "Agence/Groupe", "Dernière Activité", "Statut", "Actions"].map((h, i) => (
                        <th key={i} style={{ padding: "13px 16px", textAlign: "left", fontSize: 12.5, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, idx) => (
                      <tr key={u.id} style={{ borderBottom: idx < users.length - 1 ? "1px solid #f1f5f9" : "none" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fafbff"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "13px 16px" }}><Avatar /></td>
                        <td style={{ padding: "13px 16px", fontSize: 13.5, fontWeight: 500, color: "#111827" }}>{u.nom}</td>
                        <td style={{ padding: "13px 16px", fontSize: 13, color: "#4b5563" }}>{u.email}</td>
                        <td style={{ padding: "13px 16px" }}><RoleBadge role={u.role} /></td>
                        <td style={{ padding: "13px 16px", fontSize: 13, color: "#4b5563" }}>{u.agence}</td>
                        <td style={{ padding: "13px 16px", fontSize: 13, color: "#6b7280" }}>{u.activite}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <Toggle on={u.on} onChange={() => toggle(u.id)} />
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <div style={{ display: "flex", gap: 4 }}>
                            <IconBtn title="Modifier" onClick={() => setModalUser(u)}><PencilIcon /></IconBtn>
                            <IconBtn title="Suspendre"><BanIcon /></IconBtn>
                            <IconBtn title="Supprimer" onClick={() => removeUser(u.id)}><TrashIcon color="#ef4444" /></IconBtn>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, padding: "16px 20px" }}>
                  <PageBtn label={<PrevIcon />} onClick={() => setPage(p => Math.max(1, p - 1))} />
                  {[1, 2].map(n => <PageBtn key={n} label={n} active={page === n} onClick={() => setPage(n)} />)}
                  <span style={{ fontSize: 14, color: "#9ca3af" }}>...</span>
                  <PageBtn label="16" onClick={() => setPage(16)} />
                  <PageBtn label={<NextIcon />} onClick={() => setPage(p => p + 1)} />
                </div>
              </div>

              {/* Résumé rôles */}
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e9f0", padding: "20px 24px", maxWidth: 340 }}>
                <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: ".6px" }}>Résumé des Rôles</p>
                {roleSummary.map((r, i) => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < roleSummary.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <span style={{ fontSize: 13.5, color: "#374151" }}>{r.label}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "#111827" }}>{r.count}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── TAB CONFIG RÔLES ── */}
          {tab === "config" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
              {roles.map(role => (
                <div key={role.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e9f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  {/* Carte header */}
                  <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: role.couleur + "18", display: "flex", alignItems: "center", justifyContent: "center", color: role.couleur }}>
                        <ShieldIcon />
                      </div>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0f172a" }}>{role.nom}</div>
                        <div style={{ fontSize: 11.5, color: "#6b7280", marginTop: 2 }}>{users.filter(u => u.role === role.nom).length} utilisateur(s)</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <IconBtn title="Modifier" onClick={() => setModalRole(role)}><PencilIcon /></IconBtn>
                      <IconBtn title="Supprimer" onClick={() => removeRole(role.id)}><TrashIcon color="#ef4444" /></IconBtn>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ padding: "12px 20px 6px" }}>
                    <p style={{ margin: 0, fontSize: 12.5, color: "#6b7280", lineHeight: 1.5 }}>{role.description}</p>
                  </div>

                  {/* Permissions */}
                  <div style={{ padding: "10px 20px 18px" }}>
                    <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".5px" }}>Permissions</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {Object.entries(PERMISSION_LABELS).map(([key, label]) => {
                        const active = role.permissions[key];
                        return (
                          <span key={key} style={{
                            padding: "3px 10px", borderRadius: 20, fontSize: 11.5, fontWeight: 500,
                            background: active ? role.couleur + "15" : "#f1f5f9",
                            color: active ? role.couleur : "#9ca3af",
                            border: `1px solid ${active ? role.couleur + "40" : "#e5e7eb"}`,
                          }}>
                            {active ? "✓ " : ""}{label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 32px", borderTop: "1px solid #e5e9f0", background: "#fff", fontSize: 12, color: "#9ca3af" }}>
          <span>GFA Support Platform © 2026</span>
          <span>Powered by React &amp; Vite</span>
        </div>
      </div>
    </div>
  );
}
