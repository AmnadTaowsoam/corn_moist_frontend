import React, { useState } from "react";
import btglogoB from "../../assets/btglogoB.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await login(username, password);
        if (success) {
        navigate("/"); // Navigate to the home page or another route on successful login
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <div className="flex items-center justify-center">
            <img
                src={btglogoB}
                alt="Logo"
                className="w-40 h-40 transition-transform hover:scale-110 duration-300"
            />
            </div>
            <h1 className="text-3xl font-custom text-center text-black underline">
            {" "}
            Sign in
            </h1>
            <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
                <label
                htmlFor="username"
                className="block text-sm font-custom text-gray-800"
                >
                User Name:
                </label>
                <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                />
            </div>
            <div className="mb-2">
                <label
                htmlFor="password"
                className="block text-sm font-custom text-gray-800"
                >
                Password:
                </label>
                <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
            </div>
            <a
                href="#"
                className="text-xs text-purple-600 hover:underline font-custom"
            >
                Forget Password?
            </a>
            <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 font-custom">
                Sign in
                </button>
            </div>
            </form>
            <p className="mt-8 text-xs font-light text-center text-gray-700 font-custom">
            {" "}
            Don't have an account?{" "}
            <a href="#" className="font-medium text-purple-600 hover:underline">
                Sign up
            </a>
            </p>
        </div>
        </div>
    );
};

export default Login;
