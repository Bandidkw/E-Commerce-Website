<template>
  <div class="bg-gray-50 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">ข้อมูลลูกค้า</h3>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          ชื่อลูกค้า <span class="text-red-500">*</span>
        </label>
        <input
          :value="customerName"
          @input="
            $emit(
              'update:customerName',
              ($event.target as HTMLInputElement).value
            )
          "
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
          placeholder="ชื่อ-นามสกุล"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          บริษัท
        </label>
        <input
          :value="customerCompany"
          @input="
            $emit(
              'update:customerCompany',
              ($event.target as HTMLInputElement).value
            )
          "
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
          placeholder="ชื่อบริษัท"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          อีเมล <span class="text-red-500">*</span>
        </label>
        <input
          :value="customerEmail"
          @input="
            $emit(
              'update:customerEmail',
              ($event.target as HTMLInputElement).value
            )
          "
          type="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          เบอร์โทรศัพท์
        </label>
        <input
          :value="customerPhone"
          @input="
            $emit(
              'update:customerPhone',
              ($event.target as HTMLInputElement).value
            )
          "
          type="tel"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
          placeholder="02-xxx-xxxx"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
}>();

defineEmits<{
  "update:customerName": [value: string];
  "update:customerEmail": [value: string];
  "update:customerPhone": [value: string];
  "update:customerCompany": [value: string];
}>();
</script>
