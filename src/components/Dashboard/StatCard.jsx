import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="
      bg-white p-4 rounded-xl shadow 
      w-full 
      sm:w-[48%]   // 2 colonnes tablette
      lg:w-[23%]   // 4 colonnes desktop
    ">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;