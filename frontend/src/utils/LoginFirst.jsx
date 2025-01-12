import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi'; // Close icon
import { useState } from 'react';

const LoginPromptPopup = ({ closePopup }) => {
    const [isVisible, setIsVisible] = useState(true);

    // Close the popup on pressing 'Esc' key
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                setIsVisible(false);
                closePopup();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [closePopup]);

    return (
        isVisible && (
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-out animate-fadeIn"
                aria-labelledby="login-popup-title"
                role="dialog"
                aria-hidden={!isVisible}
            ><div
                className="bg-white p-8 rounded-lg shadow-xl w-[500px] max-w-full   relative transition-all transform hover:scale-105"
                role="document"
            >

                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl transition duration-300"
                        onClick={() => { setIsVisible(false); closePopup(); }}
                        aria-label="Close"
                    >
                        <FiX />
                    </button>

                    {/* Popup Content */}
                    <h2
                        id="login-popup-title"
                        className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600 mb-6 text-center"
                    >
                        Log in to access the group and join the conversation!
                    </h2>


                    <div className="space-y-4 text-center">
                        <button
                            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={() => window.location.href = '/login'}
                            aria-label="Log In"
                        >
                            Log In
                        </button>
                        <button
                            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-300"
                            onClick={() => window.location.href = '/signup'}
                            aria-label="Sign Up"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default LoginPromptPopup;
