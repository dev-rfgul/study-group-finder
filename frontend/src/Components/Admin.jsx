import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Admin = () => {
    return (
        <>
            <div className="text-3xl font-bold text-center mb-8">Welcome to the Admin Page</div>
            
            {/* Flex container for the cards */}
            <div className="flex justify-center gap-8">
                {/* Card for Users */}
                <Link
                    to="/admin/user"
                    className="w-64 p-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <div className="text-center font-bold text-2xl">Users</div>
                    <div className="mt-4 text-center text-lg">Manage and view users</div>
                </Link>

                {/* Card for Groups */}
                <Link
                    to="/admin/groups"
                    className="w-64 p-6 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <div className="text-center font-bold text-2xl">Groups</div>
                    <div className="mt-4 text-center text-lg">Manage and view groups</div>
                </Link>
            </div>
        </>
    )
}

export default Admin
