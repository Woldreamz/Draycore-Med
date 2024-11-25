"use client";

import EquipmentList from "@/components/equipment/cardList";
import { MinorNav } from "@/components/equipment/minorNav";
import add from "@/public/icons/add.svg";
import { equips } from "@/components/equipment/data";
import React from "react";
import Layout from "app/(root)/layout";
import Navbar from "@/components/Navbar";

const EquipmentsPage = () => {
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
      <div className="flex-1 lg:ml-[20%] p-6 space-y-6 pt-20">
        <section className="bg-white p-6 rounded-lg shadow-md pt-10 pr-20">
          <MinorNav
            heading="Equipment List"
            btn="Add new"
            src={add}
            link="/equipments/basic_information"
            alt="add new"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            <EquipmentList data={equips} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default EquipmentsPage;
