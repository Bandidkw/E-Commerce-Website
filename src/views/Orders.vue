<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import {
  Package,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
} from "lucide-vue-next";
import StatusBadge from "../components/common/StatusBadge.vue";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return Clock;
    case "completed":
      return CheckCircle2;
    case "shipping":
      return Truck;
    default:
      return Package;
  }
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <!-- Orders Header Summary -->
    <div
      class="bg-white px-8 py-6 rounded-[2rem] shadow-premium border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div>
        <h2 class="text-2xl font-black text-slate-900 tracking-tight">
          ประวัติการสั่งซื้อ
        </h2>
        <p class="text-slate-500 font-medium text-sm">
          ตรวจสอบและติดตามสถานะการสั่งซื้อทั้งหมดของคุณ
        </p>
      </div>
      <div
        class="flex items-center gap-4 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100"
      >
        <div
          class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"
        >
          <ShoppingBag class="w-5 h-5" />
        </div>
        <div>
          <p class="text-xl font-black text-slate-900 leading-none">
            {{ authStore.orderHistory.length }}
          </p>
          <p
            class="text-[10px] font-bold text-slate-400 uppercase tracking-wider"
          >
            รายการทั้งหมด
          </p>
        </div>
      </div>
    </div>

    <!-- Orders List -->
    <div v-if="authStore.orderHistory.length > 0" class="space-y-6">
      <div
        v-for="order in authStore.orderHistory"
        :key="order.id"
        class="group bg-white rounded-[2.5rem] shadow-premium hover:shadow-premium-xl border border-slate-100 transition-all duration-500 overflow-hidden"
      >
        <!-- Order Summary Header -->
        <div
          class="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30"
        >
          <div class="flex items-start gap-5">
            <div
              class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-indigo border border-slate-100 group-hover:scale-110 transition-transform duration-500"
            >
              <component :is="getStatusIcon(order.status)" class="w-7 h-7" />
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                  >อ้างอิง</span
                >
                <span
                  class="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md"
                  >#{{ order.id }}</span
                >
              </div>
              <h3 class="text-lg font-black text-slate-900 mb-1">
                {{ formatDate(order.date) }}
              </h3>
              <div class="flex items-center gap-2">
                <StatusBadge :status="order.status" type="order" />
                <span class="w-1 h-1 bg-slate-200 rounded-full"></span>
                <p class="text-slate-500 font-bold text-xs">
                  {{ order.items.length }} รายการสินค้า
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:items-end justify-center">
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1"
            >
              ยอดรวมสุทธิ
            </p>
            <p class="text-3xl font-black text-primary tracking-tight">
              ฿{{ order.total.toLocaleString() }}
            </p>
          </div>
        </div>

        <!-- Order Items Preview -->
        <div class="px-8 py-6 border-t border-slate-50">
          <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex-shrink-0 w-16 h-16 bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm group/item relative"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
              />
              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center"
              >
                <span class="text-white text-[10px] font-black"
                  >x{{ item.quantity }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Order Footer Actions -->
        <div
          class="px-8 py-5 bg-slate-50/50 flex items-center justify-between border-t border-slate-100"
        >
          <p class="text-slate-400 text-[10px] font-bold italic">
            * ราคาสุทธิรวมภาษีมูลค่าเพิ่มแล้ว
          </p>
          <button
            class="flex items-center gap-2 text-primary text-sm font-black hover:gap-3 transition-all cursor-pointer"
          >
            ดูรายละเอียด
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-20 bg-white rounded-[2.5rem] shadow-premium border border-slate-100 px-6"
    >
      <div
        class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-white"
      >
        <ShoppingBag class="w-12 h-12 text-slate-200" />
      </div>
      <h2 class="text-2xl font-black text-slate-900 mb-3">
        ยังไม่มีประวัติการสั่งซื้อ
      </h2>
      <p class="text-slate-500 font-medium max-w-sm mx-auto mb-8 text-sm">
        เริ่มต้นช้อปปิ้งเพื่อสะสมประวัติการสั่งซื้อของคุณได้ที่หน้าร้านค้า
      </p>
      <RouterLink
        to="/products"
        class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black hover:bg-primary-dark transition-all shadow-indigo hover:shadow-indigo-lg hover:-translate-y-1 active:scale-95"
      >
        <ShoppingBag class="w-5 h-5" />
        เริ่มต้นช้อปปิ้ง
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.shadow-premium {
  box-shadow: 0 10px 50px -10px rgba(0, 0, 0, 0.04);
}
.shadow-premium-xl {
  box-shadow: 0 25px 70px -15px rgba(0, 0, 0, 0.08);
}
</style>
