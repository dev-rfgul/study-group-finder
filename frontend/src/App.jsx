import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Singup from "./Components/Singup";
import Home from "./Components/Home"
import SubjectPage from "./Components/SubjectPage";
import WelcomePage from "./Components/Welcome";
import User from './admin/User'
import UpdateUser from "./admin/UpdateUser";
import Admin from "./Components/Admin";

const App = () => {

    return (
        <>
            <Router>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                    <nav className="flex justify-center p-4 bg-blue-500 text-white">
                        <Link to="/login" className="px-4 hover:underline">
                            Login
                        </Link>
                        <Link to="/signup" className="px-4 hover:underline">
                            Sign Up
                        </Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/user" element={<User />} />
                        <Route path="/admin/user/editUser/:id" element={<UpdateUser />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Singup />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/:department" element={<SubjectPage />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
};

export default App;
