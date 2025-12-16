<script setup lang="ts">
import { useCartStore } from "../stores/cart";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-vue-next";

const cartStore = useCartStore();
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    leave-active-class="transition-opacity duration-200 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="cartStore.isOpen" class="fixed inset-0 z-[100] overflow-hidden">
      <div
        class="absolute inset-0 bg-black/50"
        @click="cartStore.toggleCart"
      ></div>

      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-200 ease-in"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="cartStore.isOpen"
          class="absolute inset-y-0 right-0 max-w-md w-full flex"
        >
          <div class="h-full w-full bg-white shadow-xl flex flex-col">
            <!-- Header -->
            <div
              class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
            >
              <h2 class="text-xl font-bold flex items-center gap-2">
                <ShoppingBag class="w-5 h-5 text-primary" />
                ตะกร้าสินค้า
              </h2>
              <button
                @click="cartStore.toggleCart"
                class="text-gray-400 hover:text-dark transition-colors duration-200 cursor-pointer hover:rotate-90 transform"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <!-- Cart Items -->
            <div class="flex-1 overflow-y-auto p-6">
              <div
                v-if="cartStore.items.length === 0"
                class="h-full flex flex-col items-center justify-center text-center text-gray-500"
              >
                <ShoppingBag class="w-16 h-16 mb-4 text-gray-200" />
                <p class="text-lg font-medium mb-2">
                  ตะกร้าสินค้าของคุณว่างเปล่า
                </p>
                <p class="text-sm">ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าใดๆ</p>
                <button
                  @click="cartStore.toggleCart"
                  class="mt-6 text-primary font-bold hover:underline cursor-pointer transition-all duration-200 hover:translate-x-1"
                >
                  เริ่มช้อปปิ้ง
                </button>
              </div>

              <transition-group
                v-else
                name="cart-item"
                tag="div"
                class="space-y-6"
              >
                <div
                  v-for="item in cartStore.items"
                  :key="item.id"
                  class="flex gap-4 cart-item"
                >
                  <div
                    class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between mb-1">
                      <h3 class="font-bold text-dark line-clamp-1">
                        {{ item.name }}
                      </h3>
                      <button
                        @click="cartStore.removeFromCart(item.id)"
                        class="text-gray-400 hover:text-red-500 transition-all duration-200 cursor-pointer hover:scale-110"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                    <p class="text-sm text-gray-500 mb-2">
                      {{ item.category }}
                    </p>
                    <div class="flex items-center justify-between">
                      <div
                        class="flex items-center border border-gray-200 rounded-lg"
                      >
                        <button
                          @click="
                            cartStore.updateQuantity(item.id, item.quantity - 1)
                          "
                          class="p-1 hover:bg-gray-50 text-gray-600 cursor-pointer transition-colors duration-200"
                        >
                          <Minus class="w-4 h-4" />
                        </button>
                        <span class="w-8 text-center text-sm font-medium">{{
                          item.quantity
                        }}</span>
                        <button
                          @click="
                            cartStore.updateQuantity(item.id, item.quantity + 1)
                          "
                          class="p-1 hover:bg-gray-50 text-gray-600 cursor-pointer transition-colors duration-200"
                        >
                          <Plus class="w-4 h-4" />
                        </button>
                      </div>
                      <span class="font-bold text-primary"
                        >${{ (item.price * item.quantity).toFixed(2) }}</span
                      >
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>

            <!-- Footer -->
            <div
              v-if="cartStore.items.length > 0"
              class="border-t border-gray-100 p-6 bg-gray-50"
            >
              <div class="flex justify-between items-center mb-4">
                <span class="text-gray-600">ยอดรวมย่อย</span>
                <span class="text-xl font-bold text-dark"
                  >${{ cartStore.cartTotal.toFixed(2) }}</span
                >
              </div>
              <p class="text-xs text-gray-500 mb-6">
                ค่าจัดส่งและภาษีจะคำนวณเมื่อชำระเงิน
              </p>
              <RouterLink
                to="/checkout"
                @click="cartStore.toggleCart"
                class="block w-full py-4 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-all duration-300 shadow-lg shadow-primary/20 text-center mb-3 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                ชำระเงิน
              </RouterLink>
              <RouterLink
                to="/request-quotation"
                @click="cartStore.toggleCart"
                class="block w-full py-3 bg-white border-2 border-primary text-primary hover:bg-blue-50 rounded-lg font-bold text-lg transition-all duration-300 text-center hover:-translate-y-0.5"
              >
                ขอใบเสนอราคา
              </RouterLink>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
/* Cart Item Transition */
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.cart-item-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
