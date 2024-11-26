// components/equipment/image/imageCollection.tsx

import React from "react";

interface Image {
  src: string;
  alt: string;
}

interface EquipmentImageListProps {
  list: Image[];
  onDelete: (index: number) => void;
  isEditable: boolean;
}

export const EquipmentImageList: React.FC<EquipmentImageListProps> = ({
  list,
  onDelete,
  isEditable,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Equipment Images
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {list.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
            />
            {isEditable && (
              <button
                onClick={() => onDelete(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
