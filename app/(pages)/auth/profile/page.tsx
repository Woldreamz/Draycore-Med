"use client";

import Layout from "app/(root)/layout";
import Navbar from "@/components/Navbar";
import { FC } from "react";
import Breadcrumbs from "@/components/ui/BreadCrumbs";

const UserDetailsPage: FC = () => {
  const breadcrumbs = [
    { name: "Account", href: "/auth" },
    { name: "All Users", href: "/auth/all-users" },
    { name: "User Profile", href: "/auth/profile" },
  ];

  return (
    <div className="flex flex-col bg-gray-100 w-full lg:grid lg:grid-cols-[auto,1fr] min-h-screen text-gray-800">
      {/* Sidebar Placeholder - hidden on small screens */}
      <Layout>
        <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
          {/* Sidebar content here */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[25%] p-6 space-y-6 pt-20">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {/* Breadcrumbs */}
              <Breadcrumbs
                breadcrumbs={breadcrumbs}
                className="text-lg font-semibold text-gray-700"
              />
            </h2>
          </div>
          <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300">
            Back
          </button>
        </header>

        {/* User Details Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            User Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                value="John"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                value="Chao"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value="johnchao@gmail.com"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Occupation</label>
              <input
                type="text"
                value="Gynecologist"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Address</label>
              <input
                type="text"
                value="San Jose, California, USA"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                value="546-933-2772"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-700">450</p>
              <p className="text-gray-500">Searches</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-700">21</p>
              <p className="text-gray-500">Saves</p>
            </div>
          </div>
        </section>

        {/* Delete User Button */}
        <div className="flex justify-end">
          <button className="px-4 lg:px-6 py-2 lg:py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
