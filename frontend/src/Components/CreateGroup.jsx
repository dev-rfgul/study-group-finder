import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();



    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('')

    const submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createGroup", { name, department, description, image })
        // console.log(name, department, description, image)
            .then(result => {
                console.log('Response:', result.data); // Log response data
                navigate('/admin/groups'); // Navigate after successful post request
            })
            .catch(error => {
                console.error('Error:', error); // Log error if there is one
            });
    }

    return (
        <>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">
                        Create a Group
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                        Create group to get started. It’s free and easy!
                    </p>

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                            >
                                Group  Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter group name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="text"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                            >
                                Group Description
                            </label>
                            <input
                                type="text"
                                id="department"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter group Department"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="text"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                            >
                                Group category
                            </label>
                            <input
                                type="text"
                                id="department"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter group Department"
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1"
                            >
                                Image
                            </label>
                            <input
                                type="text"
                                id="image"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter Image URL"
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>



                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Create Group
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Signup;
