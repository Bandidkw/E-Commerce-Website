<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import StatusBadge from "../../components/common/StatusBadge.vue";

// Mock Orders
const orders = ref([
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
  {
    id: 1006,
    customer: "ธุรกิจขนาดย่อม",
    date: "2024-03-11",
    total: 150.0,
    status: "กำลังดำเนินการ",
  },
]);

const searchQuery = ref("");
const statusFilter = ref("All");
const currentPage = ref(1);
const itemsPerPage = 5;

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.id.toString().includes(searchQuery.value);
    const matchesStatus =
      statusFilter.value === "All" || order.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage);
});

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredOrders.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watch([searchQuery, statusFilter], () => {
  currentPage.value = 1;
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">คำสั่งซื้อ</h1>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <!-- Search and Filter -->
      <div class="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
        <div
          class="flex-grow flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg"
        >
          <Search class="w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาคำสั่งซื้อ..."
            class="flex-grow bg-transparent outline-none text-gray-600"
          />
        </div>
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <select
            v-model="statusFilter"
            class="bg-gray-50 border-none outline-none text-gray-600 py-2 px-4 rounded-lg cursor-pointer"
          >
            <option value="All">สถานะทั้งหมด</option>
            <option value="เสร็จสมบูรณ์">เสร็จสมบูรณ์</option>
            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
            <option value="จัดส่งแล้ว">จัดส่งแล้ว</option>
            <option value="รอดำเนินการ">รอดำเนินการ</option>
          </select>
        </div>
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
              <th class="p-4 text-right">การดำเนินการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="order in paginatedOrders"
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
                <StatusBadge :status="order.status" type="order" />
              </td>
              <td class="p-4 text-right">
                <button
                  class="p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  <Eye class="w-5 h-5" />
                </button>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="p-8 text-center text-gray-500">
                ไม่พบคำสั่งซื้อ
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="p-4 border-t border-gray-100 flex items-center justify-between"
        v-if="filteredOrders.length > 0"
      >
        <div class="text-sm text-gray-500">
          แสดง {{ (currentPage - 1) * itemsPerPage + 1 }} ถึง
          {{ Math.min(currentPage * itemsPerPage, filteredOrders.length) }} จาก
          {{ filteredOrders.length }} รายการ
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft class="w-5 h-5 text-gray-600" />
          </button>
          <span class="text-sm font-medium text-gray-700">
            หน้า {{ currentPage }} จาก {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
