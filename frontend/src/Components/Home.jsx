
// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import axios from "axios";

// const Home = () => {
//     const location = useLocation();
//     const { user } = location.state || {}; // Retrieve user from location state

//     const [groups, setGroups] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [activeGroup, setActiveGroup] = useState(null); // State for the active group
//     const [messages, setMessages] = useState([]); // State for chatbox messages
//     const [newMessage, setNewMessage] = useState(""); // State for the message input field
//     const [userID, setUserID] = useState()
//     const [groupID, setGroupID] = useState()
//     const [User, setUser] = useState();

//     // Fetch groups from the backend
//     useEffect(() => {
//         axios
//             .get("http://localhost:3001/getGroups")
//             .then((result) => setGroups(result.data))
//             .catch((error) => console.error("Error fetching groups:", error));
//     }, []);

//     // Filter groups based on search query
//     const filteredGroups = groups.filter(
//         (group) =>
//             group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             group.department.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Separate groups into "joined" and "not joined"
//     const joinedGroups = filteredGroups.filter((group) =>
//         user?.joinedGroups?.includes(group._id)
//     );
//     const notJoinedGroups = filteredGroups.filter(
//         (group) => !user?.joinedGroups?.includes(group._id)
//     );

//     // Handle joining a group
//     const handleJoinGroup = async (groupId) => {
//         if (user?.joinedGroups?.includes(groupId)) {
//             alert("You have already joined this group!");
//             return; // Prevent further API calls
//         }

//         try {
//             const response = await axios.post("http://localhost:3001/joinGroup", {
//                 userId: user?.id,
//                 groupId,
//             });

//             if (response.data.message) {
//                 alert(response.data.message);
//                 // Update frontend to reflect the joined group
//                 setGroups((prevGroups) =>
//                     prevGroups.map((group) =>
//                         group._id === groupId
//                             ? { ...group, isJoined: true } // Optional UI state
//                             : group
//                     )
//                 );
//             } else {
//                 alert("Failed to join the group.");
//             }
//         } catch (error) {
//             console.error("Error joining the group:", error);
//             alert("An error occurred while trying to join the group.");
//         }
//     };

//     // Highlight the text based on the search query
//     const highlightText = (text, query) => {
//         if (!query) return text;
//         const parts = text.split(new RegExp(`(${query})`, "gi"));
//         return parts.map((part, index) =>
//             part.toLowerCase() === query.toLowerCase() ? (
//                 <span key={index} className="bg-yellow-300 font-semibold">
//                     {part}
//                 </span>
//             ) : (
//                 part
//             )
//         );
//     };

//     const handleGroupClick = async (group) => {
//         setActiveGroup(group); // Set the selected group as active


//         // Fetch messages whenever the active group changes
//         useEffect(() => {
//             if (activeGroup) {
//                 const fetchMessages = async () => {
//                     try {
//                         const response = await axios.get(`http://localhost:3001/groups/${activeGroup._id}/messages`);
//                         if (response.status === 200) {
//                             setMessages(
//                                 response.data.messages.map((msg) => ({
//                                     user: msg.userID.name,
//                                     text: msg.message,
//                                 }))
//                             );
//                         } else {
//                             alert("Failed to fetch messages for this group.");
//                         }
//                     } catch (error) {
//                         console.error("Error fetching group messages:", error);
//                         alert("An error occurred while trying to fetch messages.");
//                     }
//                 };

//                 fetchMessages();
//             }
//         }, [activeGroup]);
//     };

//     // Handle sending a message
//     const handleSendMessage = async () => {
//         if (!newMessage.trim()) return; // Prevent sending empty messages

//         const url = "http://localhost:3001/sendMessage"; // Backend endpoint

//         try {
//             const response = await axios.post(url, {
//                 groupId: activeGroup._id, // Match field names with the backend schema
//                 userId: user?.id,
//                 messageContent: newMessage, // Ensure this matches the backend expected key
//             });

//             console.log("Response:", response.data); // Log the response

//             if (response.status === 201) {
//                 // Update the messages state to show the new message
//                 setMessages((prevMessages) => [
//                     ...prevMessages,
//                     { user: user.name, text: newMessage },
//                 ]);
//                 setNewMessage(""); // Clear the input field
//             } else {
//                 alert("Failed to send the message.");
//             }
//         } catch (error) {
//             console.error("Error sending message:", error);

//             if (error.response?.data?.error) {
//                 alert(`Error: ${error.response.data.error}`);
//             } else {
//                 alert("An error occurred while trying to send the message.");
//             }
//         }
//     };

//     //handle group leave
// // 
//     const handleRemoveGroup = async (e) => {
//         e.preventDefault();

