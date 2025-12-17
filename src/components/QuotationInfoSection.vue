<template>
  <div class="bg-gray-50 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">ข้อมูลใบเสนอราคา</h3>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          เลขที่ใบเสนอราคา
        </label>
        <input
          :value="quotationNumber"
          @input="
            $emit(
              'update:quotationNumber',
              ($event.target as HTMLInputElement).value
            )
          "
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          ใช้ได้ถึงวันที่ <span class="text-red-500">*</span>
        </label>
        <input
          :value="validUntil"
          @input="
            $emit(
              'update:validUntil',
              ($event.target as HTMLInputElement).value
            )
          "
          type="date"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  quotationNumber: string;
  validUntil: string;
}>();

defineEmits<{
  "update:quotationNumber": [value: string];
  "update:validUntil": [value: string];
}>();
</script>
