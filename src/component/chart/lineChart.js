import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = (userData) => {
  console.log("🚀 ~ file: lineChart.js:25 ~ LineChart ~ userData", userData);
  if (userData) {
    const options = {
      responsive: true,
      plugins: {
        lengend: { position: "top" },
        title: {
          display: true,
          text: "User Monthly Chart",
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
          label: "Number of registered users",

          data: userData.userData.map((rows) => rows.numOfUser),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    return (
      <div>
        <Line options={options} data={data} />
      </div>
    );
  }
};

export default LineChart;
