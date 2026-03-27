import React, { useState } from 'react';
import {
  BsClipboardCheck,
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsExclamationOctagonFill,
  BsListTask,
  BsArrowRepeat,
  BsPlayCircle,
  BsCheckLg,
  BsEyeFill,
  BsPersonFill,
} from 'react-icons/bs';
import { PieChart, Pie, Cell, Sector, Tooltip, Legend } from 'recharts';

// ============= DONNÉES STATIQUES =============
const CHART_DATA = [
  { name: 'Tâches complétées',  value: 5 },
  { name: 'En cours',           value: 3 },
  { name: 'En attente',         value: 2 },
  { name: 'Incidents signalés', value: 2 },
];
const CHART_COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF4444'];
const RADIAN = Math.PI / 180;

// 3 cartes seulement (sans "Mon agence")
const STATS_CARDS = [
  { title: 'Tâches du jour',     icon: BsClipboardCheck,         color: '#0088FE' },
  { title: 'Tâches complétées',  icon: BsCheckCircleFill,         color: '#00C49F' },
  { title: 'Incidents signalés', icon: BsExclamationTriangleFill, color: '#FFBB28' },
];
const STATS_VALUES = [8, 5, 2];

const TACHES_DATA = [
  { id: 1, titre: 'Vérification réseau agence Rivoli', priorite: 'Critique', statut: 'En cours',   echeance: '2024-03-25' },
  { id: 2, titre: 'Rapport mensuel équipements',        priorite: 'Moyen',   statut: 'En attente', echeance: '2024-03-26' },
  { id: 3, titre: 'Maintenance serveur principal',      priorite: 'Critique', statut: 'Résolu',     echeance: '2024-03-24' },
  { id: 4, titre: 'Formation nouveaux employés',        priorite: 'Faible',  statut: 'En attente', echeance: '2024-03-28' },
  { id: 5, titre: 'Mise à jour logiciel caisse',        priorite: 'Moyen',   statut: 'Résolu',     echeance: '2024-03-23' },
  { id: 6, titre: 'Audit sécurité portes',              priorite: 'Critique', statut: 'En cours',   echeance: '2024-03-27' },
];

const TYPE_INCIDENTS = [
  'Panne réseau', 'Problème électrique', "Fuite d'eau",
  'Panne matériel', 'Problème sécurité', 'Autre',
];

