import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function VerticalBarChart({ storeData, productData }) {
  console.log(
    "🚀 ~ file: verticalBarChart.js:23 ~ VerticalBarChart ~ productData",
    productData
  );
  console.log(
    "🚀 ~ file: verticalBarChart.js:23 ~ VerticalBarChart ~ storeData",
    storeData
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Store and Product Monthly Chart",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Store",
        data: storeData.map((rows) => rows.numOfStore),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Number of Product",
        data: productData.map((rows) => rows.numOfProduct),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
