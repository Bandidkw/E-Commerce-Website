<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: [
    "เคมีอุตสาหกรรม",
    "เคมีอาหาร",
    "เคมีทำความสะอาด",
    "เครื่องบิน/เทคนิค",
  ],
  datasets: [
    {
      data: [45, 25, 20, 10],
      backgroundColor: [
        "#0F52FF", // primary
        "#10B981", // emerald
        "#F59E0B", // amber
        "#6366F1", // indigo
      ],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          family: "'Inter', sans-serif",
          size: 11,
          weight: "bold" as const,
        },
        color: "#64748b",
      },
    },
    tooltip: {
      backgroundColor: "#1e293b",
      padding: 12,
      bodyFont: {
        family: "'Inter', sans-serif",
        size: 14,
      },
    },
  },
  cutout: "70%",
};
</script>

<template>
  <div class="h-[300px] w-full">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
