import React, { useState } from "react";
import { EquipmentImageList } from "@/components/equipment/image/imageCollection";
import TagManager from "@/components/equipment/forms/TagManager";
import FileInput from "@/components/ui/FileInput";
import { InlineNotification } from "@/components/ui/InlineNotification";

interface EquipmentDetailsProps {
  name: string;
  category: string;
  description: string;
  age: string;
  gender: string;
  length: string;
  width: string;
  keywords: string[];
}

const EquipmentDetail: React.FC<EquipmentDetailsProps> = ({
  name,
  category,
  description,
  age,
  gender,
  length,
  width,
  keywords,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [equipmentDetails, setEquipmentDetails] = useState({
    name,
    category,
    description,
    age,
    gender,
    length,
    width,
    keywords,
  });
  const [images, setImages] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setEquipmentDetails({
      ...equipmentDetails,
      [field]: e.target.value,
    });
  };

  const handleKeywordChange = (keywords: string[]) => {
    setEquipmentDetails({
      ...equipmentDetails,
      keywords,
    });
  };

  const handleImageUpload = (image: string) => {
    setImages([...images, image]);
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSaveChanges = () => {
    setNotification("Changes saved successfully!");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Equipment Details
        </h2>
        <button
          onClick={handleEditToggle}
          className={`px-4 py-2 rounded-md ${isEditing ? "bg-gray-300" : "bg-blue-500"} text-white`}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {notification && <InlineNotification message={notification} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 mb-1">Equipment Name</label>
          <input
            type="text"
            value={equipmentDetails.name}
            onChange={(e) => handleInputChange(e, "name")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Category</label>
          <input
            type="text"
            value={equipmentDetails.category}
            onChange={(e) => handleInputChange(e, "category")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <textarea
            value={equipmentDetails.description}
            onChange={(e) => handleInputChange(e, "description")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Age Group</label>
          <input
            type="text"
            value={equipmentDetails.age}
            onChange={(e) => handleInputChange(e, "age")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Gender</label>
          <input
            type="text"
            value={equipmentDetails.gender}
            onChange={(e) => handleInputChange(e, "gender")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Length</label>
          <input
            type="text"
            value={equipmentDetails.length}
            onChange={(e) => handleInputChange(e, "length")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Width</label>
          <input
            type="text"
            value={equipmentDetails.width}
            onChange={(e) => handleInputChange(e, "width")}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <TagManager
        keywords={equipmentDetails.keywords}
        onKeywordChange={handleKeywordChange}
      />

      <FileInput onUpload={handleImageUpload} />

      {isEditing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveChanges}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      )}

      <EquipmentImageList
        list={images.map((img) => ({ src: img, alt: "Equipment Image" }))}
        onDelete={handleImageDelete}
        isEditable={isEditing}
      />
    </div>
  );
};

export default EquipmentDetail;