//         if (!activeGroup) {
//             alert("Please select a group to remove.");
//             return;
//         }

//         try {
//             const response = await axios.delete("http://localhost:3001/removeGroup", {
//                 data: {
//                     groupId: activeGroup._id,
//                     userId: user?.id,
//                 },
//             });

//             if (response.status === 200) {
//                 alert(response.data.message || "Group removed successfully!");

//                 // Update groups state
//                 setGroups((prevGroups) =>
//                     prevGroups.map((group) =>
//                         group._id === activeGroup._id ? { ...group, isJoined: false } : group
//                     )
//                 );

//                 // Update user state if it exists
//                 if (user) {
//                     setUser((prevUser) => ({
//                         ...prevUser,
//                         joinedGroups: prevUser.joinedGroups.filter(
//                             (id) => id !== activeGroup._id
//                         ),
//                     }));
//                 }

//                 // Clear active group and messages
//                 setActiveGroup(null);
//                 setMessages([]);
//             } else {
//                 alert("Failed to remove the group.");
//             }
//         } catch (error) {
//             console.error("Error removing group:", error);
//             alert(
//                 error.response?.data?.message || "An error occurred while removing the group."
//             );
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex">
//             {/* Sidebar for Joined Groups */}
//             <div className="w-1/4 bg-white p-6 rounded-lg shadow-xl mr-8">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">Joined Groups</h2>
//                 <div className="space-y-4">
//                     {joinedGroups.length > 0 ? (
//                         joinedGroups.map((group) => (
//                             <div
//                                 key={group._id}
//                                 className="group bg-gray-200 p-4 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 transform hover:scale-105"
//                                 onClick={() => handleGroupClick(group)}
//                             >
//                                 {group.name}
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-600">You have not joined any groups yet.</p>
//                     )}
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="w-full">
//                 <h1 className="text-5xl text-white font-extrabold mb-12 text-center">
//                     Welcome Back {user?.name || "User"}
//                 </h1>

//                 {/* Search Field */}
//                 <div className="max-w-md mx-auto mb-8">
//                     <input
//                         type="text"
//                         placeholder="Search by department or group name..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                     />
//                 </div>

//                 {/* Chatbox Section */}
//                 {activeGroup ? (
//                     <div
//                         className="bg-white p-6 rounded-lg shadow-xl relative"
//                         style={{
//                             backgroundImage: `url(${activeGroup.image || "https://via.placeholder.com/150"})`,
//                             backgroundSize: "cover",
//                             backgroundPosition: "center",
//                             backgroundBlendMode: "overlay",
//                             backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for better contrast
//                         }}
//                     >
//                         <h2 className="text-2xl font-semibold text-white mb-4">{activeGroup.name} Chat</h2>
//                         {/* Display total members */}
//                         <p className="text-white mb-4">{activeGroup.users.length} Members</p>
//                         <div className="flex items-center justify-between">
//                             <button
//                                 type="submit"
//                                 onClick={handleRemoveGroup}
//                                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                             >
//                                 Remove from Group
//                             </button>
//                         </div>
//                         <div className="mb-4 h-60 overflow-y-scroll p-4 border border-gray-200 rounded-lg ">
//                             {messages.map((msg, index) => (
//                                 <div key={index} className="mb-4">
//                                     <strong className="text-blue-600">{msg.user}:</strong>
//                                     <p className="text-gray-100">{msg.text}</p>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="flex items-center">
//                             <input
//                                 type="text"
//                                 placeholder="Type a message..."
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
//                             />
//                             <button
//                                 onClick={handleSendMessage}
//                                 className="ml-4 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
//                             >
//                                 Send
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="text-center text-white">
//                         <p>Select a group to start chatting!</p>
//                     </div>
//                 )}

