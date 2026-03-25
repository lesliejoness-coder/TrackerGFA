import React from "react";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    // For now, redirect directly to Dashboard
navigate("/Dashboard");
  };

  return (
    <div className="login-container">
      <div className="form-box login">
        <form action="" className="form" onSubmit={handleSubmit}>
          <u>
            <h1>Connexion</h1>
          </u>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <MdEmail className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <button type="submit" className="btn">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
