import React, { useState } from "react";
import Login from "./components/Login.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./components/Dashboard/Head";
import Sidebar from "./components/Dashboard/sidebar";
import Home from "./components/Dashboard/Home";
import AddUser from "./components/Dashboard/AddUser";
import HomeEmploye from "./components/Dashboard/HomeEmploye";
import CreateAgence from "./components/Dashboard/AddAgence";
import CreateFiliale from "./components/Dashboard/AddFiliale";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <Routes>
      {/* Page de connexion */}
      <Route path="/" element={<Login />} />

      {/* Dashboard Admin */}
      <Route
        path="/Dashboard"
        element={
          <div className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}>
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <Home />
          </div>
        }
      />

      {/* Ajouter un utilisateur */}
      <Route
        path="/Dashboard/add-user"
        element={
          <div className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}>
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <AddUser />
          </div>
        }
      />

      {/* Dashboard Employé */}
      <Route
        path="/Dashboard/employe"
        element={
          <div className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}>
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <HomeEmploye />
          </div>
        }
      />

      {/* Créer une agence */}
      <Route
        path="/Dashboard/create-agence"
        element={
          <div className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}>
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <CreateAgence />
          </div>
        }
      />

      {/* Créer une filiale */}
      <Route
        path="/Dashboard/create-filiale"
        element={
          <div className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}>
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <CreateFiliale />
          </div>
        }
      />
    </Routes>
  );
}

export default App;