import React, { useState } from "react";
import Login from "./components/Login.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./components/Dashboard/Head";
import Sidebar from "./components/Dashboard/sidebar";
import Home from "./components/Dashboard/Home";
import AddUser from "./components/Dashboard/AddUser"; // ← AJOUTE

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
      {/* ← AJOUTE cette route */}
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
    </Routes>
  );
}

export default App;
