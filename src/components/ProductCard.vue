<script setup lang="ts">
import { RouterLink } from "vue-router";
import { type Product } from "../services/mockData";
import { ArrowRight, ShoppingCart } from "lucide-vue-next";

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div
    class="bg-white rounded-[2rem] border border-slate-100 hover:border-primary/20 shadow-premium hover:shadow-premium-lg overflow-hidden group h-full flex flex-col transition-all duration-500 ease-out hover:-translate-y-2"
  >
    <div class="relative h-64 overflow-hidden shrink-0">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
      />
      <div
        class="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase text-primary border border-white/50 shadow-sm"
      >
        {{ product.category }}
      </div>

      <!-- Quick Action Overlay -->
      <div
        class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3"
      >
        <RouterLink
          :to="`/products/${product.id}`"
          class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
        >
          <ArrowRight class="w-6 h-6" />
        </RouterLink>
      </div>
    </div>

    <div class="p-8 flex flex-col flex-grow">
      <h3
        class="text-xl font-black mb-3 text-slate-900 group-hover:text-primary transition-colors duration-300 leading-tight"
      >
        {{ product.name }}
      </h3>
      <p
        class="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed"
      >
        {{ product.description }}
      </p>

      <div
        class="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto"
      >
        <div class="flex flex-col">
          <span
            class="text-xs font-bold text-slate-400 uppercase tracking-tighter"
            >เริ่มต้นที่</span
          >
          <span class="text-2xl font-black text-slate-900"
            >฿{{ product.price }}</span
          >
        </div>
        <RouterLink
          :to="`/products/${product.id}`"
          class="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-all group/btn"
        >
          <ShoppingCart
            class="w-6 h-6 group-hover/btn:scale-110 transition-transform"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
