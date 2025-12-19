<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { Package, Mail, Calendar, ChevronRight } from "lucide-vue-next";
import StatusBadge from "../components/common/StatusBadge.vue";

const authStore = useAuthStore();

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-16">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar: User Info -->
        <div class="lg:w-1/3">
          <div
            class="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-8 sticky top-24"
          >
            <div class="text-center mb-8">
              <div
                class="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-indigo mx-auto mb-6 transform hover:rotate-6 transition-transform"
              >
                {{ authStore.user?.name.charAt(0).toUpperCase() }}
              </div>
              <h1 class="text-2xl font-black text-slate-900">
                {{ authStore.user?.name }}
              </h1>
              <p class="text-slate-500 font-medium">
                ลูกค้าคนสำคัญของ ChemCorp
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div
                  class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm"
                >
                  <Mail class="w-5 h-5" />
                </div>
                <div>
                  <p
                    class="text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >
                    อีเมล
                  </p>
                  <p class="text-slate-900 font-bold">
                    {{ authStore.user?.email }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div
                  class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm"
                >
                  <Calendar class="w-5 h-5" />
                </div>
                <div>
                  <p
                    class="text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >
                    สมาชิกตั้งแต่
                  </p>
                  <p class="text-slate-900 font-bold">
                    {{ formatDate(new Date().toISOString()) }}
                  </p>
                </div>
              </div>
            </div>

            <button
              @click="authStore.logout()"
              class="w-full mt-8 py-4 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        <!-- Main Content: Order History -->
        <div class="lg:w-2/3">
          <div
            class="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden"
          >
            <div
              class="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-indigo"
                >
                  <Package class="w-6 h-6" />
                </div>
                <div>
                  <h2 class="text-2xl font-black text-slate-900">
                    ประวัติการสั่งซื้อ
                  </h2>
                  <p class="text-slate-500 font-medium text-sm">
                    ตรวจสอบและติดตามคำสั่งซื้อของคุณ
                  </p>
                </div>
              </div>
              <span
                class="bg-white px-4 py-2 rounded-xl border border-slate-100 text-slate-900 font-black shadow-sm"
              >
                {{ authStore.orderHistory.length }} รายการ
              </span>
            </div>

            <div class="p-8">
              <div
                v-if="authStore.orderHistory.length === 0"
                class="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200"
              >
                <div
                  class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"
                >
                  <Package class="w-10 h-10 text-slate-300" />
                </div>
                <h3 class="text-xl font-black text-slate-900 mb-2">
                  ยังไม่มีประวัติการสั่งซื้อ
                </h3>
                <p class="text-slate-500 font-medium mb-8">
                  เริ่มช้อปปิ้งเพื่อสะสมประวัติการสั่งซื้อของคุณ
                </p>
                <RouterLink
                  to="/products"
                  class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-indigo hover:shadow-indigo-lg hover:-translate-y-1"
                >
                  ไปที่หน้าร้านค้า
                  <ChevronRight class="w-5 h-5" />
                </RouterLink>
              </div>

              <div v-else class="space-y-6">
                <div
                  v-for="order in authStore.orderHistory"
                  :key="order.id"
                  class="group bg-white border border-slate-100 rounded-[2rem] hover:shadow-premium-lg transition-all duration-500 overflow-hidden"
                >
                  <div
                    class="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50"
                  >
                    <div class="flex items-center gap-6">
                      <div
                        class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        <Package class="w-8 h-8" />
                      </div>
                      <div>
                        <p
                          class="text-sm font-bold text-slate-400 tracking-wider uppercase mb-1"
                        >
                          เลขที่คำสั่งซื้อ
                        </p>
                        <h4 class="text-xl font-black text-slate-900">
                          #{{ order.id }}
                        </h4>
                        <p class="text-slate-500 font-medium text-sm">
                          {{ formatDate(order.date) }}
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-2">
                      <StatusBadge :status="order.status" type="order" />
                      <p class="text-2xl font-black text-primary">
                        ฿{{ order.total.toLocaleString() }}
                      </p>
                    </div>
                  </div>

                  <div class="px-8 py-6 bg-slate-50/50">
                    <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      <div
                        v-for="item in order.items"
                        :key="item.id"
                        class="flex-shrink-0 w-16 h-16 bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm"
                      >
                        <img
                          :src="item.image"
                          :alt="item.name"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
