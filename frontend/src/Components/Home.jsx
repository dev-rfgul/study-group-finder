import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Helper function to highlight matched text
const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-purple-300">{part}</span>
        ) : (
            part
        )
    );
};

const Home = () => {
    const location = useLocation();
    const { user } = location.state || {}
    console.log(user)

    const [users, setUsers] = useState([])
    const [departments, setDepartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios
            .get('http://localhost:3001/getGroups')
            .then(result => setDepartments(result.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/getUsers')
            .then(result => setUsers(result.data))
            .catch(error => console.log(error))
    }, [])
    // Filter departments based on search query
    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
            <div className="text-center mb-12">
                <h1 className="text-5xl text-white md:text-5xl font-extrabold">
                <span className="bg-gradient-to-br from-purple-400 to-blue-400 text-transparent bg-clip-text">Welcome Back </span>MR {user.name}
                </h1>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white">
                    Find Your <span className="bg-gradient-to-br from-purple-400 to-blue-400 text-transparent bg-clip-text">Study Group</span>
                </h1>
                <p className="text-gray-200 mt-4 text-2xl ">
                    Discover study groups for different departments and enhance your learning.
                </p>
            </div>

            {/* Search Field */}
            <div className="max-w-md mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search by department or group name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Display Filtered Departments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredDepartments.length > 0 ? (
                    filteredDepartments.map(dept => (
                        <Link
                            key={dept.id}
                            to={`/${dept.id}`}
                            className="group relative block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300 transform hover:translate-y-2"
                        >
                            <img
                                src={dept.image}
                                alt={dept.name}
                                className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">
                                    {highlightText(dept.name, searchQuery)}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {highlightText(dept.description, searchQuery)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {highlightText(dept.department, searchQuery)}
                                </p>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
                                >
                                    Join Now
                                </button>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25 group-hover:opacity-0 transition-opacity duration-300"></div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
                        No study groups available at the moment.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;
