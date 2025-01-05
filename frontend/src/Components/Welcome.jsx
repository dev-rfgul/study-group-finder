// src/components/WelcomePage.jsx
import React from 'react';

const WelcomePage = () => {
    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-center">
                Welcome to StudyConnect
            </h1>
            <p className="text-lg md:text-2xl text-center mt-4">
                Discover study groups, collaborate, and excel together.
            </p>
            <div className="mt-6 flex flex-col md:flex-row items-center gap-4 w-full md:w-2/3 lg:w-1/2">
                <input
                    type="text"
                    placeholder="Search for study groups..."
                    className="px-4 py-3 rounded-lg w-full text-gray-800 focus:outline-none shadow-md"
                />
                <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-100 transition">
                    Search
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
