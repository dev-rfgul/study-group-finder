import React from 'react'

const Singup = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-300 text-center">Sign Up</h2>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        Create your account to get started
                    </p>

                    <form className="mt-6">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-400 text-sm font-medium"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-400 text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="confirm-password"
                                className="block text-gray-400 text-sm font-medium"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-gray-400 text-center mt-4">
                        Already have an account?{" "}
                        <a href="#" className="text-blue-500 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Singup