"use client";

import { useState, useEffect } from "react";
import Layout from "app/(root)/layout";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/ui/BreadCrumbs";

const UserDetailsPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const breadcrumbs = [
    { name: "Account", href: "/auth" },
    { name: "All Users", href: "/auth/all-users" },
    { name: "User Profile", href: "/auth/profile" },
  ];

  // Simulated fetch call to get user data
  useEffect(() => {
    const fetchedUser = {
      firstName: "John",
      lastName: "Chao",
      email: "johnchao@gmail.com",
      occupation: "Gynecologist",
      address: "San Jose, California, USA",
      phone: "546-933-2772",
    };
    setUser(fetchedUser);
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Store image as base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 w-full lg:grid lg:grid-cols-[auto,1fr] min-h-screen text-gray-800">
      <Layout>
        <Navbar />
      </Layout>

      <div className="flex-1 lg:ml-[20%] p-6 space-y-6 pt-20">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <button
            onClick={() => (window.location.href = "/auth")}
            className="bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300"
          >
            Back
          </button>
        </header>

        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            User Details
          </h3>

          <div className="flex flex-col items-center mb-6">
            <img
              src={
                profileImage ||
                "https://via.placeholder.com/150?text=Profile+Image"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border mb-4"
            />
            <label className="text-sm text-gray-600 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
              Upload Profile Picture
            </label>
          </div>

          {user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(user).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-600 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-3 py-2 border ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } border-gray-300 rounded-md`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={toggleEditMode}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Save Changes" : "Edit Details"}
            </button>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
