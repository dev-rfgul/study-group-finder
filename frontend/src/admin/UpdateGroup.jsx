import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UpdateGroup = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [groupDetails, setGroupDetails] = useState({
        name: '',
        description: '',
        department: '',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, description } = groupDetails;

        axios
            .put(`http://localhost:3001/updateGroupByID/${id}`, { name, description, image, department })
            .then((result) => {
                console.log(result);
                navigate('/admin/group');
            })
            .catch((error) => {
                console.error('Error updating group:', error);
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/getGroupByID/${id}`)
            .then((response) => {
                const { name, description, image, department } = response.data;
                setGroupDetails({ name, description ,image,department});
            })
            .catch((error) => {
                console.error('Error fetching group:', error);
            });
    }, [id]);

    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">
                    Update Group
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    Update group details to keep them current.
                </p>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            Group Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={groupDetails.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter group name"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                            Group Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={groupDetails.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter group description"
                            rows="4"
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
                            name='department'
                            value={groupDetails.department}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter group Department"
                            onChange={handleChange}
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
                            value={groupDetails.image}
                            name='image'
                            id="image"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter Image URL"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:ring-4 focus:ring-blue-400"
                    >
                        Update Group
                    </button>
                </form>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
                    Want to cancel?{' '}
                    <Link to="/admin/group" className="text-red-500 dark:text-red-400 font-semibold hover:underline">
                        Go back
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UpdateGroup;
