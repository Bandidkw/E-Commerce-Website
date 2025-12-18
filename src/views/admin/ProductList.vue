<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useProductStore } from "../../stores/products";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import ProductModal from "../../components/admin/ProductModal.vue";
import type { Product } from "../../stores/products";
import ConfirmModal from "../../components/common/ConfirmModal.vue";
import { useToastStore } from "../../stores/toast";

const productStore = useProductStore();
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;

const isModalOpen = ref(false);
const selectedProduct = ref<Product | null>(null);

const isConfirmOpen = ref(false);
const productToDelete = ref<number | null>(null);
const toast = useToastStore();

const openAddModal = () => {
  selectedProduct.value = null;
  isModalOpen.value = true;
};

const openEditModal = (product: Product) => {
  selectedProduct.value = { ...product };
  isModalOpen.value = true;
};

const filteredProducts = computed(() => {
  return productStore.products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watch(searchQuery, () => {
  currentPage.value = 1;
});

const deleteProduct = (id: number) => {
  productToDelete.value = id;
  isConfirmOpen.value = true;
};

const confirmDelete = () => {
  if (productToDelete.value !== null) {
    productStore.deleteProduct(productToDelete.value);
    toast.success("ลบสินค้าเรียบร้อยแล้ว");
    isConfirmOpen.value = false;
    productToDelete.value = null;
  }
};
</script>

<template>
  <div>
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
    >
      <div>
        <h1 class="text-3xl font-black text-slate-900 mb-1">
          จัดการ <span class="text-primary">สินค้า</span>
        </h1>
        <p class="text-slate-500 font-medium">
          เพิ่ม แก้ไข และลบข้อมูลเคมีภัณฑ์ในระบบของคุณ
        </p>
      </div>
      <button
        @click="openAddModal"
        class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all font-black shadow-indigo hover:shadow-lg hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
      >
        <Plus class="w-5 h-5" />
        เพิ่มสินค้าใหม่
      </button>
    </div>

    <div
      class="bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden"
    >
      <!-- Search -->
      <div
        class="p-2 pl-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30"
      >
        <Search class="w-6 h-6 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหาตามชื่อสินค้า หรือหมวดหมู่..."
          class="flex-grow py-5 outline-none text-slate-600 font-bold placeholder:text-slate-400"
        />
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead
            class="bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest border-b border-slate-50"
          >
            <tr>
              <th class="px-8 py-5">รหัส</th>
              <th class="px-8 py-5">สินค้า</th>
              <th class="px-8 py-5">หมวดหมู่</th>
              <th class="px-8 py-5 text-right">ราคา</th>
              <th class="px-8 py-5 text-right">การจัดการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="hover:bg-slate-50/50 transition-colors group"
            >
              <td class="px-8 py-6 text-slate-400 font-bold">
                #{{ product.id }}
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform"
                  >
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="font-black text-slate-900">
                    {{ product.name }}
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <span
                  class="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider"
                >
                  {{ product.category }}
                </span>
              </td>
              <td class="px-8 py-6 font-black text-slate-900 text-right">
                ฿{{ product.price.toLocaleString() }}
              </td>
              <td class="px-8 py-6 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openEditModal(product)"
                    class="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="p-8 text-center text-gray-500">
                ไม่พบสินค้า
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30"
        v-if="filteredProducts.length > 0"
      >
        <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">
          แสดง {{ (currentPage - 1) * itemsPerPage + 1 }} -
          {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}
          จาก {{ filteredProducts.length }}
        </div>
        <div class="flex items-center gap-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft class="w-5 h-5 text-slate-600" />
          </button>
          <span class="text-sm font-black text-slate-900">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
          >
            <ChevronRight class="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>
    </div>
    <!-- Product Modal -->
    <ProductModal
      :is-open="isModalOpen"
      :product="selectedProduct"
      @close="isModalOpen = false"
    />

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="isConfirmOpen"
      title="ยืนยันการลบสินค้า"
      message="คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้"
      confirm-label="ลบสินค้า"
      type="danger"
      @close="isConfirmOpen = false"
      @confirm="confirmDelete"
    />
  </div>
</template>
