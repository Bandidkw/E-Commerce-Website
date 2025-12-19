<script setup lang="ts">
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";
import { useToastStore } from "../stores/toast";
import { CheckCircle, ArrowRight } from "lucide-vue-next";

const cartStore = useCartStore();
const authStore = useAuthStore();
const toast = useToastStore();

const form = ref({
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "Thailand",
});

const isProcessing = ref(false);
const isSuccess = ref(false);

const subtotal = computed(() => cartStore.cartTotal);
const shipping = computed(() => (subtotal.value > 1000 ? 0 : 150));
const total = computed(() => subtotal.value + shipping.value);

const placeOrder = async () => {
  isProcessing.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  isProcessing.value = false;
  isSuccess.value = true;
  toast.success("สั่งซื้อสินค้าเรียบร้อยแล้ว");

  // Save to order history if logged in
  if (authStore.isLoggedIn) {
    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toISOString(),
      items: [...cartStore.items],
      total: total.value,
      status: "รอดำเนินการ",
    };
    authStore.addOrderToHistory(newOrder);
  }

  // Clear cart after short delay
  setTimeout(() => {
    cartStore.clearCart();
  }, 1000);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Success State -->
      <div
        v-if="isSuccess"
        class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm text-center"
      >
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle class="w-8 h-8 text-green-500" />
        </div>
        <h1 class="text-2xl font-bold mb-4">สั่งซื้อสำเร็จ!</h1>
        <p class="text-gray-600 mb-8">
          ขอบคุณสำหรับการสั่งซื้อ เราจะส่งอีเมลยืนยันให้คุณในไม่ช้า
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/"
            class="inline-block px-8 py-3 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 transition-colors"
          >
            ซื้อสินค้าต่อ
          </RouterLink>
          <RouterLink
            v-if="authStore.isLoggedIn"
            to="/profile"
            class="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-indigo"
          >
            ดูประวัติการสั่งซื้อ
            <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>
      </div>

      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
      >
        <!-- Checkout Form -->
        <div>
          <h1 class="text-2xl font-bold mb-8">ชำระเงิน</h1>

          <form @submit.prevent="placeOrder" class="space-y-8">
            <!-- Contact -->
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h2 class="text-lg font-bold mb-4">ข้อมูลติดต่อ</h2>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >อีเมล</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h2 class="text-lg font-bold mb-4">ที่อยู่จัดส่ง</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >ชื่อ</label
                  >
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >นามสกุล</label
                  >
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >ที่อยู่</label
                  >
                  <input
                    v-model="form.address"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >เมือง / จังหวัด</label
                  >
                  <input
                    v-model="form.city"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >รหัสไปรษณีย์</label
                  >
                  <input
                    v-model="form.postalCode"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Payment (Mock) -->
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h2 class="text-lg font-bold mb-4">วิธีการชำระเงิน</h2>
              <div
                class="p-4 border border-blue-100 bg-blue-50 rounded-lg text-blue-800 text-sm"
              >
                นี่คือร้านค้าสาธิต ไม่ต้องชำระเงินจริง
              </div>
            </div>

            <button
              type="submit"
              :disabled="isProcessing"
              class="w-full py-4 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              <span v-if="isProcessing">กำลังดำเนินการ...</span>
              <span v-else>สั่งซื้อสินค้า (${{ total.toFixed(2) }})</span>
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <div>
          <div class="bg-white p-6 rounded-xl shadow-sm sticky top-24">
            <h2 class="text-lg font-bold mb-6">สรุปคำสั่งซื้อ</h2>

            <div class="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex gap-4"
              >
                <div
                  class="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="font-medium text-sm line-clamp-1">
                    {{ item.name }}
                  </h3>
                  <p class="text-xs text-gray-500 mb-1">
                    จำนวน: {{ item.quantity }}
                  </p>
                  <p class="text-sm font-bold text-primary">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-4 space-y-2">
              <div class="flex justify-between text-gray-600">
                <span>ยอดรวมย่อย</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>ค่าจัดส่ง</span>
                <span>{{
                  shipping === 0 ? "ฟรี" : `$${shipping.toFixed(2)}`
                }}</span>
              </div>
              <div
                class="flex justify-between text-xl font-bold text-dark pt-2 border-t border-gray-100 mt-2"
              >
                <span>ยอดรวมสุทธิ</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
