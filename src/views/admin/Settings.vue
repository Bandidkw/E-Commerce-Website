<script setup lang="ts">
import { ref } from "vue";
import { User, Lock, Globe, Bell, Save } from "lucide-vue-next";

const activeTab = ref("profile");

const profileForm = ref({
  name: "Admin User",
  email: "admin@chemcorp.com",
  phone: "02-123-4567",
});

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const siteForm = ref({
  siteName: "ChemCorp",
  contactEmail: "contact@chemcorp.com",
  currency: "THB",
});

const notificationForm = ref({
  emailAlerts: true,
  orderUpdates: true,
  marketing: false,
});

const saveProfile = () => {
  // Mock save
  alert("บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว");
};

const updatePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert("รหัสผ่านใหม่ไม่ตรงกัน");
    return;
  }
  // Mock update
  alert("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
  passwordForm.value = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};

const saveSiteSettings = () => {
  // Mock save
  alert("บันทึกการตั้งค่าเว็บไซต์เรียบร้อยแล้ว");
};

const saveNotifications = () => {
  // Mock save
  alert("บันทึกการตั้งค่าการแจ้งเตือนเรียบร้อยแล้ว");
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">ตั้งค่า</h1>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar Navigation -->
      <div class="w-full md:w-64 flex-shrink-0">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <nav class="flex flex-col">
            <button
              @click="activeTab = 'profile'"
              class="flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer"
              :class="
                activeTab === 'profile'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              "
            >
              <User class="w-5 h-5" />
              ข้อมูลส่วนตัว
            </button>
            <button
              @click="activeTab = 'password'"
              class="flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer"
              :class="
                activeTab === 'password'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              "
            >
              <Lock class="w-5 h-5" />
              รหัสผ่าน
            </button>
            <button
              @click="activeTab = 'site'"
              class="flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer"
              :class="
                activeTab === 'site'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              "
            >
              <Globe class="w-5 h-5" />
              ตั้งค่าเว็บไซต์
            </button>
            <button
              @click="activeTab = 'notifications'"
              class="flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer"
              :class="
                activeTab === 'notifications'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              "
            >
              <Bell class="w-5 h-5" />
              การแจ้งเตือน
            </button>
          </nav>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1">
        <!-- Profile Settings -->
        <div
          v-if="activeTab === 'profile'"
          class="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 class="text-lg font-bold mb-6 flex items-center gap-2">
            <User class="w-5 h-5 text-primary" />
            ข้อมูลส่วนตัว
          </h2>
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >ชื่อ-นามสกุล</label
                >
                <input
                  v-model="profileForm.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >เบอร์โทรศัพท์</label
                >
                <input
                  v-model="profileForm.phone"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >อีเมล</label
              >
              <input
                v-model="profileForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save class="w-4 h-4" />
                บันทึกข้อมูล
              </button>
            </div>
          </form>
        </div>

        <!-- Password Settings -->
        <div
          v-if="activeTab === 'password'"
          class="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 class="text-lg font-bold mb-6 flex items-center gap-2">
            <Lock class="w-5 h-5 text-primary" />
            เปลี่ยนรหัสผ่าน
          </h2>
          <form @submit.prevent="updatePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >รหัสผ่านปัจจุบัน</label
              >
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >รหัสผ่านใหม่</label
              >
              <input
                v-model="passwordForm.newPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >ยืนยันรหัสผ่านใหม่</label
              >
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save class="w-4 h-4" />
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
          </form>
        </div>

        <!-- Site Settings -->
        <div
          v-if="activeTab === 'site'"
          class="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 class="text-lg font-bold mb-6 flex items-center gap-2">
            <Globe class="w-5 h-5 text-primary" />
            ตั้งค่าเว็บไซต์
          </h2>
          <form @submit.prevent="saveSiteSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >ชื่อเว็บไซต์</label
              >
              <input
                v-model="siteForm.siteName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >อีเมลติดต่อ</label
              >
              <input
                v-model="siteForm.contactEmail"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >สกุลเงิน</label
              >
              <select
                v-model="siteForm.currency"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="THB">THB (฿)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save class="w-4 h-4" />
                บันทึกการตั้งค่า
              </button>
            </div>
          </form>
        </div>

        <!-- Notification Settings -->
        <div
          v-if="activeTab === 'notifications'"
          class="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 class="text-lg font-bold mb-6 flex items-center gap-2">
            <Bell class="w-5 h-5 text-primary" />
            การแจ้งเตือน
          </h2>
          <form @submit.prevent="saveNotifications" class="space-y-4">
            <div
              class="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900">การแจ้งเตือนทางอีเมล</p>
                <p class="text-sm text-gray-500">
                  รับข่าวสารและการแจ้งเตือนผ่านอีเมล
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationForm.emailAlerts"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                ></div>
              </label>
            </div>
            <div
              class="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900">อัปเดตคำสั่งซื้อ</p>
                <p class="text-sm text-gray-500">
                  แจ้งเตือนเมื่อมีคำสั่งซื้อใหม่หรือมีการเปลี่ยนแปลงสถานะ
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationForm.orderUpdates"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                ></div>
              </label>
            </div>
            <div
              class="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900">ข่าวสารและการตลาด</p>
                <p class="text-sm text-gray-500">
                  รับข้อมูลโปรโมชั่นและข่าวสารล่าสุด
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationForm.marketing"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                ></div>
              </label>
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save class="w-4 h-4" />
                บันทึกการตั้งค่า
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
