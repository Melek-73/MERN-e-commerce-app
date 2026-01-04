import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userDataSignup, setUserDataSignup] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataSignup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userDataSignup),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Signup failed");

      setMsg("✅ Account created successfully! You can now log in.");
      navigate("/"); // redirect to login
    } catch (err) {
      console.error("Signup error:", err);
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-40 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-8">Signup</h2>
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm border border-gray-300 rounded-2xl p-6 shadow-md flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label className="mb-1 font-medium">User Name</label>
          <input
            type="text"
            name="username"
            value={userDataSignup.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={userDataSignup.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={userDataSignup.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
