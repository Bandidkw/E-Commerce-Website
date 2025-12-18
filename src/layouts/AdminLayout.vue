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

const router = useRouter();
const route = useRoute();
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLogout = () => {
  localStorage.removeItem("admin_token");
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
      class="bg-dark text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-20 md:relative"
      :class="isSidebarOpen ? 'w-64' : 'w-0 md:w-20 overflow-hidden'"
    >
      <div
        class="p-6 flex items-center justify-between h-20 border-b border-gray-700"
      >
        <div
          class="flex items-center gap-2 font-bold text-xl truncate"
          v-if="isSidebarOpen"
        >
          <div
            class="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white flex-shrink-0"
          >
            C
          </div>
          ChemAdmin
        </div>
        <div v-else class="mx-auto">
          <div
            class="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white"
          >
            C
          </div>
        </div>
      </div>

      <nav class="flex-1 py-6 px-3 space-y-2">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          :class="
            route.path.startsWith(item.path)
              ? 'bg-primary text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          "
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span
            class="whitespace-nowrap transition-opacity duration-300"
            :class="isSidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'"
          >
            {{ item.name }}
          </span>
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-gray-700">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut class="w-5 h-5" />
          <span v-if="isSidebarOpen">ออกจากระบบ</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <header
        class="bg-white shadow-sm h-20 flex items-center justify-between px-8 sticky top-0 z-10"
      >
        <button @click="toggleSidebar" class="text-gray-500 hover:text-dark">
          <Menu class="w-6 h-6" />
        </button>

        <div class="flex items-center gap-4">
          <div class="text-right hidden sm:block">
            <p class="font-bold text-sm text-gray-900">ผู้ดูแลระบบ</p>
            <p class="text-xs text-gray-500">admin@chemcorp.com</p>
          </div>
          <div
            class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold"
          >
            A
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
