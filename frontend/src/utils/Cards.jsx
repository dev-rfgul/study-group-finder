import React from 'react'

const GroupCard = ({ notJoinedGroups, searchQuery, handleJoinGroup }) => {

    

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
    return (
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
                                    {group.users.length} {group.users.length <= 1 ? "Member" : "members"}
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
    );
};

export default GroupCard;