//                 {/* Available Groups Section */}
//                 <div className="mt-12">
//                     <h2 className="text-3xl text-white font-bold mb-6">Available Groups</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                         {notJoinedGroups.length > 0 ? (
//                             notJoinedGroups.map((group) => (
//                                 <div
//                                     key={group._id}
//                                     className="group relative block bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300 transform"
//                                 >
//                                     <img
//                                         src={group.image || "https://via.placeholder.com/150"}
//                                         alt={group.name}
//                                         className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
//                                     />
//                                     <div className="p-6">
//                                         <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">
//                                             {highlightText(group.name, searchQuery)}
//                                         </h2>
//                                         <p className="text-sm text-gray-600 mb-4">
//                                             {highlightText(group.description || "No description available.", searchQuery)}
//                                         </p>
//                                         <p className="text-sm text-gray-600">
//                                             {highlightText(group.department, searchQuery)}
//                                         </p>
//                                         <strong className="text-sm text-gray-600">
//                                             {group.users.length} {group.users.length <= 1 ? "Member" : "members"}
//                                         </strong>
//                                         <button
//                                             type="button"
//                                             onClick={() => handleJoinGroup(group._id)}
//                                             className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
//                                         >
//                                             Join Now
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-gray-600 col-span-full text-center">
//                                 No groups available to join at the moment.
//                             </p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const location = useLocation();
    const { user } = location.state || {}; // Retrieve user from location state

    const [groups, setGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeGroup, setActiveGroup] = useState(null); // State for the active group
    const [messages, setMessages] = useState([]); // State for chatbox messages
    const [newMessage, setNewMessage] = useState(""); // State for the message input field
    const [userID, setUserID] = useState();
    const [groupID, setGroupID] = useState();
    const [User, setUser] = useState();

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

    const handleGroupClick = async (group) => {
        setActiveGroup(group); // Set the selected group as active

        // Fetch messages whenever the active group changes
        useEffect(() => {
            if (activeGroup) {
                const fetchMessages = async () => {
                    try {
                        const response = await axios.get(`http://localhost:3001/groups/${activeGroup._id}/messages`);
                        if (response.status === 200) {
                            setMessages(
                                response.data.messages.map((msg) => ({
                                    user: msg.userID.name,
                                    text: msg.message,
                                }))
                            );
                            // Save the messages to localStorage
                            localStorage.setItem('messages', JSON.stringify(response.data.messages));
                        } else {
                            alert("Failed to fetch messages for this group.");
                        }
                    } catch (error) {
                        console.error("Error fetching group messages:", error);
                        alert("An error occurred while trying to fetch messages.");
                    }
                };

                fetchMessages();
            }
        }, [activeGroup]);
    };

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return; // Prevent sending empty messages

        const url = "http://localhost:3001/sendMessage"; // Backend endpoint

        try {
            const response = await axios.post(url, {
                groupId: activeGroup._id, // Match field names with the backend schema
                userId: user?.id,
                messageContent: newMessage, // Ensure this matches the backend expected key
            });

            console.log("Response:", response.data); // Log the response

            if (response.status === 201) {
                // Update the messages state to show the new message
                const updatedMessages = [
                    ...messages,
                    { user: user.name, text: newMessage },
                ];
                setMessages(updatedMessages);
                setNewMessage(""); // Clear the input field

                // Save the updated messages to localStorage
                localStorage.setItem('messages', JSON.stringify(updatedMessages));

                msg("Message sent successfully!"); // Show success message
            } else {
                alert("Failed to send the message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);

            if (error.response?.data?.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert("An error occurred while trying to send the message.");
            }
        }
    };

    // Function to show success or error messages
    const msg = (message) => {
        alert(message);  // Alert the message passed to this function
        console.log(message);  // Log the message to the console
    };

    // Handle group leave
    const handleRemoveGroup = async (e) => {
        e.preventDefault();

        if (!activeGroup) {
            alert("Please select a group to remove.");
            return;
        }

        try {
            const response = await axios.delete("http://localhost:3001/removeGroup", {
                data: {
                    groupId: activeGroup._id,
                    userId: user?.id,
                },
            });

            if (response.status === 200) {
                alert(response.data.message || "Group removed successfully!");

                // Update groups state
                setGroups((prevGroups) =>
                    prevGroups.map((group) =>
                        group._id === activeGroup._id ? { ...group, isJoined: false } : group
                    )
                );

                // Update user state if it exists
                if (user) {
                    setUser((prevUser) => ({
                        ...prevUser,
                        joinedGroups: prevUser.joinedGroups.filter(
                            (id) => id !== activeGroup._id
                        ),
                    }));
                }

                // Clear active group and messages
                setActiveGroup(null);
                setMessages([]);
            } else {
                alert("Failed to remove the group.");
            }
        } catch (error) {
            console.error("Error removing group:", error);
            alert(
                error.response?.data?.message || "An error occurred while removing the group."
            );
        }
    };

    // Load messages from localStorage on initial load
    useEffect(() => {
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

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
                            backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for better contrast
                        }}
                    >
                        <h2 className="text-2xl font-semibold text-white mb-4">{activeGroup.name} Chat</h2>
                        {/* Display total members */}
                        <p className="text-white mb-4">{activeGroup.users.length} Members</p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleRemoveGroup}
                                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
                            >
                                Leave Group
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-72 overflow-y-scroll mt-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                                    <strong>{msg.user}: </strong>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="mt-6">
                            <textarea
                                className="w-full p-4 border rounded-lg"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message here..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-blue-600"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-white text-lg">Select a group to start chatting!</p>
                )}
            </div>
        </div>
    );
};

export default Home;
