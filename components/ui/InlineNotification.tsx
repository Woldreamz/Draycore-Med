import React from "react";

interface InlineNotificationProps {
  message: string;
}

export const InlineNotification: React.FC<InlineNotificationProps> = ({
  message,
}) => {
  return (
    <div className="mt-4 p-4 bg-green-500 text-white rounded-md text-sm">
      {message}
    </div>
  );
};
