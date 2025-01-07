import React, { useState, useEffect } from "react";
import axios from "axios";

const WelcomePage = () => {
    const [groups, setGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredGroups, setFilteredGroups] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/getGroups")
            .then((response) => setGroups(response.data))
            .catch((error) => console.error("Error fetching groups:", error));
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredGroups([]);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = groups.filter(
                (group) =>
                    group.name.toLowerCase().includes(query) ||
                    group.description.toLowerCase().includes(query) ||
                    group.department.toLowerCase().includes(query)
            );
            setFilteredGroups(filtered);
        }
    }, [searchQuery, groups]);

    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white px-4">
            <div className="w-full max-w-5xl text-center ">
                <h1 className="text-5xl md:text-7xl font-extrabold">
                    Welcome to <span className="bg-gradient-to-br from-purple-400 to-blue-400 text-transparent bg-clip-text">StudyConnect</span>
                </h1>

                <p className="text-lg md:text-2xl mt-4">
                    Discover study groups, collaborate, and excel together.
                </p>
                <div className="mt-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for study groups..."
                        className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none shadow-md"
                    />
                </div>
            </div>

            <div className="mt-8 w-full max-w-3xl">
                {searchQuery.trim() === "" ? (
                    <p className="text-gray-300 mt-8 text-center">
                        Start typing to search for groups.
                    </p>
                ) : filteredGroups.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filteredGroups.map((group) => (
                            <div
                                key={group.id}
                                className="bg-white text-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
                            >
                                <img src={group.image} alt="" />
                                <h2 className="font-bold text-lg">
                                    {highlightText(group.name, searchQuery)}
                                </h2>
                                <p className="text-gray-600">
                                    {highlightText(group.description, searchQuery)}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {highlightText(group.department, searchQuery)}
                                </p>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
                                >
                                    Join Now
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-300 mt-8 text-center">
                        No groups match your search query.
                    </p>
                )}
            </div>
        </div>
    );
};

// Function to highlight matching text
const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
        regex.test(part) ? (
            <span key={index} className="bg-yellow-300 text-black">
                {part}
            </span>
        ) : (
            part
        )
    );
};

export default WelcomePage;
