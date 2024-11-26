"use client";

import React, { useState } from "react";

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Equipment Description" },
  { id: 3, title: "Upload Images" },
  { id: 4, title: "Specifications" },
];

const EquipmentStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(["Category 1", "Category 2"]);

  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory(""); // Clear input after adding
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              {/* Progress Bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="h-1 flex-1 bg-green-500"></div>
                <div className="h-1 flex-1 bg-gray-300"></div>
                <div className="h-1 flex-1 bg-gray-300"></div>
                <div className="h-1 flex-1 bg-gray-300"></div>
              </div>

              <h1 className="text-lg font-semibold mb-4">Basic Information</h1>
              <p className="text-gray-600 mb-6">
                Enter the equipment name and category
              </p>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter equipment name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    <button
                      onClick={handleAddCategory}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                    >
                      Add Category
                    </button>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="mt-6">
                <button
                  onClick={handleNext}
                  className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Equipment Description</h1>
              <p className="text-gray-600 mb-4">
                Provide a detailed description of the equipment.
              </p>
              <textarea
                placeholder="Enter description here..."
                className="w-full border p-4 rounded-lg shadow-sm"
                rows={6}
              ></textarea>
              <div className="flex justify-end mt-4">
                <a
                  href="/equipments/specifications"
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </a>
              </div>
            </section>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Upload Images</h1>
              <p className="text-gray-600 mb-4">
                Upload clear images of the equipment.
              </p>
              <label className="block bg-gray-100 p-6 border border-gray-300 rounded-lg cursor-pointer">
                <input type="file" className="hidden" />
                <div className="flex flex-col items-center">
                  <span className="text-gray-500">Choose Image</span>
                  <img
                    src="/placeholder.png"
                    alt="Upload Placeholder"
                    className="w-16 h-16 mt-2"
                  />
                </div>
              </label>
              <div className="flex justify-end mt-4">
                <a
                  href="/equipments"
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg"
                >
                  Finish
                </a>
              </div>
            </section>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">Specifications</h1>
              <p className="text-gray-600 mb-4">
                Enter detailed specifications for the equipment.
              </p>
              <button className="flex items-center space-x-2 bg-yellow-100 border-yellow-400 text-yellow-600 p-4 rounded-lg shadow">
                <span className="text-xl">+</span>
                <span>Add Specification</span>
              </button>
              <div className="flex justify-end mt-4">
                <a
                  href="/equipments/upload_images"
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </a>
              </div>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Stepper Header */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex-1 text-center ${
              step.id === currentStep
                ? "text-teal-500 font-bold"
                : "text-gray-400"
            }`}
          >
            <div className="h-2 w-full bg-gray-200 rounded-lg overflow-hidden">
              <div
                className={`h-2 ${
                  step.id <= currentStep ? "bg-teal-500" : "bg-gray-200"
                }`}
                style={{ width: `${100 / steps.length}%` }}
              ></div>
            </div>
            <p className="mt-2">{step.title}</p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div>{renderStepContent(currentStep)}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg ${
            currentStep === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EquipmentStepper;
