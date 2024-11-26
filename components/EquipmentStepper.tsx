"use client";

import React, { useState } from "react";

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Equipment Description" },
  { id: 3, title: "Specifications" },
  { id: 4, title: "Upload Images" },
];

const EquipmentStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold">Basic Information</h2>
            <p className="text-gray-600">
              Enter basic details of the equipment.
            </p>
            <input
              type="text"
              placeholder="Equipment Name"
              className="w-full border rounded-lg p-4 my-4"
            />
            <input
              type="text"
              placeholder="Model Number"
              className="w-full border rounded-lg p-4 my-4"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold">Equipment Description</h2>
            <p className="text-gray-600">
              Provide a detailed description of the equipment.
            </p>
            <textarea
              placeholder="Enter description here..."
              className="w-full border p-4 rounded-lg shadow-sm my-4"
              rows={6}
            ></textarea>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold">Specifications</h2>
            <p className="text-gray-600">
              Enter detailed specifications for the equipment.
            </p>
            <button className="flex items-center space-x-2 bg-yellow-100 border-yellow-400 text-yellow-600 p-4 rounded-lg shadow my-4">
              <span className="text-xl">+</span>
              <span>Add Specification</span>
            </button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold">Upload Images</h2>
            <p className="text-gray-600">
              Upload clear images of the equipment.
            </p>
            <label className="block bg-gray-100 p-6 border border-gray-300 rounded-lg cursor-pointer my-4">
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
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
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
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className={`px-6 py-2 rounded-lg ${
            currentStep === steps.length
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default EquipmentStepper;
