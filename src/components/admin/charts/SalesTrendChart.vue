<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartData = {
  labels: ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."],
  datasets: [
    {
      label: "ยอดขาย (บาท)",
      data: [35000, 42000, 38000, 52000, 48000, 65000, 72000],
      borderColor: "#0F52FF", // primary
      backgroundColor: "rgba(15, 82, 255, 0.1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#0F52FF",
      pointHoverRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1e293b",
      padding: 12,
      bodyFont: {
        family: "'Inter', sans-serif",
        size: 14,
      },
      titleFont: {
        family: "'Inter', sans-serif",
        size: 12,
        weight: "bold" as const,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.05)",
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 10,
        },
        callback: (value: any) => "฿" + value.toLocaleString(),
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 10,
        },
      },
    },
  },
};
</script>

<template>
  <div class="h-[300px] w-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
