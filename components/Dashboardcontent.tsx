import { useState } from "react";
import { FaClock, FaChevronDown } from "react-icons/fa";
import Card from "./Card";
import Layout from "app/(root)/layout"; // Assuming this is the correct path
import Navbar from "@/components/Navbar";

type TableData = {
  user: string;
  recentSearch: string;
  dateTime: string;
};

const DashboardContent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [sortColumn, setSortColumn] = useState<keyof TableData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [tableData, setTableData] = useState<TableData[]>([
    {
      user: "Daniel Benson",
      recentSearch: "2 Pack Trauma Shears",
      dateTime: "2024-11-22 09:36 AM", // Updated date
    },
    {
      user: "Emily Watson",
      recentSearch: "Pulse Oximeter",
      dateTime: "2024-10-15 02:30 PM", // Updated date
    },
    {
      user: "John Doe",
      recentSearch: "Surgical Scissors",
      dateTime: "2024-09-12 10:45 AM", // Updated date
    },
    {
      user: "Alice Green",
      recentSearch: "Blood Pressure Monitor",
      dateTime: "2024-08-03 01:15 PM", // Updated date
    },
    {
      user: "Michael Scott",
      recentSearch: "Sterile Gloves",
      dateTime: "2024-07-25 08:00 AM", // Updated date
    },
    {
      user: "Sarah Johnson",
      recentSearch: "Thermometer",
      dateTime: "2024-06-15 11:30 AM",
    },
    {
      user: "Chris Walker",
      recentSearch: "X-Ray Gloves",
      dateTime: "2024-05-20 03:00 PM",
    },
    {
      user: "David Brown",
      recentSearch: "Bandage Roll",
      dateTime: "2024-04-10 02:15 PM",
    },
    {
      user: "Linda Taylor",
      recentSearch: "Surgical Mask",
      dateTime: "2024-03-25 09:45 AM",
    },
    {
      user: "Paul Adams",
      recentSearch: "Gauze Pads",
      dateTime: "2024-02-17 01:30 PM",
    },
    {
      user: "Nina Cooper",
      recentSearch: "Disinfectant Wipes",
      dateTime: "2024-01-10 10:00 AM",
    },
  ]);

  // Toggles dropdown visibility
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handles selection of dropdown options
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setDropdownOpen(false);
    console.log(`Filter selected: ${filter}`);

    const now = new Date();
    let filteredData;

    switch (filter) {
      case "Today":
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return (
            itemDate.getDate() === now.getDate() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        });
        break;

      case "Yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return (
            itemDate.getDate() === yesterday.getDate() &&
            itemDate.getMonth() === yesterday.getMonth() &&
            itemDate.getFullYear() === yesterday.getFullYear()
          );
        });
        break;

      case "This Week":
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Set to the start of the week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the end of the week (Saturday)
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return itemDate >= startOfWeek && itemDate <= endOfWeek;
        });
        break;

      case "This Month":
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return (
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        });
        break;

      case "Last Month":
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1);
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return (
            itemDate.getMonth() === lastMonth.getMonth() &&
            itemDate.getFullYear() === lastMonth.getFullYear()
          );
        });
        break;

      case "Last Week":
        const startOfLastWeek = new Date(now);
        startOfLastWeek.setDate(now.getDate() - now.getDay() - 7); // Start of last week (previous Sunday)
        const endOfLastWeek = new Date(startOfLastWeek);
        endOfLastWeek.setDate(startOfLastWeek.getDate() + 6); // End of last week (previous Saturday)
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return itemDate >= startOfLastWeek && itemDate <= endOfLastWeek;
        });
        break;

      case "Last 3 Months":
        const threeMonthsAgo = new Date(now);
        threeMonthsAgo.setMonth(now.getMonth() - 3); // Subtract 3 months from the current date
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return itemDate >= threeMonthsAgo && itemDate <= now;
        });
        break;

      case "Last 6 Months":
        const sixMonthsAgo = new Date(now);
        sixMonthsAgo.setMonth(now.getMonth() - 6); // Subtract 6 months from the current date
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return itemDate >= sixMonthsAgo && itemDate <= now;
        });
        break;

      case "Last Year":
        const lastYear = new Date(now);
        lastYear.setFullYear(now.getFullYear() - 1); // Subtract 1 year from the current date
        filteredData = tableData.filter((item) => {
          const itemDate = new Date(item.dateTime);
          return itemDate.getFullYear() === lastYear.getFullYear();
        });
        break;

      default:
        filteredData = tableData;
    }

    // Apply sort after filter
    if (sortColumn) {
      filteredData = sortData(filteredData, sortColumn, sortDirection);
    }

    setTableData(filteredData); // Update table with filtered and sorted data
  };

  // Sorting function
  const handleSort = (column: keyof TableData) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    const sortedData = [...tableData].sort((a, b) => {
      if (column === "recentSearch") {
        // Case-insensitive comparison for recent searches
        const valueA = a[column].toLowerCase();
        const valueB = b[column].toLowerCase();
        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
      } else if (column === "dateTime") {
        // Date comparison for the dateTime column
        const dateA = new Date(a[column]);
        const dateB = new Date(b[column]);
        if (dateA < dateB) return direction === "asc" ? -1 : 1;
        if (dateA > dateB) return direction === "asc" ? 1 : -1;
        return 0;
      } else {
        // Default comparison for other columns
        if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
        if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    });

    setSortColumn(column);
    setSortDirection(direction);
    setTableData(sortedData);
  };

  function handleViewAll() {}

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg">
          {/* Sidebar content if needed */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 pt-20 bg-gray-100">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Total Users"
            value="4,099"
            trend="↑ 8.5%"
            trendType="up"
            iconSrc="/icons/Icon.svg"
            iconWidth={150}
            iconHeight={150}
            className="h-8 w-8"
          />
          <Card
            title="Total Searches"
            value="89,000"
            trend="↓ 4.3%"
            trendType="down"
            iconSrc="/icons/reshape.svg"
            iconWidth={150}
            iconHeight={150}
            className="h-8 w-8"
          />
          <Card
            title="Total Matches"
            value="2,040"
            trend="↑ 1.8%"
            trendType="up"
            iconSrc="/icons/combineshape.svg"
            iconWidth={150}
            iconHeight={150}
            className="h-8 w-8"
          />
        </div>

        {/* Recent Searches Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Searches
            </h3>
            <div className="relative flex items-center space-x-4">
              {/* Dropdown Button */}
              <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center shadow-sm hover:bg-green-600 hover:text-white"
                onClick={toggleDropdown}
              >
                <FaClock className="mr-2" />
                {selectedFilter} <FaChevronDown className="ml-2" />
              </button>

              {/* View All Button */}
              <button
                className="bg-gray-100 text-green-500 px-4 py-2 rounded-lg shadow-sm hover:bg-green-600 hover:text-white"
                onClick={handleViewAll}
              >
                View All
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 w-40">
                  <ul className="py-2">
                    {[
                      "Today",
                      "Yesterday",
                      "Two Weeks Ago",
                      "Last Month",
                      "Two Months Ago",
                    ].map((filter) => (
                      <li
                        key={filter}
                        onClick={() => handleFilterSelect(filter)}
                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      >
                        {filter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("user")}
                  >
                    User
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("recentSearch")}
                  >
                    Recent Search
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("dateTime")}
                  >
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.recentSearch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.dateTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
