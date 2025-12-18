<script setup lang="ts">
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useToastStore } from "../stores/toast";
import { CheckCircle, FileText } from "lucide-vue-next";

const cartStore = useCartStore();
const toast = useToastStore();

const form = ref({
  email: "",
  firstName: "",
  lastName: "",
  companyName: "",
  taxId: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "Thailand",
  notes: "",
});

const isProcessing = ref(false);
const isSuccess = ref(false);

const subtotal = computed(() => cartStore.cartTotal);

const submitQuote = async () => {
  isProcessing.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  isProcessing.value = false;
  isSuccess.value = true;
  toast.success("ส่งคำขอใบเสนอราคาเรียบร้อยแล้ว");

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
          class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle class="w-8 h-8 text-blue-500" />
        </div>
        <h1 class="text-2xl font-bold mb-4">ส่งคำขอใบเสนอราคาสำเร็จ!</h1>
        <p class="text-gray-600 mb-8">
          เราได้รับข้อมูลของคุณแล้ว
          และจะติดต่อกลับพร้อมใบเสนอราคาทางอีเมลโดยเร็วที่สุด
        </p>
        <RouterLink
          to="/"
          class="inline-block px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          กลับสู่หน้าหลัก
        </RouterLink>
      </div>

      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
      >
        <!-- RFQ Form -->
        <div>
          <div class="flex items-center gap-3 mb-8">
            <div class="p-3 bg-blue-100 rounded-lg text-primary">
              <FileText class="w-6 h-6" />
            </div>
            <h1 class="text-2xl font-bold">ขอใบเสนอราคา</h1>
          </div>

          <form @submit.prevent="submitQuote" class="space-y-8">
            <!-- Contact Info -->
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h2 class="text-lg font-bold mb-4">ข้อมูลผู้ติดต่อ</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >อีเมล *</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >ชื่อ *</label
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
                    >นามสกุล *</label
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
                    >เบอร์โทรศัพท์ *</label
                  >
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Company Info -->
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h2 class="text-lg font-bold mb-4">ข้อมูลบริษัท (ถ้ามี)</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >ชื่อบริษัท</label
                  >
                  <input
                    v-model="form.companyName"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >เลขประจำตัวผู้เสียภาษี</label
                  >
                  <input
                    v-model="form.taxId"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Address -->
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h2 class="text-lg font-bold mb-4">ที่อยู่สำหรับออกใบเสนอราคา</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >ที่อยู่ *</label
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
                    >เมือง / จังหวัด *</label
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
                    >รหัสไปรษณีย์ *</label
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

            <!-- Additional Notes -->
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <h2 class="text-lg font-bold mb-4">รายละเอียดเพิ่มเติม</h2>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >หมายเหตุ</label
                >
                <textarea
                  v-model="form.notes"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="ระบุรายละเอียดเพิ่มเติมที่ต้องการ..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isProcessing"
              class="w-full py-4 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              <span v-if="isProcessing">กำลังส่งข้อมูล...</span>
              <span v-else>ยืนยันคำขอใบเสนอราคา</span>
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <div>
          <div class="bg-white p-6 rounded-xl shadow-sm sticky top-24">
            <h2 class="text-lg font-bold mb-6">รายการสินค้าที่ต้องการ</h2>

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
                <span>ยอดรวมสินค้า (ประมาณการ)</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div
                class="p-3 bg-yellow-50 text-yellow-800 text-xs rounded-lg mt-4"
              >
                หมายเหตุ: ราคานี้เป็นเพียงราคาเบื้องต้น
                ราคาจริงอาจมีการเปลี่ยนแปลงตามจำนวนและเงื่อนไขในใบเสนอราคา
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
