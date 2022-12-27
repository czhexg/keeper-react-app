import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <p>This is an attempt at a Google Keep Clone</p>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}

export default Home;
