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
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">สินค้าของเรา</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:w-1/4">
          <div class="bg-white p-6 rounded-xl shadow-sm sticky top-24">
            <div class="flex items-center gap-2 mb-6">
              <Filter class="w-5 h-5 text-primary" />
              <h2 class="text-lg font-bold">หมวดหมู่</h2>
            </div>
            <ul class="space-y-2">
              <li>
                <button
                  @click="setCategory('All')"
                  class="w-full text-left px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  :class="
                    selectedCategory === 'All'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 text-gray-600'
                  "
                >
                  สินค้าทั้งหมด
                </button>
              </li>
              <li v-for="category in categories" :key="category">
                <button
                  @click="setCategory(category)"
                  class="w-full text-left px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  :class="
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 text-gray-600'
                  "
                >
                  {{ category }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="lg:w-3/4">
          <!-- Search Bar -->
          <div
            class="bg-white p-4 rounded-xl shadow-sm mb-8 flex items-center gap-4"
          >
            <Search class="w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาสินค้า..."
              class="flex-grow outline-none text-gray-600"
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
          <div v-if="totalPages > 1" class="flex justify-center mt-12 gap-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all duration-300 cursor-pointer hover:scale-110"
              :class="
                currentPage === page
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
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
