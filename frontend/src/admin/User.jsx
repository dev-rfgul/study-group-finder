import React, { useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([
        { name: "fahad", email: "raofahadgul785@gmail.com", age: 20 },
        { name: "fahad2", email: "fahad2@example.com", age: 21 },
        { name: "fahad3", email: "fahad3@example.com", age: 22 },
        { name: "fahad4", email: "fahad4@example.com", age: 23 },
    ]);

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
                                    Email
                                </th>
                                <th className="py-3 px-4 text-left font-medium uppercase tracking-wider">
                                    Age
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
                                        {user.email}
                                    </td>
                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                                        {user.age}
                                    </td>
                                    <td className="py-3 px-4">
                                        <Link to={"/admin/user/edit-user"} className="bg-green-400 px-4 py-2 rounded text-white">
                                            Edit User
                                        </Link>
                                        <button className="bg-red-500 text-white py-1 px-3 rounded-md ml-2 hover:bg-red-600 dark:hover:bg-red-400">
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
