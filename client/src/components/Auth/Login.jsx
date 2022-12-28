import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                Cookies.set("username", username);
                navigate("/main");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="auth-page">
            <h1>Login</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default Login;
