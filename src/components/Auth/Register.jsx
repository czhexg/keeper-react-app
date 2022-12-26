import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((data) => {
                console.log(data);
                return data.json();
            })
            .then(navigate("/main"));
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
