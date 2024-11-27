"use client";

import { useState, useEffect } from "react";
import EquipmentList from "@/components/equipment/cardList";
import { MinorNav } from "@/components/equipment/minorNav";
import add from "@/public/icons/add.svg";
import { equips } from "@/components/equipment/data"; // Simulated static data
import React from "react";
import Layout from "app/(root)/layout";
import Navbar from "@/components/Navbar";
import { Equipment } from "@/components/equipment/types"; // Assuming you have a types file

const EquipmentsPage = () => {
  // State variables
  const [equipmentData, setEquipmentData] = useState<Equipment[]>(equips);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setLoading(true);
    setTimeout(() => {
      // Simulate error for testing
      if (Math.random() < 0.1) {
        setError("Failed to load equipment data.");
        setLoading(false);
      } else {
        setEquipmentData(equips);
        setLoading(false);
      }
    }, 1500); // Simulate 1.5 seconds fetch time
  }, []);

  // Filter equipment based on search query
  const filteredEquipments = equipmentData.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex bg-gray-100 flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg">
          {/* Sidebar content */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[20%] p-6 space-y-6 pt-20">
        {/* Header and Search */}
        <section className="bg-white p-6 rounded-lg shadow-md pt-10 pr-20">
          <MinorNav
            heading="Equipment List"
            btn="Add new"
            src={add}
            link="/equipments/basic_information"
            alt="add new"
          />
          {/* Search Bar */}
          <div className="mt-4 flex justify-between items-center">
            <input
              type="text"
              className="p-2 rounded-md border border-gray-300 w-full max-w-xs"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Equipment List Section */}
        <section className="bg-white p-6 rounded-lg shadow-md pt-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 mt-4">
              <EquipmentList data={filteredEquipments} />
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && (
            <div className="flex justify-center mt-6">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default EquipmentsPage;
