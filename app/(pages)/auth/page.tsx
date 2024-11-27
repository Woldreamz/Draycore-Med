"use client";

import React, { useState } from "react";
import Layout from "app/(root)/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface User {
  name: string;
  occupation: string;
  location: string;
}

interface TopUser {
  username: string;
  searches: string;
  saved: number;
}

const Accounts = () => {
  const [users, setUsers] = useState<User[]>([]);

  const topUsersByMonth: Record<string, TopUser[]> = {
    January: [
      { username: "Alice Johnson", searches: "300+", saved: 20 },
      { username: "Bob Brown", searches: "250+", saved: 15 },
    ],
    February: [
      { username: "Catherine Smith", searches: "400+", saved: 30 },
      { username: "David Lee", searches: "350+", saved: 25 },
    ],
    March: [
      { username: "Eleanor White", searches: "450+", saved: 40 },
      { username: "Frank Wright", searches: "400+", saved: 35 },
    ],
    All: [
      { username: "Alice Johnson", searches: "300+", saved: 20 },
      { username: "Bob Brown", searches: "250+", saved: 15 },
      { username: "Catherine Smith", searches: "400+", saved: 30 },
      { username: "David Lee", searches: "350+", saved: 25 },
      { username: "Eleanor White", searches: "450+", saved: 40 },
      { username: "Frank Wright", searches: "400+", saved: 35 },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState("January");
  const [viewAll, setViewAll] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleView = (user: User) => {
    setSelectedUser(user);
  };

  const handleDelete = (userName: string) => {
    const confirmed = confirm(`Are you sure you want to delete ${userName}?`);
    if (confirmed) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.name !== userName),
      );
    }
  };

  return (
    <div className="flex bg-gray-100 flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg">
          {/* Sidebar content if needed */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[21%] p-6 space-y-6 pt-20">
        {/* Accounts Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Accounts</h2>
          <div className="flex justify-between items-center mt-4">
            <h3 className="text-sm font-medium text-gray-600">All Users</h3>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-gray-600">Name</th>
                  <th className="p-3 text-left text-gray-600">Occupation</th>
                  <th className="p-3 text-left text-gray-600">Location</th>
                  <th className="p-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="rounded-lg">
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 rounded-lg"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.occupation}</td>
                    <td className="p-3">{user.location}</td>
                    <td className="p-3 flex space-x-3">
                      <button
                        onClick={() => handleView(user)}
                        className="text-green-500 bg-gray-100 hover:text-green-700 rounded-md p-2"
                      >
                        <FontAwesomeIcon
                          icon={faEye as IconProp}
                          className="h-4 w-4"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(user.name)}
                        className="text-red-500 bg-gray-100 hover:text-red-700 rounded-md p-2"
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
        </div>

        {/* Top User Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-600">Top Users</h3>
            <div className="flex space-x-4">
              <select
                className="px-4 py-2 border rounded-md"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Object.keys(topUsersByMonth).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setViewAll(!viewAll)}
                className="text-white bg-blue-500 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600"
              >
                <span>{viewAll ? "View Current Month" : "View All"}</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-200 rounded-xl text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-gray-600">Username</th>
                  <th className="p-3 text-left text-gray-600">Searches</th>
                  <th className="p-3 text-left text-gray-600">Saved</th>
                </tr>
              </thead>
              <tbody>
                {(viewAll
                  ? topUsersByMonth["All"]
                  : topUsersByMonth[selectedMonth] || []
                ).map((user, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 rounded-lg"
                  >
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.searches}</td>
                    <td className="p-3">{user.saved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Profile Popup */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedUser(null)}
            >
              <FontAwesomeIcon icon={faTimes as IconProp} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedUser.name}
            </h2>
            <p className="text-sm text-gray-600">{selectedUser.occupation}</p>
            <p className="text-sm text-gray-600">{selectedUser.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
