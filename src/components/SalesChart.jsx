import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesBarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [5000, 7000, 6500, 8000, 9000, 10000],
        backgroundColor: "#6078ec",
        borderRadius: 15, // Makes bars rounded
        barPercentage: 0.3, // Adjusts individual bar width (0 to 1)
        categoryPercentage: 0.7,
      },
    ],
    chart: {
      type: "column",
      width: 100, // Set smaller width
      height: 100, // Set smaller height
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesBarChart;
