import React, { useState, useEffect } from "react";
import User from './admin/User'
import Home from "./Components/Home"
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Groups from './Components/Groups'
import Singup from "./Components/Singup";
import UpdateUser from "./admin/UpdateUser";
import UpdateGroup from "./admin/UpdateGroup";
import WelcomePage from "./Components/Welcome";
import CreateGroup from './Components/CreateGroup'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
    // Track user authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in (this is just an example, modify as needed)
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <Router>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                    {/* Conditionally render the navbar */}
                    {!isLoggedIn && (
                        <nav className="flex justify-center p-4 bg-blue-500 text-white">
                            <Link to="/login" className="px-4 hover:underline">
                                Login
                            </Link>
                            <Link to="/signup" className="px-4 hover:underline">
                                Sign Up
                            </Link>
                        </nav>
                    )}

                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/admin/createGroup" element={<CreateGroup />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/user" element={<User />} />
                        <Route path="/admin/groups" element={<Groups />} />
                        <Route path="/admin/user/editUser/:id" element={<UpdateUser />} />
                        <Route path="/admin/group/editGroup/:id" element={<UpdateGroup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Singup />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
};

export default App;
