// import React, { useState, useEffect } from "react";


// const MsgBox = ({ activeGroup, messages, newMessage, setNewMessage, handleSendMessage, handleRemoveGroup, groupID }) => {
//     const formatDate = (timestamp) => {
//         const date = new Date(timestamp);

//         const options = {
//             weekday: 'short', // E.g., Mon, Tue, etc.
//             year: 'numeric',
//             month: 'short', // E.g., Jan, Feb, etc.
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true, // Use AM/PM format
//         };

//         return date.toLocaleString('en-US', options);
//     };
//     const getGroupMsgs = async (groupId) => {
//         try {
//             const res = await fetch(`${import.meta.env.VITE_BASE_URL}/${groupId}/messages`);
//             if (!res.ok) {
//                 throw new Error("Error while fetching messages");
//             }
//             const data = await res.json();
//             return data.messages;
//         } catch (error) {
//             console.error(error);
//             return [];
//         }
//     };
//     const [fetchMessages, setFetchMessages] = useState([]);

//     useEffect(() => {
//         if (!groupID) return;

//         const fetchData = async () => {
//             const messages = await getGroupMsgs(groupID);
//             setFetchMessages(messages);
//         };

//         fetchData(); // Fetch messages initially

//         const interval = setInterval(fetchData, 1000); // Fetch messages every 3 seconds
//         console.log("Fetching messages every 1 second", fetchMessages);

//         return () => clearInterval(interval); // Cleanup interval on unmount
//     }, [groupID, activeGroup]); // Refetch when group changes
//     return (
//         <div
//             className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
//             style={{
//                 backgroundImage: `url(${activeGroup.image || "https://via.placeholder.com/150"})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundBlendMode: "overlay",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker overlay for better contrast
//             }}
//         >
//             <h2 className="text-4xl font-bold text-white mb-4">{activeGroup.name} Chat</h2>
//             <p className="text-white mb-6 text-lg font-semibold">{activeGroup.users.length} Members</p>
//             <p className="text-white mb-6 text-lg font-semibold">{activeGroup.description} </p>
//             <div className="flex items-center justify-between mb-6">
//                 <button
//                     type="submit"
//                     onClick={handleRemoveGroup}
//                     className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                     Remove from Group
//                 </button>
//             </div>
//             <div className="mb-6 h-72 overflow-y-scroll p-4 border border-gray-300 rounded-lg bg-gray-800 bg-opacity-80 shadow-xl">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="mb-6">
//                         <strong className="text-blue-400 font-medium">{msg.user}:</strong>
//                         <p className="text-gray-200">{msg.text}</p>
//                         <p className="text-gray-500 text-sm">{formatDate(msg.createdAt)}</p>
//                     </div>
//                 ))}
//             </div>

//             <div className="flex items-center mt-8">
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 text-lg shadow-md"
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="ml-4 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default MsgBox;

import { React, useState, useEffect, useRef } from "react";

