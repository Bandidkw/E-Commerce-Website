<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { Menu, X, ShoppingBag, Search, User } from "lucide-vue-next";
import { ref } from "vue";
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();
const router = useRouter();
const searchQuery = ref("");
const isMenuOpen = ref(false);

const emit = defineEmits<{
  (e: "open-login"): void;
}>();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/products", query: { search: searchQuery.value } });
    searchQuery.value = "";
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header class="glass sticky top-0 z-50">
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="text-2xl font-black text-slate-900 flex items-center gap-3 group"
        >
          <div
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-indigo group-hover:scale-110 transition-transform duration-500"
          >
            C
          </div>
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light"
            >ChemCorp</span
          >
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <!-- Search Bar -->
          <div class="relative hidden lg:block group">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="ค้นหาสินค้า..."
              class="pl-11 pr-4 py-2.5 bg-slate-100/50 border border-transparent focus:border-primary/20 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 w-64 transition-all duration-300"
            />
            <Search
              class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer group-hover:text-primary transition-colors"
              @click="handleSearch"
            />
          </div>

          <RouterLink
            to="/"
            class="text-slate-600 hover:text-primary font-semibold transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >หน้าแรก</RouterLink
          >
          <RouterLink
            to="/about"
            class="text-slate-600 hover:text-primary font-semibold transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >เกี่ยวกับเรา</RouterLink
          >
          <RouterLink
            to="/products"
            class="text-slate-600 hover:text-primary font-semibold transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >สินค้า</RouterLink
          >
          <RouterLink
            to="/downloads"
            class="text-slate-600 hover:text-primary font-semibold transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >ดาวน์โหลด</RouterLink
          >
          <RouterLink
            to="/blog"
            class="text-slate-600 hover:text-primary font-semibold transition-smooth relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >บทความ</RouterLink
          >
          <RouterLink
            to="/contact"
            class="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 font-bold shadow-indigo hover:shadow-lg hover:-translate-y-0.5"
            >ติดต่อเรา</RouterLink
          >

          <!-- Cart Button -->
          <button
            @click="cartStore.toggleCart"
            class="relative text-slate-600 hover:text-primary transition-smooth hover-lift cursor-pointer p-2 rounded-xl hover:bg-primary/5"
          >
            <ShoppingBag class="w-6 h-6" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute top-0 right-0 bg-accent text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- Admin Login Button (Desktop) -->
          <button
            @click="emit('open-login')"
            class="text-slate-600 hover:text-primary transition-smooth hover-lift cursor-pointer p-2 rounded-xl hover:bg-primary/5"
            title="เข้าสู่ระบบแอดมิน"
          >
            <User class="w-6 h-6" />
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

          <!-- Admin Login Button (Mobile Header) -->
          <button
            @click="emit('open-login')"
            class="text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            <User class="w-6 h-6" />
          </button>

          <!-- Mobile Menu Button -->
          <button @click="toggleMenu" class="text-gray-600 hover:text-primary">
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
</template>
