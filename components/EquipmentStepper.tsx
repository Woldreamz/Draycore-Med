"use client";

import React, { useState } from "react";

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Equipment Description" },
  { id: 3, title: "Specifications" },
  { id: 4, title: "Upload Images" },
  { id: 5, title: "Keywords" },
  { id: 6, title: "Use Cases" },
  { id: 7, title: "Review" },
];

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex-1 h-1 ${
            step.id <= currentStep ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
};

const EquipmentStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Surgery",
    "Diagnostics",
    "Therapy",
  ]);
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState({});
  const [keywords, setKeywords] = useState(["Surgery"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [useCases, setUseCases] = useState(["Lorem ipsum dolor sit amet."]);
  const [newUseCase, setNewUseCase] = useState("");
  const [images, setImages] = useState(["/img1.png", "/img2.png", "/img3.png"]);

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const handleAddUseCase = () => {
    if (newUseCase) {
      setUseCases([...useCases, newUseCase]);
      setNewUseCase("");
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleSaveAndUpload = () => {
    const mockData = {
      name,
      category,
      description,
      specifications,
      keywords,
      useCases,
      images,
    };
    console.log("Review Data:", mockData);
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h1 className="text-lg font-semibold">Basic Information</h1>
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter equipment name"
                className="w-full border-gray-300 rounded-md shadow-sm mt-1"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Category</span>
              <div className="flex gap-2 mt-1">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 border-gray-300 rounded-md shadow-sm"
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
                  className="flex-1 border-gray-300 rounded-md shadow-sm"
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow"
                >
                  Add
                </button>
              </div>
            </label>
          </div>
        );
      // Case 2–7 omitted for brevity; follow a similar structure
      case 2:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">
                Equipment Description
              </h1>
              <p className="text-gray-600 mb-6">
                Provide a detailed description of the equipment.
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description here..."
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                rows={6}
              />
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

      case 3:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">Specifications</h1>
              <p className="text-gray-600 mb-6">
                Add specifications for the equipment.
              </p>
              <textarea
                value={specifications.details || ""}
                onChange={(e) =>
                  setSpecifications({
                    ...specifications,
                    details: e.target.value,
                  })
                }
                placeholder="Enter specifications..."
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                rows={6}
              />
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

      case 4:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">Upload Images</h1>
              <p className="text-gray-600 mb-6">
                Upload clear images of the equipment.
              </p>
              <label className="block border-2 border-dashed border-gray-300 p-4 rounded-md cursor-pointer">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageURL = URL.createObjectURL(file);
                      setImages([...images, imageURL]);
                    }
                  }}
                  className="hidden"
                />
                <p className="text-gray-500 text-center">
                  Click to upload an image
                </p>
              </label>
              <ul className="mt-4 flex gap-4 overflow-x-auto">
                {images.map((image, index) => (
                  <li key={index} className="relative w-20 h-20">
                    <img
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </li>
                ))}
              </ul>
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

      case 5:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">Keywords</h1>
              <p className="text-gray-600 mb-6">
                Add keywords to make the equipment easily searchable.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Enter a keyword"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <button
                  onClick={handleAddKeyword}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                >
                  Add
                </button>
              </div>
              <ul className="mt-4 flex gap-2 flex-wrap">
                {keywords.map((keyword, index) => (
                  <li
                    key={index}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
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

      case 6:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">Use Cases</h1>
              <p className="text-gray-600 mb-6">
                List practical applications for the equipment.
              </p>
              <textarea
                value={newUseCase}
                onChange={(e) => setNewUseCase(e.target.value)}
                placeholder="Enter a use case"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                rows={3}
              />
              <button
                onClick={handleAddUseCase}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg shadow hover:bg-yellow-600 mt-2"
              >
                Add Use Case
              </button>
              <ul className="mt-4 space-y-2">
                {useCases.map((useCase, index) => (
                  <li
                    key={index}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm"
                  >
                    {useCase}
                  </li>
                ))}
              </ul>
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

      case 7:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
              <h1 className="text-lg font-semibold mb-4">Review</h1>
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium">Basic Information</h2>
                  <p>Name: {name}</p>
                  <p>Category: {category}</p>
                </div>
                <div>
                  <h2 className="font-medium">Description</h2>
                  <p>{description}</p>
                </div>
                <div>
                  <h2 className="font-medium">Keywords</h2>
                  <ul className="flex gap-2">
                    {keywords.map((keyword, index) => (
                      <li
                        key={index}
                        className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm"
                      >
                        {keyword}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-medium">Use Cases</h2>
                  <ul className="list-disc pl-5">
                    {useCases.map((useCase, index) => (
                      <li key={index}>{useCase}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={handleSaveAndUpload}
                className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
              >
                Save and Submit
              </button>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <ProgressBar currentStep={currentStep} />
      {renderStepContent()}
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
          className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EquipmentStepper;
