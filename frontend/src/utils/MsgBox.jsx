// import React from "react";

// const MsgBox = ({ activeGroup, messages, newMessage, setNewMessage, handleSendMessage, handleRemoveGroup }) => {
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


//     return (
//         <div
//             className="bg-white p-6 rounded-lg shadow-2xl relative overflow-hidden"
//             style={{
//                 backgroundImage: `url(${activeGroup.image || "https://via.placeholder.com/150"})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundBlendMode: "overlay",
//                 backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for better contrast
//             }}
//         >
//             <h2 className="text-3xl font-semibold text-white mb-4">{activeGroup.name} Chat</h2>
//             {/* Display total members */}
//             <p className="text-white mb-4 text-lg">{activeGroup.users.length} Members</p>
//             <div className="flex items-center justify-between mb-6">
//                 <button
//                     type="submit"
//                     onClick={handleRemoveGroup}
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline"
//                 >
//                     Remove from Group
//                 </button>
//             </div>
//             <div className="mb-4 h-60 overflow-y-scroll p-4 border border-gray-300 rounded-lg bg-gray-800 bg-opacity-70 shadow-inner">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="mb-4">
//                         <strong className="text-blue-500 font-medium">{msg.user}:</strong>
//                         <p className="text-gray-300">{msg.text}</p>
//                         <p className="text-gray-600">{formatDate(msg.createdAt)}</p>
//                     </div>
//                 ))}
//             </div>

//             <div className="flex items-center mt-6">
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 text-lg"
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="ml-4 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default MsgBox;

import React from "react";

const MsgBox = ({ activeGroup, messages, newMessage, setNewMessage, handleSendMessage, handleRemoveGroup }) => {
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
