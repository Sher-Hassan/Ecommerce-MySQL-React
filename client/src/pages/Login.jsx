import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import axios from "../utils/axios.js";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });

  const [err, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", inputs);
      let userData = res.data.user; // Includes the isAdmin flag
      // Normalize ID for admin
      if (userData.AdminID) {
        userData = { ...userData, UserID: userData.AdminID };
      }
      setSuccess(res.data.message);
      setError(null);

      // Redirect based on the user role
      if (userData.isAdmin) {
        onLogin(userData);
        navigate("/admin");
      } else {
        setTimeout(() => {
          onLogin(userData);
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
      setSuccess(null);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="Password"
          onChange={handleChange}
          required
        />
        <button onClick={handleSubmit}>Login</button>

        {err && <p style={{ color: "red", paddingTop: "15px" }}>{err}</p>}
        {success && <p style={{ color: "green", paddingTop: "15px" }}>{success}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
