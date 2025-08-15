"use client";

import React, { useState } from "react";
import useSignUp from "@/hooks/useSignUp";
import Link from "next/link";

import convertToBase64 from '@/lib/convertToBase64'

interface SignUpData {
  name: string;
  username: string;
  avatar: any;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [signupData, setSignUpData] = useState<SignUpData>({
    name: "",
    username: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, Loading } = useSignUp();

  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const base64 = await convertToBase64(file)
    if (file) {
      try {
          const result = await convertToBase64(file);
          setSignUpData({...signupData,avatar:base64 as string});
          console.log("Base64:", result);
      } catch (error) {
          console.error("Error:", error);
      }
  } else {
      console.error("No file selected");
  }

   
  };

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signup(signupData);
    console.log(response);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3d3d3d] text-white">
      <div className="w-full max-w-md p-6 bg-[#252525] rounded-lg shadow-lg">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src={signupData.avatar ?signupData.avatar: "/logo.png"}
            alt="Logo"
            className="mx-auto w-20 h-20 rounded-full"
          />
          <h1 className="text-2xl font-semibold mt-2">Create an Account</h1>
          <p className="text-gray-400 text-sm">Join us and start chatting!</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmitData} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm mb-1">
              Username
            </label>
            <input
              name="username"
              value={signupData.username}
              onChange={(e)=>setSignUpData({...signupData,username:e.target.value})}
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 bg-[#353535] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Full Name
            </label>
            <input
              name="name"
              value={signupData.name}
              onChange={(e)=>setSignUpData({...signupData,name:e.target.value})}
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 bg-[#353535] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              name="password"
              value={signupData.password}
              onChange={(e)=>setSignUpData({...signupData,password:e.target.value})}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-[#353535] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={(e)=>setSignUpData({...signupData,confirmPassword:e.target.value})}
              type="password"
              id="confirmPassword"
              placeholder="Type password again"
              className="w-full px-3 py-2 bg-[#353535] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
            disabled={Loading}
          >
           {Loading ? (
              <span className="loading loading-bars loading-lg"></span>
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Pick a file</span>
            </div>
            <input
              name="avatar"
              onChange={handleChange}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
        </form>
        {/* Footer */}
        <div className="text-center mt-6 text-sm">
          <p>
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
