"use client";

import EquipmentList from "@/components/equipment/cardList";
import { MinorNav } from "@/components/equipment/minorNav";
import { useState, useEffect } from "react";
import Layout from "app/(root)/layout";
import Navbar from "@/components/Navbar";

const EquipmentsPage = () => {
  const [equipmentData, setEquipmentData] = useState([]); // State for equipment list
  const [filteredData, setFilteredData] = useState([]); // State for filtered list
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Simulated API Call
  useEffect(() => {
    const fetchEquipment = async () => {
      const mockData = [
        {
          id: 1,
          name: "X-Ray Machine",
          category: "Medical",
          status: "Available",
        },
        { id: 2, name: "Ultrasound", category: "Medical", status: "In Use" },
        { id: 3, name: "Ventilator", category: "ICU", status: "Maintenance" },
        {
          id: 4,
          name: "Defibrillator",
          category: "Emergency",
          status: "Available",
        },
      ];
      setEquipmentData(mockData);
      setFilteredData(mockData);
    };
    fetchEquipment();
  }, []);

  // Filter and Search Logic
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = equipmentData.filter((item) =>
      item.name.toLowerCase().includes(query),
    );
    setFilteredData(filtered);
  };

  const handleFilter = (category) => {
    const filtered =
      category === "All"
        ? equipmentData
        : equipmentData.filter((item) => item.category === category);
    setFilteredData(filtered);
  };

  const handleAddEquipment = (newEquipment) => {
    setEquipmentData([...equipmentData, newEquipment]);
    setFilteredData([...filteredData, newEquipment]);
    setShowAddModal(false); // Close modal after adding
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
      <div className="flex-1 lg:ml-[20%] p-6 space-y-6 pt-20">
        <section className="bg-white p-6 rounded-lg shadow-md pt-10 pr-20">
          <MinorNav
            heading="Equipment List"
            btn="Add new"
            src="/icons/add.svg"
            alt="add new"
            onClick={() => setShowAddModal(true)}
          />

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full md:w-1/2 px-4 py-2 border rounded-md"
            />
            <div className="flex gap-4 mt-4 md:mt-0">
              {["All", "Medical", "ICU", "Emergency"].map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilter(category)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment List */}
          <div className="flex flex-wrap gap-4 mt-4">
            {filteredData.length > 0 ? (
              <EquipmentList data={filteredData} />
            ) : (
              <p className="text-gray-500">No equipment found.</p>
            )}
          </div>
        </section>
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Add New Equipment
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newEquipment = {
                  id: equipmentData.length + 1,
                  name: formData.get("name"),
                  category: formData.get("category"),
                  status: "Available",
                };
                handleAddEquipment(newEquipment);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="Medical">Medical</option>
                    <option value="ICU">ICU</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentsPage;
