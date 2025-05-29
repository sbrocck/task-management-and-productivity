import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to Task Management App</h1>
      <p>Manage your tasks efficiently and stay productive.</p>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "#007bff", fontWeight: "bold" }}>
        Go to Dashboard
      </Link>
    </main>
  );
};

export default Home;
