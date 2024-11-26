// components/ui/FileInput.tsx

import React, { useState } from "react";

interface FileInputProps {
  onUpload: (image: string) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onUpload(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 py-2 px-4 rounded-md mt-2"
      />
      {selectedFile && (
        <p className="text-gray-500 mt-2">File selected: {selectedFile.name}</p>
      )}
    </div>
  );
};

export default FileInput;
