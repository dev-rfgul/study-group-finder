import React, { useState } from "react";

const Login = () => {

    return (
        <div >
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white px-4">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
                            Welcome Back
                        </h2>
                    
                    </div>

                    <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
                        Log in to your account
                    </p>

                    <form className="mt-6 space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Log In
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
                        Don’t have an account?{" "}
                        <a href="#" className="text-blue-200 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
