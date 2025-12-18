<script setup lang="ts">
import { RouterView, RouterLink, useRoute, useRouter } from "vue-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  FileText,
} from "lucide-vue-next";
import { ref } from "vue";
import { useToastStore } from "../stores/toast";

const toast = useToastStore();

const router = useRouter();
const route = useRoute();
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLogout = () => {
  localStorage.removeItem("admin_token");
  toast.success("ออกจากระบบเรียบร้อยแล้ว");
  router.push("/");
};

const menuItems = [
  { name: "แดชบอร์ด", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "สินค้า", path: "/admin/products", icon: Package },
  { name: "คำสั่งซื้อ", path: "/admin/orders", icon: ShoppingCart },
  { name: "ใบเสนอราคา", path: "/admin/quotations", icon: FileText },
  { name: "ตั้งค่า", path: "/admin/settings", icon: Settings },
];
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside
      class="bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-20 md:relative"
      :class="isSidebarOpen ? 'w-72' : 'w-0 md:w-20 overflow-hidden'"
    >
      <div
        class="p-6 flex items-center justify-between h-20 border-b border-slate-800/50"
      >
        <div
          class="flex items-center gap-3 font-black text-xl text-white truncate"
          v-if="isSidebarOpen"
        >
          <div
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-indigo shrink-0"
          >
            C
          </div>
          Admin <span class="text-primary-light">Hub</span>
        </div>
        <div v-else class="mx-auto">
          <div
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-indigo"
          >
            C
          </div>
        </div>
      </div>

      <nav class="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group"
          :class="
            route.path.startsWith(item.path)
              ? 'bg-primary text-white shadow-indigo scale-[1.02]'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          "
        >
          <component
            :is="item.icon"
            class="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110"
          />
          <span
            class="whitespace-nowrap font-bold transition-all duration-300"
            :class="isSidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'"
          >
            {{ item.name }}
          </span>
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-slate-800/50">
        <button
          @click="handleLogout"
          class="flex items-center gap-4 px-4 py-4 w-full text-left text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 rounded-xl transition-all duration-300 cursor-pointer font-bold group"
        >
          <LogOut
            class="w-5 h-5 transition-transform group-hover:-translate-x-1"
          />
          <span v-if="isSidebarOpen">ออกจากระบบ</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 bg-slate-50">
      <!-- Header -->
      <header
        class="glass h-20 flex items-center justify-between px-8 sticky top-0 z-10"
      >
        <button
          @click="toggleSidebar"
          class="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-primary cursor-pointer"
        >
          <Menu class="w-6 h-6" />
        </button>

        <div class="flex items-center gap-6">
          <div class="text-right hidden sm:block">
            <p class="font-black text-sm text-slate-900 leading-none mb-1">
              Super Admin
            </p>
            <p class="text-xs text-slate-500 font-medium tracking-tight">
              admin@chemcorp.com
            </p>
          </div>
          <div
            class="w-11 h-11 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center text-white font-black shadow-indigo transform hover:rotate-3 transition-transform cursor-pointer"
          >
            S
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-8 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
