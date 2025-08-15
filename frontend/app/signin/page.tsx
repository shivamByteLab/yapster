"use client";
import useLogin from "@/hooks/useLogin";
import { useAuthContext } from "@/context/useAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const SignIn = () => {
  const [loginData, setloginData] = useState({ username: "", password: "" });
  const { login, Loading } = useLogin();
  const { authUser } = useAuthContext();
  const router = useRouter();

  // Redirect authenticated users
  // useEffect(() => {
  //   if (authUser) {
  //     router.push("/");
  //   }
  // }, [authUser]);

  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData);
  };

  if (authUser) return null; // Prevent rendering the form while redirecting

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3d3d3d] text-white">
      <div className="w-full max-w-md p-6 bg-[#252525] rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto w-20 h-20 rounded-full"
          />
          <h1 className="text-2xl font-semibold mt-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmitData} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm mb-1">
              Username
            </label>
            <input
              value={loginData.username}
              onChange={(e) =>
                setloginData({ ...loginData, username: e.target.value })
              }
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 bg-[#353535] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              value={loginData.password}
              onChange={(e) =>
                setloginData({ ...loginData, password: e.target.value })
              }
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-[#353535] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            {Loading ? (
              <span className="loading loading-bars loading-lg"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="text-center mt-6 text-sm">
          <p>
            Create an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
