import React from "react";
import {
  BsBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

const Head = () => {
  return (
    <header className="head">
      <div className="menu-icon">
        <BsJustify className="icon" />
      </div>
      <div className="head-left">
        <BsSearch className="icon" />
      </div>
      <div className="head-right">
        <BsBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
};

export default Head;
