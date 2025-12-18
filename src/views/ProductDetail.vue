<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { products } from "../services/mockData";
import { Download, Shield, ShoppingBag } from "lucide-vue-next";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();

const route = useRoute();
const product = ref<any>(null);

onMounted(() => {
  const id = Number(route.params.id);
  product.value = products.find((p) => p.id === id);
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return products
    .filter(
      (p) => p.category === product.value.category && p.id !== product.value.id
    )
    .slice(0, 4);
});
</script>

<template>
  <div v-if="product" class="py-16 bg-slate-50 min-h-screen">
    <div class="container mx-auto px-6">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-slate-400 mb-10">
        <RouterLink to="/" class="hover:text-primary transition-colors">
          หน้าแรก
        </RouterLink>
        <span class="text-slate-300">/</span>
        <RouterLink to="/products" class="hover:text-primary transition-colors">
          สินค้า
        </RouterLink>
        <span class="text-slate-300">/</span>
        <span class="text-slate-900 font-bold tracking-tight">{{
          product.name
        }}</span>
      </div>

      <div
        class="bg-white rounded-[2.5rem] shadow-premium-lg border border-slate-100 overflow-hidden mb-12"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
          <!-- Image -->
          <div class="h-[30rem] md:h-auto bg-slate-50 relative group">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"
            ></div>
          </div>

          <!-- Details -->
          <div class="p-10 md:p-16 flex flex-col">
            <div
              class="inline-flex px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-black uppercase tracking-widest mb-8 self-start"
            >
              {{ product.category }}
            </div>
            <h1
              class="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight"
            >
              {{ product.name }}
            </h1>
            <p class="text-slate-500 mb-10 text-lg leading-relaxed flex-grow">
              {{ product.description }}
            </p>

            <div class="flex items-end gap-3 mb-12">
              <span
                class="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-3"
                >ราคาประมาณ</span
              >
              <span class="text-5xl font-black text-slate-900"
                >฿{{ product.price }}</span
              >
              <span class="text-sm text-slate-400 font-bold mb-2">/ หน่วย</span>
            </div>

            <div class="flex flex-col xl:flex-row gap-4 mb-12">
              <RouterLink
                to="/contact"
                class="flex-1 px-8 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-center transition-all shadow-indigo hover:shadow-lg hover:-translate-y-1"
              >
                ขอใบเสนอราคา
              </RouterLink>
              <button
                @click="cartStore.addToCart(product)"
                class="flex-1 px-8 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-xl"
              >
                <ShoppingBag class="w-6 h-6" /> เพิ่มลงตะกร้า
              </button>
            </div>

            <div class="flex items-center gap-6 pt-10 border-t border-slate-50">
              <button
                class="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider cursor-pointer group"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all"
                >
                  <Download class="w-5 h-5" />
                </div>
                ดาวน์โหลด TDS
              </button>
              <button
                class="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider cursor-pointer group"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all"
                >
                  <Shield class="w-5 h-5" />
                </div>
                เอกสารความปลอดภัย
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Specs -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2">
          <div
            class="bg-white rounded-[2rem] shadow-premium p-10 border border-slate-100"
          >
            <h2
              class="text-3xl font-black mb-8 text-slate-900 flex items-center gap-4"
            >
              <div class="w-2 h-8 bg-primary rounded-full"></div>
              ข้อมูลจำเพาะทางเทคนิค
            </h2>
            <div class="overflow-hidden rounded-2xl border border-slate-50">
              <table class="w-full text-left border-collapse">
                <tbody>
                  <tr
                    v-for="(value, key) in product.specs"
                    :key="key"
                    class="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td class="px-8 py-5 font-bold text-slate-900 w-1/3">
                      {{ key }}
                    </td>
                    <td class="px-8 py-5 text-slate-600 font-medium">
                      {{ value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="flex flex-col">
          <h3 class="text-2xl font-black mb-8 text-slate-900">
            สินค้าที่เกี่ยวข้อง
          </h3>
          <div class="space-y-4 flex-grow">
            <RouterLink
              v-for="related in relatedProducts"
              :key="related.id"
              :to="`/products/${related.id}`"
              class="flex gap-5 bg-white p-5 rounded-3xl border border-slate-100 shadow-premium hover:shadow-premium-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div
                class="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0"
              >
                <img
                  :src="related.image"
                  :alt="related.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div class="flex flex-col justify-center">
                <h4
                  class="font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1 mb-1"
                >
                  {{ related.name }}
                </h4>
                <p
                  class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3"
                >
                  {{ related.category }}
                </p>
                <span class="text-lg font-black text-primary"
                  >฿{{ related.price }}</span
                >
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="py-20 text-center">
    <p>กำลังโหลดรายละเอียดสินค้า...</p>
  </div>
</template>
