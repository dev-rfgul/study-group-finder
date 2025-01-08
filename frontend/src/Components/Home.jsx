// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// // Helper function to highlight matched text
// const highlightText = (text, query) => {
//     if (!query) return text;

//     const regex = new RegExp(`(${query})`, "gi");
//     return text.split(regex).map((part, index) =>
//         part.toLowerCase() === query.toLowerCase() ? (
//             <span key={index} className="bg-purple-300">{part}</span>
//         ) : (
//             part
//         )
//     );
// };

// const Home = () => {
//     const location = useLocation();
//     const { user } = location.state || {};
//     console.log(user);

//     const [users, setUsers] = useState([]);
//     const [Groups, setGroups] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         axios
//             .get('http://localhost:3001/getGroups')
//             .then(result => setGroups(result.data))
//             .catch(error => console.log(error));
//     }, []);
//     // console.log(Groups[0]._id)
//     useEffect(() => {
//         axios.get('http://localhost:3001/getUsers')
//             .then(result => setUsers(result.data))
//             .catch(error => console.log(error))
//     }, []);

//     // Filter Groups based on search query
//     const filteredGroups = Groups.filter(group =>
//         group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         group.department.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleJoinGroup = async (groupId) => {
//         try {
//             const response = await axios.post('http://localhost:3001/joinGroup', {
//                 userId: user._id,  // Assuming user object has _id field
//                 groupId: groupId
//             });
//             console.log(response)

//             if (response.data.success) {
//                 alert('Successfully joined the group!');
//             } else {
//                 alert('Failed to join the group.');
//             }
//         } catch (error) {
//             console.error('Error joining the group:', error);
//             alert('An error occurred while trying to join the group.');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
//             <div className="text-center mb-12">
//                 <h1 className="text-5xl text-white md:text-5xl font-extrabold">
//                     <span className="bg-gradient-to-br from-purple-400 to-blue-400 text-transparent bg-clip-text">Welcome Back </span>MR {user.name}
//                 </h1>
//                 <h1 className="text-5xl md:text-7xl font-extrabold text-white">
//                     Find Your <span className="bg-gradient-to-br from-purple-400 to-blue-400 text-transparent bg-clip-text">Study Group</span>
//                 </h1>
//                 <p className="text-gray-200 mt-4 text-2xl ">
//                     Discover study groups for different Groups and enhance your learning.
//                 </p>
//             </div>

//             {/* Search Field */}
//             <div className="max-w-md mx-auto mb-8">
//                 <input
//                     type="text"
//                     placeholder="Search by department or gr oup name..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             {/* Display Filtered Groups */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                 {filteredGroups.length > 0 ? (
//                     filteredGroups.map(group => (
//                         <Link
//                             key={group.id}

//                             className="group relative block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300 transform hover:translate-y-2"
//                         >
//                             <img
//                                 src={group.image}
//                                 alt={group.name}
//                                 className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
//                             />
//                             <div className="p-6">
//                                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">
//                                     {highlightText(group.name, searchQuery)}
//                                 </h2>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                                     {highlightText(group.description, searchQuery)}
//                                 </p>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                                     {highlightText(group.department, searchQuery)}
//                                 </p>


//                                 <button
//                                     type="button"
//                                     onClick={() => handleJoinGroup(group._id)} // Trigger join group function
//                                     className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
//                                 >
//                                     Join Now
//                                 </button>
//                             </div>
//                             <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25 group-hover:opacity-0 transition-opacity duration-300"></div>
//                         </Link>

//                     ))
//                 ) : (
//                     <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
//                         No study groups available at the moment.
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const GroupManagement = () => {
    const location = useLocation();
    const { user } = location.state || {}; // Retrieve user from location state

    const [groups, setGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch groups from the backend
    useEffect(() => {
        axios
            .get("http://localhost:3001/getGroups")
            .then((result) => setGroups(result.data))
            .catch((error) => console.error("Error fetching groups:", error));
    }, []);

    // Filter groups based on search query
    const filteredGroups = groups.filter(
        (group) =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle joining a group
    const handleJoinGroup = async (groupId) => {
        try {
            const response = await axios.post("http://localhost:3001/joinGroup", {
                userId: user?.id, // Ensure user object has _id field
                groupId,
            });

            if (response.data.message) {
                alert(response.data.message);
            } else {
                alert("Failed to join the group.");
            }
        } catch (error) {
            console.error("Error joining the group:", error);
            alert("An error occurred while trying to join the group.");
        }
    };

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="bg-yellow-300">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
            {/* Welcome Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl text-white font-extrabold">
                    <span className="bg-gradient-to-br from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        Welcome Back
                    </span>{" "}
                    MR {user?.name || "User"}
                </h1>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white">
                    Find Your{" "}
                    <span className="bg-gradient-to-br from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        Study Group
                    </span>
                </h1>
                <p className="text-gray-200 mt-4 text-2xl">
                    Discover study groups for different departments and enhance your
                    learning.
                </p>
            </div>

            {/* Search Field */}
            <div className="max-w-md mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search by department or group name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Display Filtered Groups */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                        <div
                            key={group._id}
                            className="group relative block bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300 transform"
                        >
                            <img
                                src={group.image || "https://via.placeholder.com/150"}
                                alt={group.name}
                                className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">
                                    {highlightText(group.name, searchQuery)}
                                </h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    {highlightText(group.description || "No description available.", searchQuery)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {highlightText(group.department, searchQuery)}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => handleJoinGroup(group._id)}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
                                >
                                    Join Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 col-span-full text-center">
                        No study groups available at the moment.
                    </p>
                )}
            </div>
        </div>
    );
};

export default GroupManagement;
