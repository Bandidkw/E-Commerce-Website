<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Lock, X } from "lucide-vue-next";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const router = useRouter();
const isOpen = ref(false);
const username = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const openModal = () => {
  isOpen.value = true;
  // Reset form when opening
  username.value = "";
  password.value = "";
  error.value = "";
};

const closeModal = () => {
  isOpen.value = false;
  // Reset form when closing
  setTimeout(() => {
    username.value = "";
    password.value = "";
    error.value = "";
  }, 300);
};

const handleLogin = async () => {
  isLoading.value = true;
  error.value = "";

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (username.value === "admin" && password.value === "123456") {
    // Mock success
    localStorage.setItem("admin_token", "true");
    closeModal();
    router.push("/admin/dashboard");
  } else {
    error.value = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
  isLoading.value = false;
};

// Expose openModal so parent can call it
defineExpose({
  openModal,
});
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-[100]" @close="closeModal">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
        >
          <!-- Modal Panel -->
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md"
            >
              <div class="bg-white px-8 pb-8 pt-6">
                <!-- Close Button -->
                <div class="absolute right-4 top-4">
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
                    @click="closeModal"
                  >
                    <span class="sr-only">ปิด</span>
                    <X class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Header -->
                <div class="text-center mb-8">
                  <div
                    class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white mx-auto mb-4"
                  >
                    <Lock class="w-6 h-6" />
                  </div>
                  <DialogTitle as="h3" class="text-2xl font-bold text-gray-900">
                    เข้าสู่ระบบแอดมิน
                  </DialogTitle>
                  <p class="text-gray-500 mt-2">
                    ลงชื่อเข้าใช้เพื่อจัดการร้านค้าของคุณ
                  </p>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="space-y-6">
                  <!-- Error Message -->
                  <div
                    v-if="error"
                    class="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center"
                  >
                    {{ error }}
                  </div>

                  <!-- Username -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อผู้ใช้
                    </label>
                    <input
                      v-model="username"
                      type="text"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="admin"
                    />
                  </div>

                  <!-- Password -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      รหัสผ่าน
                    </label>
                    <input
                      v-model="password"
                      type="password"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>

                  <!-- Submit Button -->
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
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
