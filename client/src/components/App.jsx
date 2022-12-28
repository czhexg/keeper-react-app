import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Layout from "./Boilerplates/Layout";
import NoPage from "./Boilerplates/NoPage";
import Home from "./Home/Home";
import Main from "./Main/Main";

function App() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="main" element={<Main />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
