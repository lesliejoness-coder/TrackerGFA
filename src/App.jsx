import React from "react";
import Login from "./components/login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./components/Dashboard/Head";
import Sidebar from "./components/Dashboard/sidebar";
import Home from "./components/Dashboard/Home";
import AddUser from "./components/Dashboard/AddUser"; // ← AJOUTE

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
      {/* ← AJOUTE cette route */}
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
    </Routes>
  );
}

export default App;