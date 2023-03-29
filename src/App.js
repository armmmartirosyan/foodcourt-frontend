import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Single from "./pages/Single";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Basket from "./pages/Basket";
import Profile from "./pages/Profile";
import ChangePasswordStep1 from "./pages/ChangePasswordStep1";
import ChangePasswordStep2 from "./pages/ChangePasswordStep2";
import ConfirmUser from "./pages/ConfirmUser";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ChangeEmailStep1 from "./pages/ChangeEmailStep1";
import ChangeEmailStep2 from "./pages/ChangeEmailStep2";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/change-password-step-1" element={<ChangePasswordStep1/>}/>
                <Route path="/change-password-step-2/:email" element={<ChangePasswordStep2/>}/>
                <Route path="/change-email-step-1" element={<ChangeEmailStep1/>}/>
                <Route path="/change-email-step-2/:email" element={<ChangeEmailStep2/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/users/confirm" element={<ConfirmUser/>}/>
                <Route path="/basket" element={<Basket/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/product/:slugName" element={<Single/>}/>
                <Route path="/about" element={<About/>}/>

                <Route path='/not-found' element={<NotFound/>}/>
                <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
            <ToastContainer closeOnClick visibilityTime={2000} autoHide={true}/>
        </BrowserRouter>
    );
}

export default App;
