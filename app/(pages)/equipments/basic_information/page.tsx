"use client";

import EquipmentBasicInfo from "@/components/equipment/forms/basicInfo";
import { EquipmentProgressBar } from "@/components/equipment/progressBar";
import Layout from "app/(root)/layout";
import Navbar from "@/components/Navbar";
import React from "react";

const BasicInformation = () => {
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
        <section className="h-screen flex items-center justify-center">
          <div className="w-full lg:w-3/5 bg-white rounded-lg p-5 flex flex-col gap-6 shadow-md">
            <EquipmentProgressBar progress={1} />
            <EquipmentBasicInfo />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BasicInformation;
