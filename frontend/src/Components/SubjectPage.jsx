import React from "react";
import { useParams, Link } from "react-router-dom";

const subjects = {
    computerscience: [
        { name: "Object-Oriented Programming", image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=OOP" },
        { name: "Web Development", image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Web+Dev" },
        { name: "Programming Fundamentals", image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Prog+Fund" },
        { name: "Data Structures", image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Data+Structures" },
    ],
    biology: [
        { name: "Genetics", image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Genetics" },
        { name: "Cell Biology", image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Cell+Biology" },
        { name: "Ecology", image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Ecology" },
        { name: "Human Anatomy", image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Anatomy" },
    ],
    mathematics: [
        { name: "Calculus", image: "https://via.placeholder.com/150/FFFF00/000000?text=Calculus" },
        { name: "Algebra", image: "https://via.placeholder.com/150/FFFF00/000000?text=Algebra" },
        { name: "Geometry", image: "https://via.placeholder.com/150/FFFF00/000000?text=Geometry" },
        { name: "Statistics", image: "https://via.placeholder.com/150/FFFF00/000000?text=Statistics" },
    ],
    physics: [
        { name: "Mechanics", image: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Mechanics" },
        { name: "Thermodynamics", image: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Thermodynamics" },
        { name: "Optics", image: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Optics" },
        { name: "Quantum Physics", image: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Quantum" },
    ],
    chemistry: [
        { name: "Organic Chemistry", image: "https://via.placeholder.com/150/00FFFF/000000?text=Organic" },
        { name: "Inorganic Chemistry", image: "https://via.placeholder.com/150/00FFFF/000000?text=Inorganic" },
        { name: "Physical Chemistry", image: "https://via.placeholder.com/150/00FFFF/000000?text=Physical" },
        { name: "Analytical Chemistry", image: "https://via.placeholder.com/150/00FFFF/000000?text=Analytical" },
    ],
    mechanicalengineering: [
        { name: "Thermodynamics", image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Thermodynamics" },
        { name: "Fluid Mechanics", image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Fluid+Mechanics" },
        { name: "Engineering Design", image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Design" },
        { name: "Materials Science", image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Materials" },
    ],

};

const SubjectPage = () => {
    const { department } = useParams();
    const departmentSubjects = subjects[department];

    if (!departmentSubjects) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Subjects not found!</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize">
                    {department.replace(/-/g, " ")} Subjects
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {departmentSubjects.map((subject, index) => (
                    <div
                        key={index}
                        className="block bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={subject.image}
                            alt={subject.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {subject.name}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Learn and collaborate on {subject.name}.
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link
                    to="/home"
                    className="inline-block py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default SubjectPage;
