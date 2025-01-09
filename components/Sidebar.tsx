"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import {
  HiOutlineUsers,
  HiUsers,
  HiOutlineScissors,
  HiBadgeCheck
} from "react-icons/hi";
import { RiFirstAidKitLine } from "react-icons/ri";
import { GoGear } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";


const Sidebar = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
    Accounts: false,
    Equipments: false,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = (itemName: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: MdOutlineDashboard,
    },
    {
      name: "Accounts",
      href: "/auth",
      icon: HiOutlineUsers,
      subItems: [
        { name: "Accounts", href: "/auth", icon: HiOutlineUsers },
        { name: "All Users", href: "/auth/all-users", icon: HiUsers },
      ],
    },
    {
      name: "Equipments",
      href: "/equipments",
      icon: RiFirstAidKitLine,
      subItems: [
        { name: "Equipments", href: "/equipments", icon: HiOutlineScissors },
        {
          name: "Create Equipment",
          href: "/equipments/basic_information",
          icon: HiBadgeCheck,
        },
      ],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: GoGear,
    },
    {
      name: "Log out",
      href: "/sign-out",
      icon: BiLogOut,
      position: true,
    },
  ];

  return (
    <div className="flex bg-white flex-col md:flex-row pb-2 md:h-full lg:h-full h-0">

      {/* Toggle Button for small/medium screens */}
      <button
        className="block lg:hidden ml-1 p-3 bg-teal-600 text-white fixed top-1 left-0 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ?  <Image className="text-white" src="/images/x icon.svg" alt="xicon" width={21} height={21}/> 
         : <Image className="text-white" src="/images/bars-solid.svg" alt="xicon" width={21} height={21}/>}
      </button>

      {/* Sidebar */}

      <div className={`fixed inset-y-0 left-0 z-40 w-[50%] md:w-[25%] lg:w-[20%] bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}>
        <div className="shadow h-15 bg-white border w-full p-4">
          <Image className="xm:ml-8 sm:ml-8 md:ml-8 lg:ml-0" width={140} height={85} src="/Logo.svg" alt="logo" priority />
        </div>
        <aside className="bg-white text-white w-full h-full">
          <ul className="mt-4 relative flex h-3/4 flex-col p-4 gap-4">
            {sidebarItems.map(
              ({ name, href, icon: Icon, subItems, position }) => (
                <li key={name} className={position ? "absolute bottom-0" : ""}>
                  <div>
                    <Link
                      className={`flex items-center px-4 py-2 rounded text-black hover:text-teal-600 transition ${
                        pathname === href ? "text-teal-600" : ""
                      }`}
                      href={href}
                      onClick={(e) => {
                        if (subItems) {
                          e.preventDefault();
                          toggleDropdown(name);
                        }
                      }}
                    >
                      <span className="mr-2">{Icon ? <Icon /> : null}</span>
                      <span>{name}</span>
                    </Link>
                    {subItems && dropdownOpen[name] && (
                      <ul
                        className="ml-6 mt-2 space-y-2 transition-all duration-300 overflow-hidden"
                        style={{
                          maxHeight: dropdownOpen[name] ? "300px" : "0",
                        }}
                      >
                        {subItems.map(({ name, href, icon: SubIcon }) => (
                          <li key={name}>
                            <Link
                              className={`flex items-center px-4 py-2 rounded text-black hover:text-teal-600 transition ${
                                pathname === href ? "text-teal-600" : ""
                              }`}
                              href={href}
                            >
                              <span className="mr-2">
                                {SubIcon ? <SubIcon /> : null}
                              </span>
                              <span>{name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ),
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
