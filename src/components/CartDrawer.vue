<script setup lang="ts">
import { useCartStore } from "../stores/cart";
import { X, Plus, Minus, ShoppingBag } from "lucide-vue-next";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const cartStore = useCartStore();
</script>

<template>
  <TransitionRoot as="template" :show="cartStore.isOpen">
    <Dialog class="relative z-[100]" @close="cartStore.toggleCart">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
          >
            <!-- Drawer Panel -->
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col overflow-y-auto bg-white shadow-xl"
                >
                  <!-- Header -->
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle
                        class="text-lg font-medium text-gray-900 flex items-center gap-2"
                      >
                        <ShoppingBag class="w-5 h-5 text-primary" />
                        ตะกร้าสินค้า
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200 cursor-pointer"
                          @click="cartStore.toggleCart"
                        >
                          <span class="absolute -inset-0.5"></span>
                          <span class="sr-only">ปิดตะกร้า</span>
                          <X class="size-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <!-- Cart Content -->
                    <div class="mt-8">
                      <!-- Empty State -->
                      <div
                        v-if="cartStore.items.length === 0"
                        class="h-full flex flex-col items-center justify-center text-center text-gray-500"
                      >
                        <ShoppingBag class="w-16 h-16 mb-4 text-gray-200" />
                        <p class="text-lg font-medium mb-2">
                          ตะกร้าสินค้าของคุณว่างเปล่า
                        </p>
                        <p class="text-sm">
                          ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าใดๆ
                        </p>
                        <button
                          @click="cartStore.toggleCart"
                          class="mt-6 text-primary font-bold hover:underline cursor-pointer transition-all duration-200 hover:translate-x-1"
                        >
                          เริ่มช้อปปิ้ง
                        </button>
                      </div>

                      <!-- Cart Items -->
                      <div v-else class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <transition-group name="cart-item" tag="div">
                            <li
                              v-for="item in cartStore.items"
                              :key="item.id"
                              class="flex py-6 cart-item"
                            >
                              <!-- Product Image -->
                              <div
                                class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200"
                              >
                                <img
                                  :src="item.image"
                                  :alt="item.name"
                                  class="size-full object-cover"
                                />
                              </div>

                              <!-- Product Details -->
                              <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div
                                    class="flex justify-between text-base font-medium text-gray-900"
                                  >
                                    <h3 class="line-clamp-1">
                                      <router-link :to="`/product/${item.id}`">
                                        {{ item.name }}
                                      </router-link>
                                    </h3>
                                    <p class="ml-4 font-bold text-primary">
                                      ${{
                                        (item.price * item.quantity).toFixed(2)
                                      }}
                                    </p>
                                  </div>
                                  <p class="mt-1 text-sm text-gray-500">
                                    {{ item.category }}
                                  </p>
                                </div>
                                <div
                                  class="flex flex-1 items-end justify-between text-sm"
                                >
                                  <!-- Quantity Controls -->
                                  <div
                                    class="flex items-center border border-gray-200 rounded-lg"
                                  >
                                    <button
                                      @click="
                                        cartStore.updateQuantity(
                                          item.id,
                                          item.quantity - 1
                                        )
                                      "
                                      class="p-1 hover:bg-gray-50 text-gray-600 cursor-pointer transition-colors duration-200"
                                    >
                                      <Minus class="w-4 h-4" />
                                    </button>
                                    <span
                                      class="w-8 text-center text-sm font-medium"
                                    >
                                      {{ item.quantity }}
                                    </span>
                                    <button
                                      @click="
                                        cartStore.updateQuantity(
                                          item.id,
                                          item.quantity + 1
                                        )
                                      "
                                      class="p-1 hover:bg-gray-50 text-gray-600 cursor-pointer transition-colors duration-200"
                                    >
                                      <Plus class="w-4 h-4" />
                                    </button>
                                  </div>

                                  <!-- Remove Button -->
                                  <div class="flex">
                                    <button
                                      type="button"
                                      @click="cartStore.removeFromCart(item.id)"
                                      class="font-medium text-primary hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                                    >
                                      ลบ
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </transition-group>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div
                    v-if="cartStore.items.length > 0"
                    class="border-t border-gray-200 px-4 py-6 sm:px-6"
                  >
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>ยอดรวมย่อย</p>
                      <p class="text-xl font-bold">
                        ${{ cartStore.cartTotal.toFixed(2) }}
                      </p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      ค่าจัดส่งและภาษีจะคำนวณเมื่อชำระเงิน
                    </p>
                    <div class="mt-6">
                      <RouterLink
                        to="/checkout"
                        @click="cartStore.toggleCart"
                        class="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-lg shadow-primary/20 hover:bg-blue-700 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                      >
                        ชำระเงิน
                      </RouterLink>
                    </div>
                    <div class="mt-6">
                      <RouterLink
                        to="/request-quotation"
                        @click="cartStore.toggleCart"
                        class="flex items-center justify-center rounded-md border-2 border-primary bg-white px-6 py-3 text-base font-medium text-primary hover:bg-blue-50 transition-all duration-300"
                      >
                        ขอใบเสนอราคา
                      </RouterLink>
                    </div>
                    <div
                      class="mt-6 flex justify-center text-center text-sm text-gray-500"
                    >
                      <p>
                        หรือ
                        <button
                          type="button"
                          @click="cartStore.toggleCart"
                          class="font-medium text-primary hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                        >
                          ช้อปต่อ
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
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
