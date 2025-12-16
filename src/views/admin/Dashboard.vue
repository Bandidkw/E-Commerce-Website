<script setup lang="ts">
import { ref } from "vue";
import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowRight,
} from "lucide-vue-next";

const stats = ref([
  {
    title: "ยอดขายรวม",
    value: "฿435,750",
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-100",
  },
  {
    title: "คำสั่งซื้อรวม",
    value: "156",
    icon: ShoppingBag,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    title: "ลูกค้าที่ใช้งานอยู่",
    value: "89",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-100",
  },
  {
    title: "สินค้าใกล้หมด",
    value: "3",
    icon: AlertTriangle,
    color: "text-orange-500",
    bg: "bg-orange-100",
  },
]);

const recentOrders = ref([
  {
    id: 1001,
    customer: "สมชาย ใจดี",
    date: "2024-03-15",
    total: 1250.0,
    status: "เสร็จสมบูรณ์",
  },
  {
    id: 1002,
    customer: "สมหญิง รักดี",
    date: "2024-03-14",
    total: 850.5,
    status: "กำลังดำเนินการ",
  },
  {
    id: 1003,
    customer: "บจก. เอซีมี",
    date: "2024-03-14",
    total: 5400.0,
    status: "จัดส่งแล้ว",
  },
  {
    id: 1004,
    customer: "เทค โซลูชั่นส์",
    date: "2024-03-13",
    total: 2100.0,
    status: "รอดำเนินการ",
  },
  {
    id: 1005,
    customer: "โกลบอล เทรดเดอร์ส",
    date: "2024-03-12",
    total: 3200.0,
    status: "เสร็จสมบูรณ์",
  },
]);

const getStatusColor = (status: string) => {
  switch (status) {
    case "เสร็จสมบูรณ์":
      return "bg-green-100 text-green-700";
    case "กำลังดำเนินการ":
      return "bg-blue-100 text-blue-700";
    case "จัดส่งแล้ว":
      return "bg-purple-100 text-purple-700";
    case "รอดำเนินการ":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
</script>

<template>
  <div>
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <h1 class="text-2xl font-bold">ภาพรวมแดชบอร์ด</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4"
      >
        <div
          :class="`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`"
        >
          <component :is="stat.icon" :class="`w-6 h-6 ${stat.color}`" />
        </div>
        <div>
          <p class="text-gray-500 text-sm">{{ stat.title }}</p>
          <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        class="p-6 border-b border-gray-100 flex items-center justify-between"
      >
        <h2 class="text-lg font-bold">คำสั่งซื้อล่าสุด</h2>
        <RouterLink
          to="/admin/orders"
          class="text-primary hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
        >
          ดูทั้งหมด
          <ArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead
            class="bg-gray-50 text-gray-600 font-medium border-b border-gray-100"
          >
            <tr>
              <th class="p-4">รหัสคำสั่งซื้อ</th>
              <th class="p-4">ลูกค้า</th>
              <th class="p-4">วันที่</th>
              <th class="p-4">ยอดรวม</th>
              <th class="p-4">สถานะ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="order in recentOrders"
              :key="order.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="p-4 font-medium text-gray-900">#{{ order.id }}</td>
              <td class="p-4 text-gray-600">{{ order.customer }}</td>
              <td class="p-4 text-gray-500">{{ order.date }}</td>
              <td class="p-4 font-bold text-dark">
                ฿{{ order.total.toFixed(2) }}
              </td>
              <td class="p-4">
                <span
                  :class="`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                    order.status
                  )}`"
                >
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
