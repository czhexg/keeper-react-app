import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-body">
            <h2>This is an attempt at a Google Keep Clone</h2>
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Home;
