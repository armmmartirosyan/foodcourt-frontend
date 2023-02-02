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
import AddCard from "./pages/AddCard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/add-card" element={<AddCard/>}/>
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
