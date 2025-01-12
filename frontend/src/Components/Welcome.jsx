import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupCard from "../utils/Cards";
import LoginFirst from '../utils/LoginFirst';

const WelcomePage = () => {
    const [groups, setGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false); // Default to false

    const isUserLoggedIn = false; // Replace with actual login check (e.g., checking Auth0 or Redux state)

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

    const handleCardClick = () => {
        if (!isUserLoggedIn) {
            setShowLoginPrompt(true); // Show login prompt if user is not logged in
        }
    };

    const handleJoinGroup = (groupId) => {
        if (!isUserLoggedIn) {
            setShowLoginPrompt(true); // Show login prompt if user is not logged in
        } else {
            console.log("Joining group with ID:", groupId); // Proceed with joining group
        }
    };

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

            <div className="mt-8 w-full max-w-7xl ">
                {searchQuery.trim() === "" ? (
                    <p className="text-gray-300 mt-8 text-center px-4 py-2">
                        Start typing to search for groups.
                    </p>
                ) : (
                    <GroupCard
                        notJoinedGroups={filteredGroups}
                        searchQuery={searchQuery}
                        handleJoinGroup={handleJoinGroup}
                        onClick={handleCardClick} // Pass the click handler to GroupCard
                    />
                )}
            </div>

            {/* Render the LoginFirst popup if the user is not logged in */}
            {showLoginPrompt && <LoginFirst closePopup={() => setShowLoginPrompt(false)} />}
        </div>
    );
};

export default WelcomePage;
