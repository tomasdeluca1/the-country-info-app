'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PopulationChart({ populationData }) {
  const { theme } = useTheme();

  const chartData = {
    labels: populationData.map((item) => item.year),
    datasets: [
      {
        label: 'Population',
        data: populationData.map((item) => item.value),
        borderColor:
          theme === 'dracula' ? 'rgb(255, 122, 198)' : 'rgb(59, 130, 246)',
        backgroundColor:
          theme === 'dracula'
            ? 'rgba(255, 122, 198, 0.5)'
            : 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Population Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Population',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  };

  return (
    <motion.div
      className="w-full h-64"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Line data={chartData} options={options} />
    </motion.div>
  );
}

export default PopulationChart;
