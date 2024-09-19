import React from "react";

const StatsGrid = ({ stats }) => {
  const labels = [
    "Invoice Generated",
    "Total Orders",
    "Amount of Price Sold",
    "Average Discount Rate",
    "Average Tax Rate",
    "Discounted Amount",
  ];

  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 p-4 text-black sm:grid-cols-3 sm:p-8 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-3xl font-extrabold text-black">{stat}</dt>
          <dd className="text-blue-500">{labels[index]}</dd>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
