<template>
  <div
    class="bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg p-4 sticky top-0"
  >
    <h3 class="text-lg font-semibold text-gray-900 mb-4">สรุปยอดรวม</h3>

    <div class="space-y-3 mb-4">
      <div class="flex justify-between text-sm text-gray-600">
        <span>ยอดรวมสินค้า</span>
        <span class="font-medium">฿{{ formatPrice(subtotal) }}</span>
      </div>

      <div class="border-t pt-3">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          ส่วนลด (฿)
        </label>
        <input
          :value="discount"
          @input="
            $emit(
              'update:discount',
              Number(($event.target as HTMLInputElement).value)
            )
          "
          type="number"
          min="0"
          step="0.01"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
        />
      </div>

      <div class="flex justify-between text-sm text-gray-600">
        <span>ภาษี VAT ({{ taxRate }}%)</span>
        <span class="font-medium">฿{{ formatPrice(taxAmount) }}</span>
      </div>
    </div>

    <div class="border-t pt-4">
      <div class="flex justify-between items-center">
        <span class="text-base font-semibold text-gray-900">ยอดรวมสุทธิ</span>
        <span class="text-xl font-bold text-primary">
          ฿{{ formatPrice(total) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  subtotal: number;
  discount: number;
  taxRate: number;
}>();

defineEmits<{
  "update:discount": [value: number];
}>();

const taxAmount = computed(() => {
  return ((props.subtotal - props.discount) * props.taxRate) / 100;
});

const total = computed(() => {
  return props.subtotal - props.discount + taxAmount.value;
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
</script>
