import "./style.scss";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const RevenueStatistics = () => {
  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu",
        data: [
          120000000, 840000000, 324000000, 532000000, 737000000, 1050030000,
          924000000
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)"
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)"
        ],
        borderWidth: 1
      }
    ]
  };
  const labels1 = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: "Năm 2022",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      },
      {
        label: "Năm 2023",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1
      },
      {
        label: "Năm 2024",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1
      }
    ]
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Monthly Data Overview"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "triệu"
        },
        ticks: {
          callback: function (value) {
            return value / 1 + " triệu";
          }
        },
        grid: {
          drawTicks: false,
          drawOnChartArea: false
        }
      }
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: false,
        text: "Thống kê doanh thu"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "triệu"
        },
        ticks: {
          callback: function (value) {
            return value / 1000000 + " triệu";
          }
        },
        grid: {
          drawTicks: false,
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <h2>Thống kê Tháng</h2>
      <Bar data={data} options={options} />
      <Line data={data1} options={options1} />
    </div>
  );
};

export default RevenueStatistics;
