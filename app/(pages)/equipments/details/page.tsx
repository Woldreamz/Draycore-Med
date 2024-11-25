"use client";

import EquipmentDetail from "@/components/equipment/forms/details";
import { EquipmentImageList } from "@/components/equipment/image/imageCollection";
import { MinorNav } from "@/components/equipment/minorNav";
import shears from "@/public/Images/shears.png";
import React from "react";
import Layout from "@/app/(root)/layout";
import Navbar from "@/components/Navbar";

const EquipmentDetails = () => {
  const data = [
    { src: shears, alt: "shears" },
    { src: shears, alt: "shears" },
    { src: shears, alt: "shears" },
  ];
  const detail = {
    name: "Scissors",
    category: "Surgery",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus sapien laoreet quisque lorem dignissim adipiscing sit. Enim integer viverra pellentesque tempus turpis nunc. Amet vel amet morbi elit ultrices quisque a feugiat. Gravida nunc sit sit sit mauris viverra a ac nunc.",
    age: "19-35",
    gender: "Female",
    length: "15cm",
    width: "30cm",
    keywords: ["Scissors", "Surgery", "Cutting", "Shears"],
  };

  return (
    <div className="flex bg-gray-100 flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg">
          {/* Sidebar content if needed */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[21%] p-6 space-y-6 pt-20">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <MinorNav
            heading="Equipment Details"
            btn="Edit"
            btn2="Delete"
            link="/equipment"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            <EquipmentDetail {...detail} />
            <EquipmentImageList list={data} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default EquipmentDetails;
