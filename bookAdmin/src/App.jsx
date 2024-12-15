import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Navigate, } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { User } from "./pages/user";
import { Admin } from "./pages/admin";
import { Editbook } from "./pages/editbook";
import { Addbook } from "./pages/addbook";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const checkLoginStatus = async()=>{
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try{
                    const { role } = JSON.parse(storedUser);
                    setIsLoggedIn(true);
                    setUserRole(role);
                }catch(error){
                    console.error("解析信息出错",error)
                }
            }
        }
        checkLoginStatus()
    }, []);

    return (
        <Router>
            <Routes>
                {}
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
                <Route path="/register" element={<Register />} />
                {}
                <Route path="/user" element={isLoggedIn? <User /> : <Navigate to="/" replace />} />
                <Route path="/admin" element={isLoggedIn && userRole === "admin"? <Admin /> : <Navigate to="/" replace />} />
                <Route path="/editbook/:bookId" element={isLoggedIn && userRole === "admin"? <Editbook /> : <Navigate to="/" replace />} />
                <Route path="/addbook" element={isLoggedIn && userRole === "admin"? <Addbook /> : <Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;