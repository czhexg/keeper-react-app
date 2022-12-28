import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    function logout() {
        fetch("/api/logout")
            .then((response) => {
                return response.json();
            })
            .then(() => {
                console.log("navigate");
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <header>
            <h1>
                <Link to="/main">Keeper</Link>
            </h1>
            <button type="button" onClick={logout}>
                Logout
            </button>
        </header>
    );
}

export default Header;
