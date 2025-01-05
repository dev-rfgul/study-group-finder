import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        department: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, department, password, confirmPassword } = userDetails;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        axios
            .put(`http://localhost:3001/updateUserByID/${id}`, { name, email, department })
            .then((result) => {
                console.log(result);
                navigate('/admin/user');
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/getUserByID/${id}`)
            .then((response) => {
                const { name, email, department } = response.data;
                setUserDetails({ name, email, department, password: '', confirmPassword: '' });
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, [id]);

    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">
                    Update Profile
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    Update your details to keep your profile up to date.
                </p>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="department" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            Department
                        </label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={userDetails.department}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your department"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter a new password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userDetails.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Confirm your new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:ring-4 focus:ring-blue-400"
                    >
                        Update Profile
                    </button>
                </form>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
                    Want to cancel?{' '}
                    <Link to="/admin/user" className="text-red-500 dark:text-red-400 font-semibold hover:underline">
                        Go back
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UpdateUser;
