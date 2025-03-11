import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";

const AdminAuth = ({ setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/auth/login";
    const body = { email, password };

    console.log("Sending login request:", { url, body }); // Debug log

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Backend response:", data); // Debug log

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! Status: ${response.status}`);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setUserRole(data.role);

      if (data.role !== "admin") {
        alert("Admins only!");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Failed to log in: ${error.message}`);
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;