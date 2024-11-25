import React from "react";
import Image from "next/image";

type CardProps = {
  title: string;
  value: string;
  trend: string;
  className: string; // Optional class name for custom styling
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  trendType: "up" | "down";
};

function Card({
  title,
  value,
  className,
  trend,
  iconSrc,
  iconWidth,
  iconHeight,
  trendType,
}: CardProps) {
  return (
    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-gray-700 font-light">{title}</h3>
        <p className="text-xl md:text-3xl font-semibold">{value}</p>
        <p
          className={`text-sm md:text-base ${
            trendType === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend} <span className="text-black">Up from yesterday</span>
        </p>
      </div>
      <Image
        src={iconSrc}
        alt={`${title} Icon`}
        width={iconWidth} // Specify width
        height={iconHeight} // Specify height
        className={className} // Keep classes for responsiveness if needed
      />
    </div>
  );
}

export default Card;
