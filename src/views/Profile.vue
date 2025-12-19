<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { Mail, Calendar, User, Shield, Key, Bell } from "lucide-vue-next";
import { useToastStore } from "../stores/toast";

const authStore = useAuthStore();
const toast = useToastStore();

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const handleUpdateProfile = () => {
  toast.success("บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว (จำลอง)");
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <!-- Account Details -->
    <div
      class="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden"
    >
      <div class="p-8 md:p-10">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10"
        >
          <div>
            <h2 class="text-2xl font-black text-slate-900 tracking-tight">
              ข้อมูลส่วนตัว
            </h2>
            <p class="text-slate-500 font-medium text-sm">
              จัดการข้อมูลพื้นฐานและการติดต่อของคุณ
            </p>
          </div>
          <button
            @click="handleUpdateProfile"
            class="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 cursor-pointer"
          >
            บันทึกข้อมูล
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-2">
            <label
              class="text-sm font-black text-slate-400 uppercase tracking-widest px-2"
              >ชื่อผู้ใช้งาน</label
            >
            <div class="relative group">
              <User
                class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors"
              />
              <input
                type="text"
                :value="authStore.user?.name"
                class="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-slate-900 transition-all focus:ring-4 focus:ring-primary/5"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="text-sm font-black text-slate-400 uppercase tracking-widest px-2"
              >ที่อยู่อีเมล</label
            >
            <div class="relative group">
              <Mail
                class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              />
              <input
                type="email"
                :value="authStore.user?.email"
                disabled
                class="w-full pl-14 pr-6 py-4 bg-slate-100 border border-transparent rounded-2xl outline-none font-bold text-slate-500 cursor-not-allowed opacity-70"
                title="อีเมลไม่สามารถแก้ไขได้"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="text-sm font-black text-slate-400 uppercase tracking-widest px-2"
              >วันที่สมัครสมาชิก</label
            >
            <div class="relative group">
              <Calendar
                class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              />
              <input
                type="text"
                :value="formatDate(new Date().toISOString())"
                disabled
                class="w-full pl-14 pr-6 py-4 bg-slate-100 border border-transparent rounded-2xl outline-none font-bold text-slate-500 cursor-not-allowed opacity-70"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="text-sm font-black text-slate-400 uppercase tracking-widest px-2"
              >เบอร์โทรศัพท์</label
            >
            <div class="relative group">
              <Bell
                class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors"
              />
              <input
                type="text"
                placeholder="ระบุเบอร์โทรศัพท์ของคุณ"
                class="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-slate-900 transition-all focus:ring-4 focus:ring-primary/5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-8 group hover:border-primary/20 transition-all duration-500"
      >
        <div class="flex items-start justify-between mb-8">
          <div
            class="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-500"
          >
            <Key class="w-7 h-7" />
          </div>
          <button
            class="text-indigo-600 font-bold hover:underline cursor-pointer"
          >
            แก้ไข
          </button>
        </div>
        <h3 class="text-xl font-black text-slate-900 mb-2">รหัสผ่าน</h3>
        <p class="text-slate-500 font-medium text-sm mb-6">
          เปลี่ยนรหัสผ่านเพื่อความปลอดภัยที่ดียิ่งขึ้น
        </p>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-bold text-slate-400 tracking-widest"
            >••••••••••••</span
          >
        </div>
      </div>

      <div
        class="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-8 group hover:border-emerald-500/20 transition-all duration-500"
      >
        <div class="flex items-start justify-between mb-8">
          <div
            class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-500"
          >
            <Shield class="w-7 h-7" />
          </div>
          <button
            class="text-emerald-600 font-bold hover:underline cursor-pointer"
          >
            เปิดใช้งาน
          </button>
        </div>
        <h3 class="text-xl font-black text-slate-900 mb-2">
          การยืนยันตัวตน 2 ขั้นตอน
        </h3>
        <p class="text-slate-500 font-medium text-sm mb-6">
          เพิ่มระดับการปกป้องบัญชีของคุณให้ปลอดภัยสูงสุด
        </p>
        <span
          class="px-3 py-1 bg-slate-100 text-slate-400 text-xs font-black rounded-lg uppercase tracking-wider"
          >ปิดใช้งาน</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-premium {
  box-shadow: 0 10px 50px -10px rgba(0, 0, 0, 0.04);
}
</style>
