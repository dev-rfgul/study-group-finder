import axios from 'axios'
import { Link, } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/getUsers`)
            .then(result => setUsers(result.data))
            .catch(error => console.log(error))
    }, [])

    const deleteUser = (id) => {
        axios.delete(`${import.meta.env.VITE_BASE_URL}/deleteUserByID/${id}`)
            .then(result => {
                console.log(result)
                window.location.reload()
            })
            .catch(error => console.log(error))


    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white  shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <Link to={"/signup"} className="bg-green-400 px-4 py-2 rounded text-white">
                    Create User
                </Link>

                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    User Management
                </h1>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                    Manage and view your users in an elegant and simple table format.
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="py-3 px-4 text-left font-medium uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="py-3 px-4 text-left font-medium uppercase tracking-wider">
                                    Department
                                </th>
                                <th className="py-3 px-4 text-left font-medium uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="py-3 px-4 text-left font-medium uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={index}
                                    className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                                >
                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                                        {user.name}
                                    </td>
                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                                        {user.department}
                                    </td>
                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                                        {user.email}
                                    </td>

                                    <td className="py-3 px-4">
                                        <Link to={`/admin/user/editUser/${user._id}`} className="bg-green-400 px-4 py-2 rounded text-white">
                                            Edit User
                                        </Link>
                                        <button
                                            onClick={(e) => { deleteUser(user._id) }}
                                            className="bg-red-500 text-white py-1 px-3 rounded-md ml-2 hover:bg-red-600 dark:hover:bg-red-400">
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
