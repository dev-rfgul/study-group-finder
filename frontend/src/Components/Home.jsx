import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const location = useLocation();
    const { user } = location.state || {}; // Retrieve user from location state

    const [groups, setGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeGroup, setActiveGroup] = useState(null); // State for the active group
    const [messages, setMessages] = useState([]); // State for chatbox messages

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

    // Separate groups into "joined" and "not joined"
    const joinedGroups = filteredGroups.filter((group) =>
        user?.joinedGroups?.includes(group._id)
    );
    const notJoinedGroups = filteredGroups.filter(
        (group) => !user?.joinedGroups?.includes(group._id)
    );

    // Handle joining a group
    const handleJoinGroup = async (groupId) => {
        if (user?.joinedGroups?.includes(groupId)) {
            alert("You have already joined this group!");
            return; // Prevent further API calls
        }

        try {
            const response = await axios.post("http://localhost:3001/joinGroup", {
                userId: user?.id,
                groupId,
            });

            if (response.data.message) {
                alert(response.data.message);
                // Update frontend to reflect the joined group
                setGroups((prevGroups) =>
                    prevGroups.map((group) =>
                        group._id === groupId
                            ? { ...group, isJoined: true } // Optional UI state
                            : group
                    )
                );
            } else {
                alert("Failed to join the group.");
            }
        } catch (error) {
            console.error("Error joining the group:", error);
            alert("An error occurred while trying to join the group.");
        }
    };

    // Highlight the text based on the search query
    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="bg-yellow-300 font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    // Handle chatbox functionality
    const handleGroupClick = (group) => {
        setActiveGroup(group); // Set the selected group as active
        setMessages([
            { user: "John", text: "Hello, everyone!" },
            { user: "Sara", text: "Hi! How's it going?" },
        ]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex">
            {/* Sidebar for Joined Groups */}
            <div className="w-1/4 bg-white p-6 rounded-lg shadow-xl mr-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Joined Groups</h2>
                <div className="space-y-4">
                    {joinedGroups.length > 0 ? (
                        joinedGroups.map((group) => (
                            <div
                                key={group._id}
                                className="group bg-gray-200 p-4 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 transform hover:scale-105"
                                onClick={() => handleGroupClick(group)}
                            >
                                {group.name}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">You have not joined any groups yet.</p>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full">
                <h1 className="text-5xl text-white font-extrabold mb-12 text-center">
                    Welcome Back {user?.name || "User"}
                </h1>

                {/* Search Field */}
                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search by department or group name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                </div>

                {/* Chatbox Section */}
                {activeGroup ? (
                    <div
                        className="bg-white p-6 rounded-lg shadow-xl relative"
                        style={{
                            backgroundImage: `url(${activeGroup.image || "https://via.placeholder.com/150"})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundBlendMode: "overlay",
                            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for better contrast
                        }}
                    >
                        <h2 className="text-2xl font-semibold text-white mb-4">{activeGroup.name} Chat</h2>
                        {/* Display total members */}
                        <p className="text-white mb-4">{activeGroup.users.length} Members</p>

                        <div className="mb-4 h-60 overflow-y-scroll p-4 border border-gray-200 rounded-lg ">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-4">
                                    <strong className="text-blue-600">{msg.user}:</strong>
                                    <p className="text-gray-100">{msg.text}</p>
                                </div>
                            ))}
                        </div>

                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                        />
                    </div>


                ) : (
                    <div className="text-center text-white">
                        <p>Select a group to start chatting!</p>
                    </div>
                )}

                {/* Available Groups Section */}
                <div className="mt-12">
                    <h2 className="text-3xl text-white font-bold mb-6">Available Groups</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {notJoinedGroups.length > 0 ? (
                            notJoinedGroups.map((group) => (
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
                                        <strong className="text-sm text-gray-600">
                                        {group.users.length}    {group.users.length<=1?"Member":"members"}
                                            
                                        </strong>
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
                                No groups available to join at the moment.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
