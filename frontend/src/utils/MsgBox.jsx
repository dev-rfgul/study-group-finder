import React, { useState, useEffect } from "react";


const MsgBox = ({ activeGroup, messages, newMessage, setNewMessage, handleSendMessage, handleRemoveGroup, groupID }) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);

        const options = {
            weekday: 'short', // E.g., Mon, Tue, etc.
            year: 'numeric',
            month: 'short', // E.g., Jan, Feb, etc.
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Use AM/PM format
        };

        return date.toLocaleString('en-US', options);
    };
    const getGroupMsgs = async (groupId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/${groupId}/messages`);
            if (!res.ok) {
                throw new Error("Error while fetching messages");
            }
            const data = await res.json();
            return data.messages;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    const [fetchMessages, setFetchMessages] = useState([]);

    useEffect(() => {
        if (!groupID) return;

        const fetchData = async () => {
            const messages = await getGroupMsgs(groupID);
            setFetchMessages(messages);
        };

        fetchData(); // Fetch messages initially

        const interval = setInterval(fetchData, 1000); // Fetch messages every 3 seconds
        console.log("Fetching messages every 1 second", fetchMessages);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [groupID, activeGroup]); // Refetch when group changes
    return (
        <div
            className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
            style={{
                backgroundImage: `url(${activeGroup.image || "https://via.placeholder.com/150"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker overlay for better contrast
            }}
        >
            <h2 className="text-4xl font-bold text-white mb-4">{activeGroup.name} Chat</h2>
            <p className="text-white mb-6 text-lg font-semibold">{activeGroup.users.length} Members</p>
            <p className="text-white mb-6 text-lg font-semibold">{activeGroup.description} </p>
            <p className="text-red-500 mb-6 text-lg font-semibold">plz refresh the page after sending msg </p>
            
            <div className="flex items-center justify-between mb-6">
                <button
                    type="submit"
                    onClick={handleRemoveGroup}
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Remove from Group
                </button>
            </div>
            <div className="mb-6 h-72 overflow-y-scroll p-4 border border-gray-300 rounded-lg bg-gray-800 bg-opacity-80 shadow-xl">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-6">
                        <strong className="text-blue-400 font-medium">{msg.user}:</strong>
                        <p className="text-gray-200">{msg.text}</p>
                        <p className="text-gray-500 text-sm">{formatDate(msg.createdAt)}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center mt-8">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 text-lg shadow-md"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-4 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MsgBox;
