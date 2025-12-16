<script setup lang="ts">
import { RouterLink } from "vue-router";
import { type Product } from "../services/mockData";

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden group h-full flex flex-col transition-all duration-500 ease-out hover:-translate-y-2"
  >
    <div class="relative h-48 overflow-hidden shrink-0">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      <div
        class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white"
      >
        {{ product.category }}
      </div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <h3
        class="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300"
      >
        {{ product.name }}
      </h3>
      <p class="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
        {{ product.description }}
      </p>
      <div class="flex items-center justify-between mt-auto">
        <span
          class="text-lg font-bold text-dark transition-all duration-300 group-hover:text-primary group-hover:scale-110 inline-block"
          >฿{{ product.price }}</span
        >
        <RouterLink
          :to="`/products/${product.id}`"
          class="text-sm font-medium text-primary hover:underline transition-all duration-300 hover:translate-x-1"
          >ดูรายละเอียด</RouterLink
        >
      </div>
    </div>
  </div>
</template>
