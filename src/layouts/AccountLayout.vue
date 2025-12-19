<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { User, Shield, Bell, CreditCard, LogOut } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const menuItems = [
  { name: "ข้อมูลส่วนตัว", path: "/profile", icon: User },
  { name: "การซื้อของฉัน", path: "/orders", icon: CreditCard },
  { name: "การแจ้งเตือน", path: "#", icon: Bell, disabled: true },
  { name: "ความปลอดภัย", path: "#", icon: Shield, disabled: true },
];

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 py-16 font-sans border-t border-slate-100"
  >
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:w-1/4">
          <div
            class="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-4 sticky top-24"
          >
            <div class="p-6 text-center border-b border-slate-50 mb-4">
              <div class="relative inline-block group mb-4">
                <div
                  class="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-indigo group-hover:rotate-6 transition-all duration-500"
                >
                  {{ authStore.user?.name.charAt(0).toUpperCase() }}
                </div>
                <div
                  class="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <User class="w-5 h-5" />
                </div>
              </div>
              <h1 class="text-xl font-black text-slate-900">
                {{ authStore.user?.name }}
              </h1>
              <p class="text-slate-500 text-sm font-medium">
                สมาชิกระดับ Silver
              </p>
            </div>

            <nav class="space-y-1">
              <template v-for="item in menuItems" :key="item.name">
                <RouterLink
                  v-if="!item.disabled"
                  :to="item.path"
                  :class="[
                    isActive(item.path)
                      ? 'bg-primary/5 text-primary'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-primary',
                    'w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all cursor-pointer',
                  ]"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                  {{ item.name }}
                </RouterLink>
                <div
                  v-else
                  class="w-full flex items-center gap-3 px-6 py-4 text-slate-300 rounded-2xl font-bold cursor-not-allowed opacity-60"
                  :title="item.name + ' จะพร้อมใช้งานเร็วๆ นี้'"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                  {{ item.name }}
                </div>
              </template>
            </nav>

            <div class="mt-8 pt-8 border-t border-slate-50 px-2">
              <button
                @click="handleLogout"
                class="w-full py-4 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut class="w-5 h-5" />
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:flex-1">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-premium {
  box-shadow: 0 10px 50px -10px rgba(0, 0, 0, 0.04);
}
</style>
