import React from "react";
import { Link } from "react-router-dom";

const departments = [
    {
        id: "computerscience",
        name: "Computer Science",
        image: "https://via.placeholder.com/150/0000FF/808080?text=Computer+Science",
    },
    {
        id: "mechanicalengineering",
        name: "Mechanical Engineering",
        image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Mechanical",
    },
    {
        id: "biology",
        name: "Biology",
        image: "https://via.placeholder.com/150/00FF00/000000?text=Biology",
    },
    {
        id: "mathematics",
        name: "Mathematics",
        image: "https://via.placeholder.com/150/FFFF00/000000?text=Mathematics",
    },
    {
        id: "physics",
        name: "Physics",
        image: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Physics",
    },
    {
        id: "chemistry",
        name: "Chemistry",
        image: "https://via.placeholder.com/150/00FFFF/000000?text=Chemistry",
    },
];

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Find Your Study Group
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Explore study groups for different departments.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {departments.map((dept) => (
                    <Link
                        key={dept.id}
                        to={`/${dept.id}`}
                        className="block bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={dept.image}
                            alt={dept.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {dept.name}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Join a study group to collaborate and enhance your learning
                                experience.
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
