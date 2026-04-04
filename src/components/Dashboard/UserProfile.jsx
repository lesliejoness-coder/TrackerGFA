import React, { useState } from "react";
import { user } from "././data/mockData.js";


const UserProfile = () => {
  const [avatar, setAvatar] = useState(user.avatar);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // preview instantané
    }
  };

  return (
    <div className="flex items-center gap-3">
      
      {/* Image cliquable pour upload */}
      <label className="cursor-pointer">
        <img
          src={avatar}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <input type="file" hidden onChange={handleChange} />
      </label>

      <div className="hidden sm:block">
        {/* caché sur mobile pour responsivité */}
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;