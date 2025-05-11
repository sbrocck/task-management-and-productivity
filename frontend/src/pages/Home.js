import React from "react";
import { Link } from "react-router-dom"; // Make sure you've installed react-router-dom

const Home = () => {
    return (
        <div>
            <h1>Welcome to Task Management App</h1>
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    );
};

export default Home;
