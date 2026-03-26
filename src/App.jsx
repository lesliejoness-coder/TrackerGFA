import React, { useState } from "react";
import Login from "./components/Login.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./components/Dashboard/Head";
import Sidebar from "./components/Dashboard/sidebar";
import Home from "./components/Dashboard/Home";
import AddUser from "./components/Dashboard/AddUser";
<<<<<<< HEAD
import HomeEmploye from './components/Dashboard/HomeEmploye';
=======
import CreateAgence from "./components/Dashboard/AddAgence";
import CreateFiliale from "./components/Dashboard/AddFiliale";
>>>>>>> 16c8a1c2d9867b641bee1270f8996c9983396919

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
          <div
            className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}
          >
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar
              collapsed={sidebarCollapsed}
              toggleSidebar={toggleSidebar}
            />
            <Home />
          </div>
        }
      />

<<<<<<< HEAD
      {/* Ajouter un utilisateur */}
=======
>>>>>>> 16c8a1c2d9867b641bee1270f8996c9983396919
      <Route
        path="/Dashboard/add-user"
        element={
          <div
            className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}
          >
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar
              collapsed={sidebarCollapsed}
              toggleSidebar={toggleSidebar}
            />
            <AddUser />
          </div>
        }
      />
<<<<<<< HEAD

      {/* Dashboard Employé */}
      <Route
        path="/Dashboard/employe"
        element={
          <div className="grid-container">
            <Head />
            <Sidebar />
            <HomeEmploye />
=======
      <Route
        path="/Dashboard/create-agence"
        element={
          <div
            className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}
          >
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar
              collapsed={sidebarCollapsed}
              toggleSidebar={toggleSidebar}
            />
            <CreateAgence />
          </div>
        }
      />
      <Route
        path="/Dashboard/create-filiale"
        element={
          <div
            className={`grid-container ${sidebarCollapsed ? "collapsed" : ""}`}
          >
            <Head toggleSidebar={toggleSidebar} />
            <Sidebar
              collapsed={sidebarCollapsed}
              toggleSidebar={toggleSidebar}
            />
            <CreateFiliale />
>>>>>>> 16c8a1c2d9867b641bee1270f8996c9983396919
          </div>
        }
      />
    </Routes>
  );
}

export default App;
