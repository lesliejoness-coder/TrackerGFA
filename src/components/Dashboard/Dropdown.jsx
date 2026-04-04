// components/Dropdown.jsx
import React, { useState } from "react";

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 hover:bg-gray-700"
      >
        {title}
      </button>

      {open && (
        <div className="ml-4">
          {items.map((item, i) => (
            <p key={i} className="px-4 py-1 text-sm text-gray-300">
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;