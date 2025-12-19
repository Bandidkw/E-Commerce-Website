<script setup lang="ts">
import { ref } from "vue";
import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowRight,
} from "lucide-vue-next";
import SalesTrendChart from "../../components/admin/charts/SalesTrendChart.vue";
import CategoryDistributionChart from "../../components/admin/charts/CategoryDistributionChart.vue";

const stats = ref([
  {
    title: "ยอดขายรวม",
    value: "฿435,750",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    trend: "+12.5% vs last month",
  },
  {
    title: "คำสั่งซื้อรวม",
    value: "156",
    icon: ShoppingBag,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    trend: "+5 new today",
  },
  {
    title: "ลูกค้าที่ใช้งานอยู่",
    value: "89",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    trend: "24 online now",
  },
  {
    title: "สินค้าใกล้หมด",
    value: "3",
    icon: AlertTriangle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
    trend: "Requires attention",
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
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "กำลังดำเนินการ":
      return "bg-primary/10 text-primary border-primary/20";
    case "จัดส่งแล้ว":
      return "bg-indigo-50 text-indigo-700 border-indigo-100";
    case "รอดำเนินการ":
      return "bg-amber-50 text-amber-700 border-amber-100";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};
</script>

<template>
  <div class="space-y-10">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-black text-slate-900 mb-1">
          ยินดีต้อนรับกลับมา <span class="text-primary">Admin</span>
        </h1>
        <p class="text-slate-500 font-medium">
          นี่คือภาพรวมความเคลื่อนไหวล่าสุดของคุณในวันนี้
        </p>
      </div>
      <div class="flex gap-3">
        <button
          class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          ดาวน์โหลดรายงาน
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100 hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1 group"
      >
        <div class="flex items-start justify-between mb-8">
          <div
            :class="`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${stat.bg} ${stat.border}`"
          >
            <component :is="stat.icon" :class="`w-7 h-7 ${stat.color}`" />
          </div>
          <span
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >{{ stat.trend }}</span
          >
        </div>
        <div>
          <p
            class="text-slate-500 text-xs font-black uppercase tracking-widest mb-1"
          >
            {{ stat.title }}
          </p>
          <p class="text-3xl font-black text-slate-900 tracking-tight">
            {{ stat.value }}
          </p>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Sales Trend Chart -->
      <div
        class="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100"
      >
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl font-black text-slate-900">ยอดขายในรอบ 7 วัน</h3>
            <p class="text-sm text-slate-500 font-medium">
              สรุปแนวโน้มรายได้รายสัปดาห์
            </p>
          </div>
          <div class="flex gap-2">
            <span
              class="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg border border-emerald-100"
            >
              +12.5% สูงขึ้น
            </span>
          </div>
        </div>
        <SalesTrendChart />
      </div>

      <!-- Category Distribution Chart -->
      <div
        class="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100"
      >
        <div class="mb-8">
          <h3 class="text-xl font-black text-slate-900">
            สัดส่วนยอดขายตามหมวดหมู่
          </h3>
          <p class="text-sm text-slate-500 font-medium">
            แบ่งตามประเภทสินค้าหลัก
          </p>
        </div>
        <CategoryDistributionChart />
      </div>
    </div>

    <div
      class="bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden"
    >
      <div
        class="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50"
      >
        <div>
          <h2 class="text-xl font-black text-slate-900">คำสั่งซื้อล่าสุด</h2>
          <p class="text-sm text-slate-500 font-medium">
            ตรวจสอบรายการและสถานะการสั่งซื้อล่าสุด
          </p>
        </div>
        <RouterLink
          to="/admin/orders"
          class="px-5 py-2.5 bg-white border border-slate-200 text-primary hover:bg-primary/5 rounded-xl text-sm font-black transition-all flex items-center gap-2 group"
        >
          ดูทั้งหมด
          <ArrowRight
            class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          />
        </RouterLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead
            class="bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest border-b border-slate-50"
          >
            <tr>
              <th class="px-8 py-5">รหัสคำสั่งซื้อ</th>
              <th class="px-8 py-5">ลูกค้า</th>
              <th class="px-8 py-5">วันที่</th>
              <th class="px-8 py-5 text-right">ยอดรวม</th>
              <th class="px-8 py-5">สถานะ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr
              v-for="order in recentOrders"
              :key="order.id"
              class="hover:bg-slate-50/50 transition-colors group"
            >
              <td class="px-8 py-6 font-black text-slate-900">
                #{{ order.id }}
              </td>
              <td class="px-8 py-6">
                <div class="text-sm font-bold text-slate-700">
                  {{ order.customer }}
                </div>
              </td>
              <td class="px-8 py-6 text-sm font-medium text-slate-500">
                {{ order.date }}
              </td>
              <td class="px-8 py-6 font-black text-slate-900 text-right">
                ฿{{ order.total.toLocaleString() }}
              </td>
              <td class="px-8 py-6">
                <span
                  :class="`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusColor(
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
