import React from "react";
import { useSelector } from "react-redux";
import { Shield, User, Mail, Clock } from "lucide-react";
import Logout from "../components/Logout";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs (same as Login/Register) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 opacity-15 rounded-full blur-2xl transform -rotate-45"></div>

      {/* Profile Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">
            {user?.role === "admin" ? "Admin Dashboard" : "User Profile"}
          </h1>
          <p className="text-sm opacity-90 mt-1">
            Manage your account and settings here.
          </p>
          <Logout/>
        </div>

        <div className="p-8 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.username}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Role Information */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-medium ">Username:</span>
              <span className="ml-2 text-black">{user.username}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Mail className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-medium">Email:</span>
              <span className="ml-2">{user?.email}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Shield className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-medium">Role:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-md text-sm ${
                  user?.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-pink-100 text-pink-700"
                }`}
              >
                {user?.role}
              </span>
            </div>

            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-medium">Session Status:</span>
              <span className="ml-2 px-2 py-1 rounded-md text-sm bg-green-100 text-green-700">
                Active
              </span>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
}
