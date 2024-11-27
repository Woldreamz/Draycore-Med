"use client";

import { useState, useEffect } from "react";
import { EquipmentImageList } from "@/components/equipment/image/imageCollection";
import EquipmentDetail from "@/components/equipment/forms/details";
import Layout from "@/app/(root)/layout";
import Navbar from "@/components/Navbar";
import FileInput from "@/components/ui/FileInput";

import { Modal } from "@/components/ui/Modal";
import TagManager from "@/components/equipment/forms/TagManager";
import { InlineNotification } from "@/components/ui/InlineNotification";

const EquipmentDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState([]); // Start with an empty array for uploaded images
  const [equipmentDetails, setEquipmentDetails] = useState({
    name: "Scissors",
    category: "Surgery",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus sapien laoreet quisque lorem dignissim adipiscing sit.",
    age: "19-35",
    gender: "Female",
    length: "15cm",
    width: "30cm",
    keywords: ["Scissors", "Surgery", "Cutting", "Shears"],
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Toggle Edit Mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle Image Upload
  const handleImageUpload = (newImage: string) => {
    setImages([...images, { src: newImage, alt: "uploaded-image" }]);
    setNotification("Image uploaded successfully!");
  };

  // Handle Image Deletion
  const handleImageDelete = (imageIndex: number) => {
    setImages(images.filter((_, index) => index !== imageIndex));
    setNotification("Image deleted successfully!");
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
    }
  }, [notification]);

  return (
    <div className="flex bg-gray-100 flex-col lg:flex-row min-h-screen">
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg">
          {/* Sidebar content if needed */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[21%] p-6 space-y-6 pt-20">
        <section className="bg-white p-6 pl-35 rounded-lg shadow-md">
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Equipment Detail Section */}
            <EquipmentDetail
              {...equipmentDetails}
              isEditing={isEditing}
              onDetailChange={handleDetailUpdate}
            />

            {/* Tags and Keywords Management */}
            <TagManager
              keywords={equipmentDetails.keywords}
              onKeywordChange={(keywords) =>
                handleDetailUpdate({ ...equipmentDetails, keywords })
              }
              buttonStyle="bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 text-sm py-1 px-2" // Custom styles for smaller and matching buttons
            />

            {/* Equipment Image Management */}
            <div className="w-full mt-4">
              <FileInput onUpload={handleImageUpload} />
              <EquipmentImageList
                list={images}
                onDelete={handleImageDelete}
                isEditable={isEditing}
              />
            </div>
          </div>

          {/* Inline Notification */}
          {notification && <InlineNotification message={notification} />}
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          title="Confirm Deletion"
          message="Are you sure you want to delete this equipment?"
          onConfirm={handleDeleteEquipment}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default EquipmentDetails;
