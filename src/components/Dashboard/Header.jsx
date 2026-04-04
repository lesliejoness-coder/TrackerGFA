// components/Header.jsx
import React from "react";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow">
      
      {/* Responsive: input prend toute la largeur sur mobile */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-full md:w-1/3 px-3 py-2 border rounded-lg"
      />

      <UserProfile />
    </div>
  );
};

export default Header;