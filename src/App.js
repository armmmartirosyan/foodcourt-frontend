import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Single from "./pages/Single";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Basket from "./pages/Basket";
import Profile from "./pages/Profile";
import SingleBranch from "./pages/SingleBranch";
import ChangePasswordStep1 from "./pages/ChangePasswordStep1";
import ChangePasswordStep2 from "./pages/ChangePasswordStep2";
import ConfirmUser from "./pages/ConfirmUser";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/change-password-step-1" element={<ChangePasswordStep1/>}/>
                <Route path="/change-password-step-2/:email" element={<ChangePasswordStep2/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/users/confirm" element={<ConfirmUser/>}/>
                <Route path="/basket" element={<Basket/>}/>
                <Route path="/branch/:id" element={<SingleBranch/>}/>
                <Route path="/menu/:slugName" element={<Menu/>}/>
                <Route path="/product/:slugName" element={<Single/>}/>
            </Routes>
            <ToastContainer closeOnClick visibilityTime={2000} autoHide={true}/>
        </BrowserRouter>
    );
}

export default App;