function HomeEmploye() {
  const [activeIndex,   setActiveIndex]   = useState(0);
  const [showModal,     setShowModal]     = useState(false);
  const [form,          setForm]          = useState({ type: '', gravite: '', description: '' });
  const [submitted,     setSubmitted]     = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState(null);
  const [taches,        setTaches]        = useState(TACHES_DATA);
  const isAnimationActive = true;

  // Fermer dropdown si clic ailleurs
  const handleOverlayClick = () => setOpenDropdown(null);

  const updateStatut = (id, statut) => {
    setTaches(prev => prev.map(t => t.id === id ? { ...t, statut } : t));
    setOpenDropdown(null);
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!cx || !cy || !innerRadius || !outerRadius) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={13}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#333" fontSize={14}>{payload.name}</text>
        <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#666" fontSize={12}>{`${value} (${(percent * 100).toFixed(1)}%)`}</text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      </g>
    );
  };

  const onPieEnter = (_, index) => setActiveIndex(index);

  const handleSubmit = () => {
    if (!form.type || !form.gravite || !form.description) return;
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false); setSubmitted(false);
      setForm({ type: '', gravite: '', description: '' });
    }, 1800);
  };

  const prioriteBadgeClass = (p) => ({
    'Critique': 'priorite-critique',
    'Moyen':    'priorite-moyen',
    'Faible':   'priorite-faible',
  }[p] || '');

  const statutBadgeClass = (s) => ({
    'Résolu':     'statut-resolu',
    'En cours':   'statut-en-cours',
    'En attente': 'statut-en-attente',
  }[s] || '');

  return (
    <main className="main-container" onClick={handleOverlayClick}>

      {/* ====== BANNIÈRE PLEINE LARGEUR ====== */}
      <div className="incident-banner-full">
        <div className="banner-alert">
          <BsExclamationOctagonFill size={13} />
          <span>Signalez tout problème immédiatement</span>
        </div>
        <div className="banner-actions">
          <button className="btn-signaler" onClick={(e) => { e.stopPropagation(); setShowModal(true); }}>
            ⚠️ Signaler un incident
          </button>
        </div>
      </div>

      {/* ====== TITRE ====== */}
      <div className="main-title">
        <h3>Bonjour, Jean Dupont 👋</h3>
      </div>

      {/* ====== CARTES STATS — 3 cartes très espacées ====== */}
      <div className="stats-grid">
        {STATS_CARDS.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className="stat-card" style={{ borderTop: `4px solid ${card.color}` }}>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-value">{STATS_VALUES[index]}</p>
              </div>
              <div className="card-icon" style={{ color: card.color }}>
                <IconComponent size={34} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ====== GRAPHIQUE ====== */}
      <div className="chart-section">
        <div className="chart-wrapper">
          <h4>Répartition de mes activités</h4>
          <div className="pie-container">
            <PieChart width={780} height={420}>
              <Pie
                data={CHART_DATA}
                cx={390} cy={185}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={185}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={isAnimationActive}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
              >
                {CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 20 }} iconSize={14} iconType="circle" />
            </PieChart>
          </div>
        </div>
      </div>

      {/* ====== TABLEAU DES TÂCHES ====== */}
      <div className="tabs-section">
        <h4 className="tabs-title">
          <BsListTask style={{ marginRight: 8, verticalAlign: 'middle' }} />
          Mes tâches assignées
          <span className="tab-count" style={{ backgroundColor: '#0088FE', marginLeft: 10 }}>
            {taches.length}
          </span>
        </h4>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre de la tâche</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Échéance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taches.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.titre}</td>
                  <td>
                    <span className={`badge ${prioriteBadgeClass(t.priorite)}`}>{t.priorite}</span>
                  </td>
                  <td>
                    <span className={`badge ${statutBadgeClass(t.statut)}`}>{t.statut}</span>
                  </td>
                  <td>{t.echeance}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <div className="dropdown-wrapper">
                      <button
                        className="dropdown-btn"
                        onClick={() => setOpenDropdown(openDropdown === t.id ? null : t.id)}
                      >
                        Actions ▾
                      </button>
                      {openDropdown === t.id && (
                        <div className="dropdown-menu">
                          <button className="dropdown-item item-encours" onClick={() => updateStatut(t.id, 'En cours')}>
                            <BsPlayCircle size={14} /> En cours
                          </button>
                          <button className="dropdown-item item-resolu" onClick={() => updateStatut(t.id, 'Résolu')}>
                            <BsCheckLg size={14} /> Résolu
                          </button>
                          <button className="dropdown-item item-detail">
                            <BsEyeFill size={14} /> Détail
                          </button>
                          <button className="dropdown-item item-affecter">
                            <BsPersonFill size={14} /> Affecter
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====== MODAL INCIDENT ====== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="modal-success">
                <div className="success-icon">✅</div>
                <h3>Incident signalé !</h3>
                <p>Votre signalement a bien été envoyé. Une équipe prendra en charge rapidement.</p>
              </div>
            ) : (
              <>
                <div className="modal-head">
                  <div className="modal-head-left">
                    <BsExclamationOctagonFill size={20} />
                    <span>Signaler un incident</span>
                  </div>
                  <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                </div>
                <div className="modal-body">
                  <label className="field-label">Type d'incident <span className="req">*</span></label>
                  <select className="field-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="">— Sélectionner —</option>
                    {TYPE_INCIDENTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>

                  <label className="field-label">Niveau de gravité <span className="req">*</span></label>
                  <div className="gravite-row">
                    {['Faible', 'Moyen', 'Critique'].map(g => (
                      <button
                        key={g}
                        className={`gravite-btn gravite-${g.toLowerCase()} ${form.gravite === g ? 'selected' : ''}`}
                        onClick={() => setForm({ ...form, gravite: g })}
                      >
                        {g === 'Faible' ? '🟢' : g === 'Moyen' ? '🟡' : '🔴'} {g}
                      </button>
                    ))}
                  </div>

                  <label className="field-label">Description <span className="req">*</span></label>
                  <textarea
                    className="field-textarea"
                    rows={4}
                    placeholder="Décrivez l'incident en détail : lieu, heure, nature du problème..."
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                  />

                  <div className="modal-actions">
                    <button className="btn-cancel" onClick={() => setShowModal(false)}>Annuler</button>
                    <button
                      className={`btn-submit ${(!form.type || !form.gravite || !form.description) ? 'disabled' : ''}`}
                      onClick={handleSubmit}
                    >
                      ✓ Envoyer le signalement
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`

        .main-container {
          padding: 0;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          box-sizing: border-box;
        }

        /* ---- BANNIÈRE PLEINE LARGEUR ---- */
        .incident-banner-full {
          width: 100%;
          background: #fff8e1;
          border-bottom: 1px solid #ffc107;
          padding: 10px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          box-sizing: border-box;
          flex-wrap: wrap;
        }

        .banner-alert {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #856404;
          font-size: 13px;
          font-weight: 500;
        }

        .banner-actions { display: flex; align-items: center; gap: 10px; }

        .btn-signaler {
          background: #FF4444;
          color: white;
          border: none;
          padding: 7px 18px;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: background 0.2s;
          box-shadow: 0 2px 4px rgba(255,68,68,0.3);
        }
        .btn-signaler:hover { background: #c0392b; }

        /* ---- TITRE ---- */
        .main-title { padding: 24px 28px 0 28px; margin-bottom: 24px; }
        .main-title h3 { font-size: 24px; color: #333; margin: 0; }

        /* ---- STATS — 3 cartes très espacées ---- */
        .stats-grid {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 40px;
          padding: 0 28px;
          box-sizing: border-box;
        }

        .stat-card {
          flex: 1;
          background: white;
          border-radius: 8px;
          padding: 28px 26px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }

        .card-content { flex: 1; }
        .card-title { font-size: 14px; color: #666; margin: 0 0 12px 0; font-weight: 500; }
        .card-value { font-size: 28px; font-weight: bold; color: #333; margin: 0; }

        .card-icon {
          display: flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; border-radius: 50%; background: rgba(0,0,0,0.02);
        }

        /* ---- GRAPHIQUE ---- */
        .chart-section {
          background: white;
          border-radius: 8px;
          padding: 10px 28px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin: 0 28px 40px 28px;
        }
        .chart-wrapper { width: 100%; }
        .chart-wrapper h4 { text-align: center; margin-bottom: 10px; color: #333; font-size: 18px; }
        .pie-container { display: flex; justify-content: center; align-items: center; overflow-x: auto; }

        /* ---- TABLEAU ---- */
        .tabs-section {
          background: white;
          border-radius: 8px;
          padding: 24px 28px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin: 0 28px 28px 28px;
        }

        .tabs-title { margin: 0 0 20px 0; color: #333; font-size: 18px; display: flex; align-items: center; }

        .tab-count {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 20px; height: 20px; padding: 0 6px;
          border-radius: 10px; font-size: 11px; font-weight: 600; color: white;
        }

        .table-container { overflow-x: auto; border-radius: 8px; }

        .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }

        .data-table th {
          background: #f8f9fa; color: #495057; font-weight: 600;
          padding: 14px 16px; text-align: left; border-bottom: 2px solid #dee2e6;
        }

        .data-table td { padding: 14px 16px; border-bottom: 1px solid #e9ecef; color: #212529; }
        .data-table tbody tr:hover { background-color: #f8f9fa; }

        /* ---- BADGES ---- */
        .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 500; }

        /* Priorités : Critique / Moyen / Faible */
        .priorite-critique { background: #f8d7da; color: #721c24; }
        .priorite-moyen    { background: #fff3cd; color: #856404; }
        .priorite-faible   { background: #d1ecf1; color: #0c5460; }

        /* Statuts */
        .statut-resolu     { background: #d4edda; color: #155724; }
        .statut-en-cours   { background: #cce5ff; color: #004085; }
        .statut-en-attente { background: #e2e3e5; color: #383d41; }

        /* ---- DROPDOWN ACTIONS (même style que Home.jsx) ---- */
        .dropdown-wrapper { position: relative; display: inline-block; }

        .dropdown-btn {
          background: #4a6fa5;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .dropdown-btn:hover { background: #3a5a8a; }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 200;
          min-width: 150px;
          overflow: hidden;
          margin-top: 4px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 9px 14px;
          background: none;
          border: none;
          text-align: left;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.15s;
          color: #333;
          white-space: nowrap;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .dropdown-item:hover   { background: #f0f4ff; }
        .item-encours:hover    { color: #004085; }
        .item-resolu:hover     { color: #155724; }
        .item-detail:hover     { color: #0c5460; }
        .item-affecter:hover   { color: #856404; }

        /* ---- MODAL ---- */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center; z-index: 999;
        }

        .modal-box {
          background: white; border-radius: 8px; width: 100%; max-width: 480px;
          margin: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); overflow: hidden;
        }

        .modal-head {
          background: linear-gradient(135deg, #FF4444, #c0392b);
          padding: 16px 20px; display: flex; justify-content: space-between;
          align-items: center; color: white;
        }
        .modal-head-left { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; }
        .modal-close { background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0 4px; line-height: 1; opacity: 0.85; transition: opacity 0.2s; }
        .modal-close:hover { opacity: 1; }

        .modal-body { padding: 20px; }
        .field-label { display: block; font-size: 13px; font-weight: 600; color: #495057; margin-bottom: 6px; }
        .req { color: #FF4444; }

        .field-select, .field-textarea {
          width: 100%; padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 5px;
          font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #212529; background: white; margin-bottom: 16px; outline: none;
          box-sizing: border-box; transition: border-color 0.2s;
        }
        .field-select:focus, .field-textarea:focus { border-color: #FF4444; }
        .field-textarea { resize: vertical; }

        .gravite-row { display: flex; gap: 10px; margin-bottom: 16px; }
        .gravite-btn {
          flex: 1; padding: 8px 6px; border-radius: 5px; border: 1px solid #dee2e6;
          background: #f8f9fa; font-size: 13px; font-weight: 500; cursor: pointer;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: all 0.2s; color: #495057;
        }
        .gravite-btn:hover { background: #e9ecef; }
        .gravite-btn.selected.gravite-faible   { border-color: #00C49F; background: #d4edda; color: #155724; }
        .gravite-btn.selected.gravite-moyen    { border-color: #FFBB28; background: #fff3cd; color: #856404; }
        .gravite-btn.selected.gravite-critique { border-color: #FF4444; background: #f8d7da; color: #721c24; }

        .modal-actions { display: flex; gap: 10px; margin-top: 4px; }

        .btn-cancel {
          flex: 1; padding: 10px; border: 1px solid #dee2e6; border-radius: 5px;
          background: white; font-size: 14px; font-weight: 500; color: #666;
          cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: background 0.2s;
        }
        .btn-cancel:hover { background: #f8f9fa; }

        .btn-submit {
          flex: 2; padding: 10px; border: none; border-radius: 5px;
          background: #FF4444; font-size: 14px; font-weight: 600; color: white;
          cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: background 0.2s;
        }
        .btn-submit:hover    { background: #c0392b; }
        .btn-submit.disabled { opacity: 0.5; cursor: not-allowed; }

        .modal-success    { padding: 40px 30px; text-align: center; }
        .success-icon     { font-size: 48px; margin-bottom: 14px; }
        .modal-success h3 { font-size: 18px; font-weight: 600; color: #155724; margin: 0 0 8px; }
        .modal-success p  { font-size: 14px; color: #666; margin: 0; }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 768px) {
          .stats-grid           { flex-direction: column; padding: 0 14px; gap: 16px; }
          .stat-card            { width: 100%; }
          .pie-container        { overflow-x: auto; justify-content: flex-start; }
          .incident-banner-full { flex-direction: column; align-items: flex-start; }
          .chart-section        { margin: 0 14px 28px 14px; }
          .tabs-section         { margin: 0 14px 28px 14px; }
          .gravite-row          { flex-direction: column; }
        }
      `}</style>
    </main>
  );
}

export default HomeEmploye;
