import React from "react";
import Login from "./components/login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./components/Dashboard/Head";
import Sidebar from "./components/Dashboard/sidebar";
import Home from "./components/Dashboard/Home";

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
    </Routes>
  );
}


export default App;
