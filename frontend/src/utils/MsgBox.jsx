import React from "react";

const MsgBox = ({ activeGroup, messages, newMessage, setNewMessage, handleSendMessage, handleRemoveGroup }) => {
    return (
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
                    type="submit"
                    onClick={handleRemoveGroup}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Remove from Group
                </button>
            </div>
            <div className="mb-4 h-60 overflow-y-scroll p-4 border border-gray-200 rounded-lg ">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-4">
                        <strong className="text-blue-600">{msg.user}:</strong>
                        <p className="text-gray-100">{msg.text}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-4 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MsgBox;
