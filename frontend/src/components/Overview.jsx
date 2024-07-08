import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Overview = () => {
  const [count, setCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [importantTaskCount, setImportantTaskCount] = useState(0);
  const [overdueTaskCount, setOverdueTaskCount] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/task/numberoftasks",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setCount(response.data.totaltask);
      setCompletedTaskCount(response.data.completedtask);
      setImportantTaskCount(response.data.importanttask);
      setOverdueTaskCount(response.data.overduetask);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const pieData = {
    labels: ["Completed", "Not Completed", "Important", "Overdue"],
    datasets: [
      {
        data: [
          completedTaskCount,
          count - completedTaskCount,
          importantTaskCount,
          overdueTaskCount,
        ],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#42a5f5", "#ffb74d", "#ef5350"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label =
              pieData.labels[tooltipItem.dataIndex] ||
              "";
            const value =
              pieData.datasets[0].data[tooltipItem.dataIndex] || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h1 className="max-w-4xl ml-6 mt-6 text-start font-normal text-2xl text-black mb-2 md:text-xl lg:text-2xl">
        Overview
      </h1>
      <div className="ml-6 flex flex-col flex-wrap justify-between lg:flex-row gap-5 lg:gap-20 bg-white border-2 shadow-md border-gray-200 py-4 px-4 pr-32 rounded-lg ">
        <div className="flex">
          <div className="flex flex-col gap-0 p-0 m-0">
            <h1 className="text-md font-medium">Total Tasks</h1>
            <p className="text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">{count}</h1>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-0 p-0 m-0">
            <h1 className="text-md font-medium">Completed</h1>
            <p className="text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">{completedTaskCount}</h1>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-0 p-0 m-0">
            <h1 className="text-md font-medium">Not Completed</h1>
            <p className="text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">{count - completedTaskCount}</h1>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-0 p-0 m-0">
            <h1 className="text-md font-medium">Important</h1>
            <p className="text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">{importantTaskCount}</h1>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-0 p-0 m-0">
            <h1 className="text-md font-medium">Overdue</h1>
            <p className="text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">{overdueTaskCount}</h1>
          </div>
        </div>
      </div>
      <div className="mt-6 ml-6" style={{ width: "600px", height: "500px" }}>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default Overview;
