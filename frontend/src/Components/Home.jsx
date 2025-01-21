
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import MsgBox from "../utils/MsgBox";
import GroupCard from "../utils/Cards";
import LoadingScreen from "../utils/Loading";

const Home = () => {
    const location = useLocation();
    const { user } = location.state || {}; // Retrieve user from location state
    console.log(user);

    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState()
    const [searchQuery, setSearchQuery] = useState("");
    const [activeGroup, setActiveGroup] = useState(null); // State for the active group
    const [messages, setMessages] = useState([]); // State for chatbox messages
    const [newMessage, setNewMessage] = useState(""); // State for the message input field
    const [userID, setUserID] = useState();
    const [groupID, setGroupID] = useState();
    const [isLoading, setIsLoading] = useState(true); // Loading state
    // console.log(userID)
    // Fetch groups from the backend

    useEffect(() => {
        if (user && user.id) {
            // Save the user ID in localStorage
            localStorage.setItem("userID", JSON.stringify(user.id));

            setUserID(user.id); // Update state
        }
    },);

    useEffect(() => {
        if (!userID) return; // If no userID is provided, do nothing

        const fetchUserByID = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getUserByID/${userID}`);
                // console.log(response.data)
                setUsers(response.data); // Set the user data in state
                setError(null); // Clear any previous errors
            } catch (err) {
                setError("Error fetching user data.");
                setUsers(null); // Clear user data on                                       
            }
        };

        fetchUserByID();
    }, [userID, users]);

    useEffect(() => {
        setIsLoading(true); // Set loading to true when data fetch starts
        axios
            .get("http://localhost:3001/getGroups")
            .then((result) => {
                setGroups(result.data);
                setIsLoading(false); // Set loading to false after data is fetched
                if (result.status === 200) {
                    // Assuming you have a way to fetch user details (like a user list or API call)
                    setMessages(
                        result.data.messages.map((msg) => ({
                            user: msg.userID, // You may want to replace this with actual user info if available
                            text: msg.message,
                            createdAt: msg.createdAt,
                        }))
                    );
                } else {
                    console.log("Failed to fetch messages for this group.");
                }
            })
            .catch((error) => {
                console.error("Error fetching groups:", error);
                setIsLoading(false); // Handle error by stopping the loader
            });
    }, []);


    // console.log(JSON.stringify(groups[0]))
    // console.log((groups[0]))
    // Filter groups based on search query
    const filteredGroups = groups.filter(
        (group) =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Separate groups into "joined" and "not joined"
    const joinedGroups = filteredGroups.filter((group) =>
        users?.joinedGroups?.includes(group._id)
    );
    const notJoinedGroups = filteredGroups.filter(
        (group) => !users?.joinedGroups?.includes(group._id)
    );

    // Handle joining a group
    const handleJoinGroup = async (groupId) => {
        setIsLoading(true)
        if (users?.joinedGroups?.includes(groupId)) {
            // alert("You have already joined this group!");
            setIsLoading(false)
            return; // Prevent further API calls
        }

        try {
            setIsLoading(true)
            const response = await axios.post("http://localhost:3001/joinGroup", {
                userId: user?.id,
                groupId,
            });

            if (response.data.message) {
                // alert(response.data.message);
                setIsLoading(false)
                // Update frontend to reflect the joined group
                setGroups((prevGroups) =>
                    prevGroups.map((group) =>
                        group._id === groupId
                            ? { ...group, isJoined: true } // Optional UI state
                            : group
                    )
                );
            } else {
                // alert("Failed to join the group.");
            }
        } catch (error) {
            console.error("Error joining the group:", error);
            // alert("An error occurred while trying to join the group.");

        }
    };

    const handleGroupClick = async (group) => {
        setActiveGroup(group); // Set the selected group as active
        const groupID = group._id; // Extract group ID from the group object
        setGroupID(groupID); // Update groupID state
        try {
            // Fetch messages for the selected group
            const response = await axios.get(`http://localhost:3001/getGroupByID/${groupID}`);

            if (response.status === 200) {
                // For each message, fetch the user name using the userID
                const messagesWithUsernames = await Promise.all(response.data.messages.map(async (msg) => {
                    try {
                        // Fetch the user by their ID
                        const userResponse = await axios.get(`http://localhost:3001/getUserByID/${msg.userID}`);

                        if (userResponse.status === 200) {
                            return {
                                user: userResponse.data.name, // Set the user's name here
                                text: msg.message,
                                createdAt: msg.createdAt,
                            };
                        } else {
                            console.log("Failed to fetch user for message.");
                            return { user: "Unknown", text: msg.message, createdAt: msg.createdAt };
                        }
                    } catch (userError) {
                        console.error("Error fetching user:", userError);
                        return { user: "Unknown", text: msg.message, createdAt: msg.createdAt };
                    }
                }));

                // Update the messages state with the user names
                setMessages(messagesWithUsernames);
            } else {
                console.log("Failed to fetch messages for this group.");
            }
        } catch (error) {
            console.error("Error fetching group messages:", error);
            alert("An error occurred while trying to fetch messages.");
        }
    };

    // console.log(groupID)

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
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { user: user.name, text: newMessage },
                ]);
                setNewMessage(""); // Clear the input field
            } else {
                // alert("Failed to send the message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);

            if (error.response?.data?.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                // alert("An error occurred while trying to send the message.");
            }
        }
    };

    const handleRemoveGroup = async (e) => {
        e.preventDefault();

        if (!activeGroup) {
            // alert("Please select a group to remove.");

            return;
        }

        try {

            const url = `http://localhost:3001/removeGroup/${activeGroup._id}/${userID}`;
            setIsLoading(true)
            console.log(url);
            const response = await axios.post(url);

            if (response.status === 200) {
                // alert(response.data.message || "Group removed successfully!");
                // Update groups state
                setGroups((prevGroups) =>
                    prevGroups.map((group) =>
                        group._id === activeGroup._id ? { ...group, isJoined: false } : group
                    )
                );

                // Update user state if it exists
                if (user) {
                    setUsers((prevUser) => ({
                        ...prevUser,
                        joinedGroups: prevUser.joinedGroups.filter(
                            (id) => id !== activeGroup._id
                        ),
                    }));
                }

                // Clear active group and messages
                setActiveGroup(null);
                setMessages([]);
                setIsLoading(false)
            } else {
                // alert("Failed to remove the group.");
            }
        } catch (error) {
            console.error("Error removing group:", error);
            alert(
                error.response?.data?.message || "An error occurred while removing the group."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex">
            {isLoading && <LoadingScreen />} {/* Show loader while data is loading */}

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
                <h1 className="text-5xl md:text-5xl text-center font-extrabold bg-gradient-to-br from-purple-400 to-blue-400 text-transparent bg-clip-text">
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
                    <MsgBox
                        activeGroup={activeGroup}
                        messages={messages}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handleSendMessage={handleSendMessage}
                        handleRemoveGroup={handleRemoveGroup}
                    />
                ) : (
                    <div className="text-center text-white">
                        <p>Select a group to start chatting!</p>
                    </div>
                )}

                {/* Available Groups Section */}
                <GroupCard
                    notJoinedGroups={notJoinedGroups}
                    searchQuery={searchQuery}
                    handleJoinGroup={handleJoinGroup}
                />
            </div>
        </div>
    );
};

export default Home;
