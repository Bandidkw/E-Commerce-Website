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
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">สินค้า</h1>
      <button
        @click="openAddModal"
        class="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
      >
        <Plus class="w-5 h-5" />
        เพิ่มสินค้า
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <!-- Search -->
      <div class="p-4 border-b border-gray-100 flex items-center gap-4">
        <Search class="w-5 h-5 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหาสินค้า..."
          class="flex-grow outline-none text-gray-600"
        />
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead
            class="bg-gray-50 text-gray-600 font-medium border-b border-gray-100"
          >
            <tr>
              <th class="p-4">รหัส</th>
              <th class="p-4">รูปภาพ</th>
              <th class="p-4">ชื่อ</th>
              <th class="p-4">หมวดหมู่</th>
              <th class="p-4">ราคา</th>
              <th class="p-4 text-right">การดำเนินการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="p-4 text-gray-500">#{{ product.id }}</td>
              <td class="p-4">
                <div class="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td class="p-4 font-medium text-gray-900">{{ product.name }}</td>
              <td class="p-4 text-gray-600">{{ product.category }}</td>
              <td class="p-4 font-bold text-dark">฿{{ product.price }}</td>
              <td class="p-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openEditModal(product)"
                    class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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
        class="p-4 border-t border-gray-100 flex items-center justify-between"
        v-if="filteredProducts.length > 0"
      >
        <div class="text-sm text-gray-500">
          แสดง {{ (currentPage - 1) * itemsPerPage + 1 }} ถึง
          {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}
          จาก {{ filteredProducts.length }} รายการ
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft class="w-5 h-5 text-gray-600" />
          </button>
          <span class="text-sm font-medium text-gray-700">
            หน้า {{ currentPage }} จาก {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight class="w-5 h-5 text-gray-600" />
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