const MsgBox = ({ activeGroup, messages, setMessages, newMessage, setNewMessage, handleSendMessage, handleRemoveGroup, groupID }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const lastMessageTimestamp = useRef(null);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return date.toLocaleString('en-US', options);
    };

    // Function to fetch messages with optional since parameter
    const getGroupMsgs = async (groupId, since = null) => {
        try {
            let url = `${import.meta.env.VITE_BASE_URL}/${groupId}/messages`;
            
            // Add timestamp query parameter if we have a last message timestamp
            if (since) {
                url += `?since=${since}`;
            }
            
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error fetching messages: ${res.status}`);
            }
            const data = await res.json();
            return data.messages;
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            throw error;
        }
    };

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Initial fetch of all messages
    useEffect(() => {
        if (!groupID) return;
        
        let isMounted = true;
        
        const fetchAllMessages = async () => {
            if (!isMounted) return;
            
            setIsLoading(true);
            try {
                const fetchedMessages = await getGroupMsgs(groupID);
                if (isMounted) {
                    setMessages(fetchedMessages);
                    
                    // Update the last message timestamp if we have messages
                    if (fetchedMessages.length > 0) {
                        const newestMsg = fetchedMessages.reduce((latest, msg) => {
                            const msgDate = new Date(msg.createdAt).getTime();
                            const latestDate = new Date(latest.createdAt).getTime();
                            return msgDate > latestDate ? msg : latest;
                        }, fetchedMessages[0]);
                        
                        lastMessageTimestamp.current = new Date(newestMsg.createdAt).getTime();
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load messages");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchAllMessages();
        
        return () => {
            isMounted = false;
        };
    }, [groupID, setMessages]);

    // Poll for new messages
    useEffect(() => {
        if (!groupID) return;
        
        let isMounted = true;
        
        const pollForNewMessages = async () => {
            if (!isMounted) return;
            
            try {
                // Only fetch messages newer than our last known message
                const newMessages = await getGroupMsgs(
                    groupID, 
                    lastMessageTimestamp.current ? lastMessageTimestamp.current : null
                );
                
                if (isMounted && newMessages && newMessages.length > 0) {
                    // Update messages by appending new ones
                    setMessages(prevMessages => {
                        // Create a map of existing message IDs for quick lookup
                        const existingMsgIds = new Set(prevMessages.map(msg => msg.id));
                        
                        // Filter out messages we already have
                        const trulyNewMessages = newMessages.filter(msg => !existingMsgIds.has(msg.id));
                        
                        if (trulyNewMessages.length === 0) return prevMessages;
                        
                        // Update the timestamp to the newest message
                        const newestMsg = trulyNewMessages.reduce((latest, msg) => {
                            const msgDate = new Date(msg.createdAt).getTime();
                            const latestDate = new Date(latest.createdAt).getTime();
                            return msgDate > latestDate ? msg : latest;
                        }, trulyNewMessages[0]);
                        
                        lastMessageTimestamp.current = new Date(newestMsg.createdAt).getTime();
                        
                        // Return combined messages sorted by timestamp
                        return [...prevMessages, ...trulyNewMessages].sort((a, b) => 
                            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        );
                    });
                }
            } catch (err) {
                console.error("Error polling for new messages:", err);
                // Don't set error state here to avoid disrupting the UI during polling
            }
        };

        // Poll every 2 seconds
        const interval = setInterval(pollForNewMessages, 2000);
        
        // Important: Poll immediately on mount, don't wait for the first interval
        pollForNewMessages();
        
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [groupID, setMessages]);

    // Scroll to bottom when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle sending a new message
    const handleSend = (e) => {
        e.preventDefault();
        handleSendMessage();
    };

    return (
        <div
            className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
            style={{
                backgroundImage: `url(${activeGroup?.image || "https://via.placeholder.com/150"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <h2 className="text-4xl font-bold text-white mb-4">{activeGroup?.name || "Chat"}</h2>
            <p className="text-white mb-2 text-lg font-semibold">{activeGroup?.users?.length || 0} Members</p>
            <p className="text-white mb-6 text-lg font-semibold">{activeGroup?.description || ""}</p>
            
            <div className="flex items-center justify-between mb-6">
                <button
                    type="button"
                    onClick={handleRemoveGroup}
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Remove from group"
                >
                    Remove from Group
                </button>
            </div>
            
            <div className="mb-6 h-72 overflow-y-scroll p-4 border border-gray-300 rounded-lg bg-gray-800 bg-opacity-80 shadow-xl" 
                 aria-live="polite"
                 role="log">
                {isLoading && messages.length === 0 && (
                    <p className="text-gray-300 italic">Loading messages...</p>
                )}
                
                {error && (
                    <p className="text-red-400 italic">{error}</p>
                )}
                
                {!isLoading && !error && messages.length === 0 && (
                    <p className="text-gray-300 italic">No messages yet. Be the first to send one!</p>
                )}
                
                {messages.map((msg, index) => (
                    <div key={msg.id || index} className="mb-6">
                        <strong className="text-blue-400 font-medium">{msg.user}:</strong>
                        <p className="text-gray-200">{msg.text}</p>
                        <p className="text-gray-500 text-sm">{formatDate(msg.createdAt)}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form 
                className="flex items-center mt-8"
                onSubmit={handleSend}
            >
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 text-lg shadow-md"
                    aria-label="Message input"
                />
                <button
                    type="submit"
                    className="ml-4 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
                    aria-label="Send message"
                    disabled={!newMessage.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default MsgBox;