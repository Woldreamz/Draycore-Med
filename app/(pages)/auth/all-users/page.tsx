"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "app/(root)/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { BASE_URL } from "@/api/base-url";
import Modal from "@/components/Modal"; // Import the Modal component

const AllUsers = () => {
  const breadcrumbs = [
    { name: "Account", href: "/auth" },
    { name: "All Users", href: "/auth/all-users" },
  ];

  return (
    <div className="flex flex-col bg-gray-100 w-full lg:grid lg:grid-cols-[auto,1fr] min-h-screen text-gray-800">
      <Layout>
        <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
          {/* Sidebar content */}
        </div>
        <Navbar />
      </Layout>

      <div className="flex-1 lg:ml-[25%] p-6 space-y-6 pt-20">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Link href="/auth">
            <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300">
              Back
            </button>
          </Link>
        </header>

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
                        onClick={() => handleDeleteUser(user.id, user.name)}
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
            <div>
              <p>Name: {selectedUser.name}</p>
              <p>Occupation: {selectedUser.occupation}</p>
              <p>Location: {selectedUser.location}</p>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && userToDelete && (
        <Modal
          isOpen={isModalOpen}
          message={`Are you sure you want to delete ${userToDelete.name}?`}
          onConfirm={() => {
            handleDeleteApiCall(userToDelete.id, userToDelete.name);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AllUsers;
