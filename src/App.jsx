import React from "react";
import Login from "./components/login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./components/Dashboard/Head";
import Sidebar from "./components/Dashboard/sidebar";
import Home from "./components/Dashboard/Home";
import AddUser from "./components/Dashboard/AddUser";
import HomeEmploye from './components/Dashboard/HomeEmploye';

function App() {
  return (
    <Routes>
      {/* Page de connexion */}
      <Route path="/" element={<Login />} />

      {/* Dashboard Admin */}
      <Route
        path="/Dashboard"
        element={
          <div className="grid-container">
            <Head />
            <Sidebar />
            <Home />
          </div>
        }
      />

      {/* Ajouter un utilisateur */}
      <Route
        path="/Dashboard/add-user"
        element={
          <div className="grid-container">
            <Head />
            <Sidebar />
            <AddUser />
          </div>
        }
      />

      {/* Dashboard Employé */}
      <Route
        path="/Dashboard/employe"
        element={
          <div className="grid-container">
            <Head />
            <Sidebar />
            <HomeEmploye />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
