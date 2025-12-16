<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { products } from "../services/mockData";
import {
  Download,
  Check,
  Shield,
  ArrowLeft,
  ShoppingBag,
} from "lucide-vue-next";
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
  <div v-if="product" class="py-12 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <RouterLink
          to="/products"
          class="hover:text-primary flex items-center gap-1"
        >
          <ArrowLeft class="w-4 h-4" /> กลับไปหน้าสินค้า
        </RouterLink>
        <span>/</span>
        <span class="text-primary font-medium">{{ product.name }}</span>
      </div>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
          <!-- Image -->
          <div class="h-96 md:h-auto bg-gray-100 relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Details -->
          <div class="p-8 md:p-12">
            <div
              class="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4"
            >
              {{ product.category }}
            </div>
            <h1 class="text-3xl md:text-4xl font-bold mb-4">
              {{ product.name }}
            </h1>
            <p class="text-gray-600 mb-8 text-lg leading-relaxed">
              {{ product.description }}
            </p>

            <div class="flex items-center gap-4 mb-8">
              <span class="text-3xl font-bold text-dark"
                >${{ product.price }}</span
              >
              <span class="text-sm text-gray-500">ต่อหน่วย</span>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 mb-12">
              <RouterLink
                to="/contact"
                class="px-8 py-4 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold text-center transition-colors"
              >
                ขอใบเสนอราคา
              </RouterLink>
              <button
                @click="cartStore.addToCart(product)"
                class="px-8 py-4 bg-dark hover:bg-gray-800 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag class="w-5 h-5" /> เพิ่มลงตะกร้า
              </button>
              <button
                class="px-8 py-4 bg-white border-2 border-gray-200 hover:border-primary hover:text-primary text-gray-700 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Download class="w-5 h-5" /> ดาวน์โหลด TDS
              </button>
            </div>

            <div class="border-t border-gray-100 pt-8">
              <h3 class="font-bold mb-4 flex items-center gap-2">
                <Shield class="w-5 h-5 text-green-500" /> การรับประกันคุณภาพ
              </h3>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 text-gray-600">
                  <Check class="w-4 h-4 text-green-500" /> ได้รับการรับรอง ISO
                  9001:2015
                </li>
                <li class="flex items-center gap-2 text-gray-600">
                  <Check class="w-4 h-4 text-green-500" /> มีใบรับรอง COA
                </li>
                <li class="flex items-center gap-2 text-gray-600">
                  <Check class="w-4 h-4 text-green-500" /> มีเอกสาร MSDS
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Specs -->
      <div class="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm p-8">
            <h2 class="text-2xl font-bold mb-6">ข้อมูลจำเพาะทางเทคนิค</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <tbody>
                  <tr
                    v-for="(value, key) in product.specs"
                    :key="key"
                    class="border-b border-gray-100 last:border-0"
                  >
                    <td class="py-4 font-medium text-gray-900 w-1/3">
                      {{ key }}
                    </td>
                    <td class="py-4 text-gray-600">{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div>
          <h3 class="text-xl font-bold mb-6">สินค้าที่เกี่ยวข้อง</h3>
          <div class="space-y-4">
            <RouterLink
              v-for="related in relatedProducts"
              :key="related.id"
              :to="`/products/${related.id}`"
              class="flex gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div
                class="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0"
              >
                <img
                  :src="related.image"
                  :alt="related.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4
                  class="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1"
                >
                  {{ related.name }}
                </h4>
                <p class="text-sm text-gray-500 mb-2">{{ related.category }}</p>
                <span class="text-primary font-bold text-sm"
                  >${{ related.price }}</span
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
