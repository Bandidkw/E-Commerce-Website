<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from "vue-router";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Search,
} from "lucide-vue-next";
import { ref } from "vue";
import { useCartStore } from "../stores/cart";
import CartDrawer from "../components/CartDrawer.vue";
import LoginModal from "../components/LoginModal.vue";

const cartStore = useCartStore();
const router = useRouter();
const searchQuery = ref("");
const isMenuOpen = ref(false);
const loginModalRef = ref<InstanceType<typeof LoginModal>>();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/products", query: { search: searchQuery.value } });
    searchQuery.value = "";
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const openLoginModal = () => {
  loginModalRef.value?.openModal();
};
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans text-dark">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <RouterLink
            to="/"
            class="text-2xl font-bold text-primary flex items-center gap-2"
          >
            <div
              class="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white"
            >
              C
            </div>
            ChemCorp
          </RouterLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8">
            <!-- Search Bar -->
            <div class="relative hidden lg:block">
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="ค้นหาสินค้า..."
                class="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64 transition-all"
              />
              <Search
                class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                @click="handleSearch"
              />
            </div>

            <RouterLink
              to="/"
              class="text-gray-600 hover:text-primary font-medium transition-colors"
              >หน้าแรก</RouterLink
            >
            <RouterLink
              to="/about"
              class="text-gray-600 hover:text-primary font-medium transition-colors"
              >เกี่ยวกับเรา</RouterLink
            >
            <RouterLink
              to="/products"
              class="text-gray-600 hover:text-primary font-medium transition-colors"
              >สินค้า</RouterLink
            >
            <RouterLink
              to="/downloads"
              class="text-gray-600 hover:text-primary font-medium transition-colors"
              >ดาวน์โหลด</RouterLink
            >
            <RouterLink
              to="/blog"
              class="text-gray-600 hover:text-primary font-medium transition-colors"
              >บทความ</RouterLink
            >
            <RouterLink
              to="/contact"
              class="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >ติดต่อเรา</RouterLink
            >

            <!-- Cart Button -->
            <button
              @click="cartStore.toggleCart"
              class="relative text-gray-600 hover:text-primary transition-colors cursor-pointer"
            >
              <ShoppingBag class="w-6 h-6" />
              <span
                v-if="cartStore.itemCount > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {{ cartStore.itemCount }}
              </span>
            </button>
          </nav>

          <div class="flex items-center gap-4 md:hidden">
            <button
              @click="cartStore.toggleCart"
              class="relative text-gray-600 hover:text-primary transition-colors cursor-pointer"
            >
              <ShoppingBag class="w-6 h-6" />
              <span
                v-if="cartStore.itemCount > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {{ cartStore.itemCount }}
              </span>
            </button>

            <!-- Mobile Menu Button -->
            <button
              @click="toggleMenu"
              class="text-gray-600 hover:text-primary"
            >
              <Menu v-if="!isMenuOpen" />
              <X v-else />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg"
        >
          <div class="flex flex-col p-4 gap-4">
            <RouterLink
              to="/"
              @click="isMenuOpen = false"
              class="text-gray-600 hover:text-primary font-medium transition-colors duration-200"
              >หน้าแรก</RouterLink
            >
            <RouterLink
              to="/about"
              @click="isMenuOpen = false"
              class="text-gray-600 hover:text-primary font-medium transition-colors duration-200"
              >เกี่ยวกับเรา</RouterLink
            >
            <RouterLink
              to="/products"
              @click="isMenuOpen = false"
              class="text-gray-600 hover:text-primary font-medium transition-colors duration-200"
              >สินค้า</RouterLink
            >
            <RouterLink
              to="/downloads"
              @click="isMenuOpen = false"
              class="text-gray-600 hover:text-primary font-medium transition-colors duration-200"
              >ดาวน์โหลด</RouterLink
            >
            <RouterLink
              to="/blog"
              @click="isMenuOpen = false"
              class="text-gray-600 hover:text-primary font-medium transition-colors duration-200"
              >บทความ</RouterLink
            >
            <RouterLink
              to="/contact"
              @click="isMenuOpen = false"
              class="px-5 py-2.5 bg-primary text-white rounded-lg text-center font-medium transition-all duration-200 hover:bg-blue-700"
              >ติดต่อเรา</RouterLink
            >
          </div>
        </div>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <!-- Company Info -->
          <div>
            <div
              class="text-2xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <div
                class="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white"
              >
                C
              </div>
              ChemCorp
            </div>
            <p class="text-gray-400 mb-6">
              ผู้นำด้านการจัดจำหน่ายสารเคมีอุตสาหกรรมและโซลูชั่น
              มุ่งมั่นในคุณภาพ ความปลอดภัย และนวัตกรรม
            </p>
            <div class="flex gap-4">
              <!-- Social Icons Placeholder -->
              <div
                class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                F
              </div>
              <div
                class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                L
              </div>
              <div
                class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                Y
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-bold mb-6">ลิงก์ด่วน</h3>
            <ul class="space-y-3">
              <li>
                <RouterLink
                  to="/"
                  class="text-gray-400 hover:text-white transition-colors"
                  >หน้าแรก</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/about"
                  class="text-gray-400 hover:text-white transition-colors"
                  >เกี่ยวกับเรา</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/products"
                  class="text-gray-400 hover:text-white transition-colors"
                  >สินค้า</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/downloads"
                  class="text-gray-400 hover:text-white transition-colors"
                  >ดาวน์โหลด</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/blog"
                  class="text-gray-400 hover:text-white transition-colors"
                  >บทความ</RouterLink
                >
              </li>
            </ul>
          </div>

          <!-- Products -->
          <div>
            <h3 class="text-lg font-bold mb-6">สินค้า</h3>
            <ul class="space-y-3">
              <li>
                <RouterLink
                  to="/products"
                  class="text-gray-400 hover:text-white transition-colors"
                  >การบำบัดน้ำ</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/products"
                  class="text-gray-400 hover:text-white transition-colors"
                  >ตัวทำละลายอุตสาหกรรม</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/products"
                  class="text-gray-400 hover:text-white transition-colors"
                  >สารเจือปนอาหาร</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/products"
                  class="text-gray-400 hover:text-white transition-colors"
                  >เคมีสิ่งทอ</RouterLink
                >
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-bold mb-6">ติดต่อเรา</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <MapPin class="w-5 h-5 text-primary mt-1" />
                <span class="text-gray-400"
                  >123 นิคมอุตสาหกรรม บางนา กรุงเทพฯ 10260 ประเทศไทย</span
                >
              </li>
              <li class="flex items-center gap-3">
                <Phone class="w-5 h-5 text-primary" />
                <span class="text-gray-400">+66 2 123 4567</span>
              </li>
              <li class="flex items-center gap-3">
                <Mail class="w-5 h-5 text-primary" />
                <span class="text-gray-400">sales@chemcorp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p>
            &copy; {{ new Date().getFullYear() }} ChemCorp. All rights reserved.
          </p>
          <button
            @click="openLoginModal"
            class="hover:text-gray-400 transition-colors cursor-pointer"
          >
            เข้าสู่ระบบแอดมิน
          </button>
        </div>
      </div>
    </footer>

    <CartDrawer />
    <LoginModal ref="loginModalRef" />
  </div>
</template>
