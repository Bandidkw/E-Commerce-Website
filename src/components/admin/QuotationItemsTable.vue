<script setup lang="ts">
import { Plus, Trash2 } from "lucide-vue-next";

interface QuotationItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

const props = defineProps<{
  items: QuotationItem[];
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "remove", index: number): void;
}>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">รายการสินค้า</h2>
      <button
        @click="emit('add')"
        type="button"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 text-sm cursor-pointer"
      >
        <Plus class="w-4 h-4" />
        เพิ่มรายการ
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="border border-gray-200 rounded-lg p-4"
      >
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-5">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ชื่อสินค้า
            </label>
            <input
              v-model="item.productName"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="กรอกชื่อสินค้า"
            />
          </div>
          <div class="col-span-5 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              จำนวน
            </label>
            <input
              v-model.number="item.quantity"
              type="number"
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div class="col-span-5 md:col-span-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ราคา/หน่วย (฿)
            </label>
            <input
              v-model.number="item.unitPrice"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div class="col-span-2 md:col-span-2 flex items-end justify-between">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                รวม (฿)
              </label>
              <div class="text-lg font-bold text-gray-900">
                {{ formatPrice(item.quantity * item.unitPrice) }}
              </div>
            </div>
            <button
              v-if="items.length > 1"
              @click="emit('remove', index)"
              type="button"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="ลบรายการ"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
