import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Navbar from "./Navbar";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const durationOptions = {
  '1': '1 Day',
  '7': '7 Days',
  '30': '1 Month',
};

const ETHPriceChart = () => {
  const [chartData, setChartData] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [duration, setDuration] = useState("7");

  const fetchData = async (selectedDuration) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${selectedDuration}`
      );
      const json = await res.json();

      const labels = json.prices.map(([timestamp]) =>
        selectedDuration === "1"
          ? new Date(timestamp).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : new Date(timestamp).toLocaleDateString("en-GB")
      );

      const dataPoints = json.prices.map(([, price]) =>
        parseFloat(price.toFixed(2))
      );

      const firstPrice = dataPoints[0];
      const lastPrice = dataPoints[dataPoints.length - 1];
      const change = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2);

      setPriceChange(change);
      setCurrentPrice(lastPrice);

      setChartData({
        labels,
        datasets: [
          {
            label: "ETH Price (USD)",
            data: dataPoints,
            borderColor: "#4f46e5",
            backgroundColor: "rgba(79, 70, 229, 0.1)",
            tension: 0.3,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      });
    } catch (err) {
      console.error("Failed to fetch chart data:", err);
    }
  };

  useEffect(() => {
    fetchData(duration); 
    const interval = setInterval(() => fetchData(duration), 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [duration]);

  if (!chartData || currentPrice === null || priceChange === null)
    return <p className="text-white">Loading...</p>;

  return (
    <>
    <Navbar />
    <div className="w-full bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">
          Ethereum Price ({durationOptions[duration]})
        </h2>
        <select
          className="border border-gray-300 rounded px-3 py-1 text-sm"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          {Object.entries(durationOptions).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="h-80">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  callback: (value) => `$${value}`,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>

      <div className="mt-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <div className="text-lg text-gray-700">
          {priceChange >= 0 ? (
            <span className="text-green-600">
              🔼 +{priceChange}% increase
            </span>
          ) : (
            <span className="text-red-600">
              🔻 {priceChange}% decrease
            </span>
          )}
        </div>
        <div className="text-lg font-semibold text-black">
          💰 1 ETH = ${currentPrice}
        </div>
      </div>
    </div>
    </>
  );
};

export default ETHPriceChart;
