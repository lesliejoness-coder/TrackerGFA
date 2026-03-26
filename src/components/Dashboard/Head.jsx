import React, { useState } from "react";
import {
  BsBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import ProfileModal from "./profil";

const Head = ({ toggleSidebar }) => {
  const [openProfile, setOpenProfile] = useState(false);

  const user = {
    firstName: "leslie",
    lastName: "kamtchueng",
    email: "lesliejoness319@gmail.com",
    phone: "658002164",
    role: "Admin",
    entity: "TrackerGFA",
  };

  return (
    <header className="head">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={toggleSidebar} />
      </div>

      <div className="head-right">
        <BsBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />

        {/* 👇 ICI on clique */}
        <BsPersonCircle className="icon" onClick={() => setOpenProfile(true)} />
      </div>

      {/* 👇 Modal */}
      <ProfileModal
        isOpen={openProfile}
        onClose={() => setOpenProfile(false)}
        user={user}
      />
    </header>
  );
};

export default Head;
