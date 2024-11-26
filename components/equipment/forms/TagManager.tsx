import React from "react";

interface TagManagerProps {
  keywords: string[];
  onKeywordChange: (keywords: string[]) => void;
  buttonStyle?: string; // Add the buttonStyle prop
}

const TagManager: React.FC<TagManagerProps> = ({
  keywords,
  onKeywordChange,
  buttonStyle,
}) => {
  // Handle adding and removing keywords/tags (if needed)
  const handleAddTag = (newTag: string) => {
    if (!keywords.includes(newTag)) {
      onKeywordChange([...keywords, newTag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    onKeywordChange(keywords.filter((keyword) => keyword !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <button
          key={index}
          className={`${buttonStyle} rounded-full`} // Apply the buttonStyle to the button
          onClick={() => handleRemoveTag(keyword)}
        >
          {keyword} <span className="ml-2">&times;</span>
        </button>
      ))}

      {/* Example for adding a new tag */}
      <input
        type="text"
        placeholder="Add tag"
        onBlur={(e) => handleAddTag(e.target.value)}
        className="border p-2 rounded-md"
      />
    </div>
  );
};

export default TagManager;
