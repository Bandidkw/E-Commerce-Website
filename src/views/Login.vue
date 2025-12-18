<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Lock } from "lucide-vue-next";
import { useToastStore } from "../stores/toast";

const router = useRouter();
const toast = useToastStore();
const username = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  error.value = "";

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (username.value === "admin" && password.value === "123456") {
    // Mock success
    localStorage.setItem("admin_token", "true");
    toast.success("เข้าสู่ระบบสำเร็จ");
    router.push("/admin/dashboard");
  } else {
    error.value = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    toast.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
      <div class="text-center mb-8">
        <div
          class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white mx-auto mb-4"
        >
          <Lock class="w-6 h-6" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">เข้าสู่ระบบแอดมิน</h1>
        <p class="text-gray-500 mt-2">ลงชื่อเข้าใช้เพื่อจัดการร้านค้าของคุณ</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div
          v-if="error"
          class="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center"
        >
          {{ error }}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >ชื่อผู้ใช้</label
          >
          <input
            v-model="username"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="admin"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >รหัสผ่าน</label
          >
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span v-if="isLoading">กำลังเข้าสู่ระบบ...</span>
          <span v-else>เข้าสู่ระบบ</span>
        </button>
      </form>
    </div>
  </div>
</template>
