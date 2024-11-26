"use client";

import React, { useState } from "react";
import Link from "next/link";
import Layout from "app/(root)/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const AllUsers = () => {
  const breadcrumbs = [
    { name: "Account", href: "/auth" },
    { name: "All Users", href: "/auth/all-users" },
  ];

  const [selectedUser, setSelectedUser] = useState<null | {
    name: string;
    occupation: string;
    location: string;
    profileImage?: string;
  }>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleViewUser = (user: {
    name: string;
    occupation: string;
    location: string;
  }) => {
    setSelectedUser(user);
    setUploadedImage(null); // Reset image for each new user
  };

  const handleDeleteUser = (name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      alert(`${name} deleted.`);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const users = [
    {
      name: "Angela Bassett",
      occupation: "Oncologist",
      location: "Los Angeles, CA",
    },
    {
      name: "Rahmin Dunis",
      occupation: "Oncologist",
      location: "Mumbai, India",
    },
    { name: "Joe Chin", occupation: "Gynecologist", location: "Cuba" },
    { name: "Halimar Abubakar", occupation: "Optician", location: "Kiev" },
    { name: "Gustavo Fring", occupation: "Dentist", location: "Tokyo" },
  ];

  return (
    <div className="flex flex-col bg-gray-100 w-full lg:grid lg:grid-cols-[auto,1fr] min-h-screen text-gray-800">
      {/* Sidebar Placeholder */}
      <Layout>
        <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
          {/* Sidebar content */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[25%] p-6 space-y-6 pt-20">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Link href="/auth">
            <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300">
              Back
            </button>
          </Link>
        </header>

        {/* Users Table */}
        <section className="mt-4 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            All Users
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-sm">Name</th>
                  <th className="p-4 text-sm">Occupation</th>
                  <th className="p-4 text-sm">Location</th>
                  <th className="p-4 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 text-sm">{user.name}</td>
                    <td className="p-4 text-sm">{user.occupation}</td>
                    <td className="p-4 text-sm">{user.location}</td>
                    <td className="p-4 flex space-x-2 text-sm">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="flex items-center text-green-500 p-2 hover:text-green-700"
                      >
                        <FontAwesomeIcon
                          icon={faEye as IconProp}
                          className="h-4 w-4"
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.name)}
                        className="flex items-center text-red-500 p-2 hover:text-red-700"
                      >
                        <FontAwesomeIcon
                          icon={faTrash as IconProp}
                          className="h-4 w-4"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Profile Popup */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                User Profile
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FontAwesomeIcon
                  icon={faTimes as IconProp}
                  className="h-5 w-5"
                />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              {/* Profile Image */}
              <div className="w-32 h-32 rounded-full border border-gray-300 overflow-hidden">
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
              </div>
              <label className="text-sm text-gray-600 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Upload Image
                </span>
              </label>
              {/* User Details */}
              <div className="text-center">
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedUser.occupation}
                </p>
                <p className="text-sm text-gray-600">{selectedUser.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
