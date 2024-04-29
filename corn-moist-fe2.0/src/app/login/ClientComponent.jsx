"use client";

import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import btglogoB from "../../../public/btglogoB.png";

// InputField component
const InputField = ({ id, type = "text", placeholder, label, value, onChange }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required
      className="input input-bordered w-full mt-1"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const ClientComponent = () => {
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const apiUrl = process.env.NEXT_PUBLIC_APIGATEWAY_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.setItem("roles", JSON.stringify(data.roles));
      sessionStorage.setItem("username", credentials.username);
      setIsLoading(false);
      router.push("/"); // Navigate to the homepage
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center justify-center">
        <Image src={btglogoB} alt="betagro" width={160} height={160} />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
        {error && <div className="mt-2 text-center text-sm text-red-600">{error}</div>}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            id="username"
            placeholder="QC User"
            label="User Name :"
            value={credentials.username}
            onChange={handleChange}
          />
          <InputField
            id="password"
            type="password"
            placeholder="password"
            label="Password :"
            value={credentials.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full btn btn-primary text-xl mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Sign in"}
          </button>
          <p className="text-center mt-6">
            Not a member?{" "}
            <Link
              href="/register"
              className="block p-2 text-base font-bold text-blue-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ClientComponent;