"use client";

import { FC } from "react";
import Layout from "app/(root)/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const AllUsers: FC = () => {
  const breadcrumbs = [
    { name: "Account", href: "/auth" },
    { name: "All Users", href: "/auth/all-users" },
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
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-gray-200 px-3 py-1 md:px-4 md:py-2 rounded-md text-gray-600 hover:bg-gray-300">
              Back
            </button>
          </div>
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
                  <th className="p-2 md:p-4 text-xs md:text-sm">Name</th>
                  <th className="p-2 md:p-4 text-xs md:text-sm">Occupation</th>
                  <th className="p-2 md:p-4 text-xs md:text-sm">Location</th>
                  <th className="p-2 md:p-4 text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
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
                  {
                    name: "Joe Chin",
                    occupation: "Gynecologist",
                    location: "Cuba",
                  },
                  {
                    name: "Halimar Abubakar",
                    occupation: "Optician",
                    location: "Kiev",
                  },
                  {
                    name: "Gustavo Fring",
                    occupation: "Dentist",
                    location: "Tokyo",
                  },
                ].map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {user.name}
                    </td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {user.occupation}
                    </td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {user.location}
                    </td>
                    <td className="p-2 md:p-4 flex space-x-2 text-xs md:text-sm">
                      <button className="flex items-center text-green-500 p-1 sm:p-2">
                        <FontAwesomeIcon icon={faEye as IconProp} className="h-4 w-4" />
                      </button>
                      <button className="flex items-center text-red-500 p-1 sm:p-2">
                        <FontAwesomeIcon icon={faTrash as IconProp} className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllUsers;
