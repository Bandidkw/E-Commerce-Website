<script setup lang="ts">
import { ref, computed } from "vue";
import { products, categories } from "../services/mockData";
import { Search, Filter } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { watch } from "vue";
import ProductCard from "../components/ProductCard.vue";

const route = useRoute();
const selectedCategory = ref("All");
const searchQuery = ref((route.query.search as string) || "");

watch(
  () => route.query.search,
  (newSearch) => {
    searchQuery.value = (newSearch as string) || "";
  }
);
const currentPage = ref(1);
const itemsPerPage = 12;

const filteredProducts = computed(() => {
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory.value === "All" ||
      product.category === selectedCategory.value;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const setCategory = (category: string) => {
  selectedCategory.value = category;
  currentPage.value = 1;
};
</script>

<template>
  <div class="bg-slate-50 min-h-screen py-16">
    <div class="container mx-auto px-6">
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-4">
          สินค้า <span class="text-primary">ทั้งหมด</span>
        </h1>
        <p class="text-slate-500 text-lg">
          รายการเคมีภัณฑ์อุตสาหกรรมที่คัดสรรมาเพื่อคุณภาพที่เหนือกว่า
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:w-1/4">
          <div
            class="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100 sticky top-24"
          >
            <div class="flex items-center gap-3 mb-8">
              <div
                class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"
              >
                <Filter class="w-5 h-5 text-primary" />
              </div>
              <h2 class="text-xl font-black text-slate-900">ตัวกรอง</h2>
            </div>

            <div
              class="mb-4 text-xs font-black text-slate-400 uppercase tracking-widest"
            >
              หมวดหมู่สินค้า
            </div>
            <ul class="space-y-2">
              <li>
                <button
                  @click="setCategory('All')"
                  class="w-full text-left px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer font-bold"
                  :class="
                    selectedCategory === 'All'
                      ? 'bg-primary text-white shadow-indigo translate-x-1'
                      : 'hover:bg-slate-50 text-slate-600 hover:text-primary'
                  "
                >
                  <span class="flex items-center justify-between">
                    สินค้าทั้งหมด
                    <span
                      v-if="selectedCategory === 'All'"
                      class="w-1.5 h-6 bg-white/30 rounded-full"
                    ></span>
                  </span>
                </button>
              </li>
              <li v-for="category in categories" :key="category">
                <button
                  @click="setCategory(category)"
                  class="w-full text-left px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer font-bold"
                  :class="
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-indigo translate-x-1'
                      : 'hover:bg-slate-50 text-slate-600 hover:text-primary'
                  "
                >
                  <span class="flex items-center justify-between">
                    {{ category }}
                    <span
                      v-if="selectedCategory === category"
                      class="w-1.5 h-6 bg-white/30 rounded-full"
                    ></span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="lg:w-3/4">
          <!-- Search Bar -->
          <div
            class="bg-white p-2 pl-6 rounded-2xl shadow-premium border border-slate-100 mb-10 flex items-center gap-4 focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary/20 transition-all duration-300"
          >
            <Search class="w-6 h-6 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาสินค้าที่คุณต้องการ..."
              class="flex-grow py-4 outline-none text-slate-600 font-medium placeholder:text-slate-400"
            />
          </div>

          <!-- Grid -->
          <div
            v-if="paginatedProducts.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <div v-else class="text-center py-20 bg-white rounded-xl shadow-sm">
            <p class="text-gray-500 text-lg">
              ไม่พบสินค้าที่ตรงกับเงื่อนไขของคุณ
            </p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-16 gap-3">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-300 cursor-pointer hover:-translate-y-1"
              :class="
                currentPage === page
                  ? 'bg-primary text-white shadow-indigo'
                  : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
              "
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
