import React from "react";
import Login from "./components/login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./components/Dashboard/Head";
import Sidebar from "./components/Dashboard/sidebar";
import Home from "./components/Dashboard/Home";
import AddUser from "./components/Dashboard/AddUser";
import CreateAgence from "./components/Dashboard/AddAgence";
import CreateFiliale from "./components/Dashboard/AddFiliale";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
      <Route
        path="/Dashboard/create-agence"
        element={
          <div className="grid-container">
            <Head />
            <Sidebar />
            <CreateAgence />
          </div>
        }
      />
      <Route
        path="/Dashboard/create-filiale"
        element={
          <div className="grid-container">
            <Head />
            <Sidebar />
            <CreateFiliale />
          </div>
        }
      />
    </Routes>
  );
}

export default App;