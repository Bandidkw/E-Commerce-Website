<script setup lang="ts">
import { ref } from "vue";
import { MapPin, Phone, Mail, Send } from "lucide-vue-next";
import { useToastStore } from "../stores/toast";

const toast = useToastStore();

const form = ref({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const isSuccess = ref(false);

const submitForm = () => {
  isSubmitting.value = true;
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    isSuccess.value = true;
    toast.success("ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับหาคุณเร็วๆ นี้");
    form.value = { name: "", email: "", phone: "", subject: "", message: "" };
    setTimeout(() => (isSuccess.value = false), 5000);
  }, 1500);
};
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Header -->
    <section class="bg-dark text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">ติดต่อเรา</h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          ติดต่อทีมงานของเราเพื่อขอใบเสนอราคา การสนับสนุนทางเทคนิค
          หรือสอบถามข้อมูลทั่วไป
        </p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Contact Info -->
        <div>
          <h2 class="text-2xl font-bold mb-8">ช่องทางการติดต่อ</h2>

          <div class="space-y-8 mb-12">
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <MapPin class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">ที่ตั้งของเรา</h3>
                <p class="text-gray-600">
                  123 นิคมอุตสาหกรรม บางนา กรุงเทพฯ 10260 ประเทศไทย
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <Phone class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">เบอร์โทรศัพท์</h3>
                <p class="text-gray-600">+66 2 123 4567</p>
                <p class="text-gray-500 text-sm">
                  จันทร์-ศุกร์ 8:00 - 17:00 น.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <Mail class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">อีเมล</h3>
                <p class="text-gray-600">sales@chemcorp.com</p>
                <p class="text-gray-500 text-sm">เราตอบกลับภายใน 24 ชั่วโมง</p>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div
            class="bg-gray-100 rounded-xl h-64 w-full flex items-center justify-center text-gray-400"
          >
            <div class="text-center">
              <MapPin class="w-8 h-8 mx-auto mb-2" />
              <p>Google Maps Embed Placeholder</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-gray-50 p-8 rounded-xl">
          <h2 class="text-2xl font-bold mb-6">ส่งข้อความ</h2>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >ชื่อของคุณ</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >อีเมล</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >เบอร์โทรศัพท์</label
                >
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="+66 81 234 5678"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >หัวข้อ</label
                >
                <select
                  v-model="form.subject"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="">เลือกหัวข้อ</option>
                  <option value="quote">ขอใบเสนอราคา</option>
                  <option value="support">บริการสนับสนุนทางเทคนิค</option>
                  <option value="other">สอบถามอื่นๆ</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >ข้อความ</label
              >
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="เราจะช่วยคุณได้อย่างไร?"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">กำลังส่ง...</span>
              <span v-else class="flex items-center gap-2"
                >ส่งข้อความ <Send class="w-5 h-5"
              /></span>
            </button>

            <div
              v-if="isSuccess"
              class="p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium"
            >
              ส่งข้อความสำเร็จ! เราจะติดต่อกลับหาคุณเร็วๆ นี้
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
