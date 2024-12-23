import React, { useState } from "react";

const Login = () => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Log In
                        </h2>
                        <button
                            onClick={toggleDarkMode}
                            className="py-1 px-3 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                        Access your account
                    </p>

                    <form className="mt-6">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Log In
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                        Don’t have an account?{" "}
                        <a href="#" className="text-blue-500 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
