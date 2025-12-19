<script setup lang="ts">
import { ref } from "vue";
import { LogIn, X, Eye, EyeOff, UserPlus } from "lucide-vue-next";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useAuthStore } from "../stores/auth";
import { useToastStore } from "../stores/toast";

const authStore = useAuthStore();
const toast = useToastStore();

const isOpen = ref(false);
const isLoginMode = ref(true);
const isLoading = ref(false);
const error = ref("");
const showPassword = ref(false);

const form = ref({
  name: "",
  email: "",
  password: "",
});

const openModal = (mode: "login" | "register" = "login") => {
  isLoginMode.value = mode === "login";
  isOpen.value = true;
  resetForm();
};

const closeModal = () => {
  isOpen.value = false;
};

const resetForm = () => {
  form.value = { name: "", email: "", password: "" };
  error.value = "";
  showPassword.value = false;
};

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = "";

  try {
    let success = false;
    if (isLoginMode.value) {
      success = await authStore.login(
        form.value.email,
        form.value.password,
        "customer"
      );
    } else {
      success = await authStore.register(
        form.value.name,
        form.value.email,
        form.value.password
      );
    }

    if (success) {
      toast.success(
        isLoginMode.value ? "เข้าสู่ระบบสำเร็จ" : "สมัครสมาชิกสำเร็จ"
      );
      closeModal();
    } else {
      error.value = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
    }
  } catch (err) {
    error.value = "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
  } finally {
    isLoading.value = false;
  }
};

defineExpose({ openModal });
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-[100]" @close="closeModal">
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
          class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
        >
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
              class="relative transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-slate-100"
            >
              <div class="bg-white px-8 pb-10 pt-8">
                <!-- Close Button -->
                <div class="absolute right-6 top-6">
                  <button
                    @click="closeModal"
                    class="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-full cursor-pointer"
                  >
                    <X class="h-6 w-6" />
                  </button>
                </div>

                <!-- Header -->
                <div class="text-center mb-10">
                  <div
                    class="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 transform -rotate-6"
                  >
                    <LogIn v-if="isLoginMode" class="w-8 h-8" />
                    <UserPlus v-else class="w-8 h-8" />
                  </div>
                  <DialogTitle
                    as="h3"
                    class="text-3xl font-black text-slate-900 mb-2"
                  >
                    {{ isLoginMode ? "ยินดีต้อนรับกลับมา" : "สร้างบัญชีใหม่" }}
                  </DialogTitle>
                  <p class="text-slate-500 font-medium">
                    {{
                      isLoginMode
                        ? "กรุณาเข้าสู่ระบบเพื่อใช้งาน"
                        : "เริ่มต้นการใช้งาน ChemCorp วันนี้"
                    }}
                  </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleSubmit" class="space-y-5">
                  <div
                    v-if="error"
                    class="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-2xl font-bold text-center"
                  >
                    {{ error }}
                  </div>

                  <div v-if="!isLoginMode">
                    <label
                      class="block text-sm font-bold text-slate-700 mb-2 ml-1"
                      >ชื่อ-นามสกุล</label
                    >
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all font-medium"
                      placeholder="ชื่อสกุลของคุณ"
                    />
                  </div>

                  <div>
                    <label
                      class="block text-sm font-bold text-slate-700 mb-2 ml-1"
                      >อีเมล</label
                    >
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all font-medium"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label
                      class="block text-sm font-bold text-slate-700 mb-2 ml-1"
                      >รหัสผ่าน</label
                    >
                    <div class="relative">
                      <input
                        v-model="form.password"
                        :type="showPassword ? 'text' : 'password'"
                        required
                        class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all font-medium pr-14"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-2 cursor-pointer transition-colors"
                      >
                        <Eye v-if="!showPassword" class="w-5 h-5" />
                        <EyeOff v-else class="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="w-full py-4 bg-primary hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all shadow-indigo hover:shadow-indigo-lg hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer mt-4"
                  >
                    <span v-if="isLoading">กำลังดำเนินการ...</span>
                    <span v-else>{{
                      isLoginMode ? "เข้าสู่ระบบ" : "สมัครสมาชิก"
                    }}</span>
                  </button>
                </form>

                <!-- Footer Link -->
                <div class="mt-8 text-center bg-slate-50 p-6 rounded-3xl">
                  <p class="text-slate-500 font-bold mb-2">
                    {{
                      isLoginMode
                        ? "ยังไม่มีบัญชีใช่ไหม?"
                        : "มีบัญชีอยู่แล้วใช่ไหม?"
                    }}
                  </p>
                  <button
                    @click="
                      isLoginMode = !isLoginMode;
                      error = '';
                    "
                    class="text-primary font-black hover:text-blue-700 transition-colors cursor-pointer text-lg"
                  >
                    {{
                      isLoginMode ? "สมัครสมาชิกตอนนี้" : "เข้าสู่ระบบที่นี่"
                    }}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
