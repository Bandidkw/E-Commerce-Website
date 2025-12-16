<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../../stores/products";
import { ArrowLeft, Save, Upload, Trash2 } from "lucide-vue-next";
import { categories } from "../../services/mockData";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const isEditing = computed(() => route.params.id !== undefined);
const productId = Number(route.params.id);

const form = ref({
  name: "",
  category: "",
  price: 0,
  image: "https://placehold.co/400",
  description: "",
});

onMounted(() => {
  if (isEditing.value) {
    const product = productStore.getProductById(productId);
    if (product) {
      form.value = { ...product };
    } else {
      router.push("/admin/products");
    }
  }
});

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.image = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const saveProduct = () => {
  if (isEditing.value) {
    productStore.updateProduct(productId, form.value);
  } else {
    productStore.addProduct(form.value);
  }
  router.push("/admin/products");
};
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
      <RouterLink
        to="/admin/products"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </RouterLink>
      <h1 class="text-2xl font-bold">
        {{ isEditing ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่" }}
      </h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-8">
      <form @submit.prevent="saveProduct" class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >ชื่อสินค้า</label
          >
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >หมวดหมู่</label
            >
            <select
              v-model="form.category"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white"
            >
              <option value="" disabled>เลือกหมวดหมู่</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >ราคา (บาท)</label
            >
            <input
              v-model="form.price"
              type="number"
              step="0.01"
              min="0"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >รูปภาพสินค้า</label
          >

          <!-- Image Preview -->
          <div
            v-if="form.image"
            class="mb-4 relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden group"
          >
            <img
              :src="form.image"
              alt="Preview"
              class="w-full h-full object-contain"
            />
            <div
              class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <button
                type="button"
                @click="form.image = ''"
                class="p-2 bg-white text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                title="ลบรูปภาพ"
              >
                <Trash2 class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- Upload Area -->
          <div v-else>
            <label
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload class="w-10 h-10 text-gray-400 mb-3" />
                <p class="mb-2 text-sm text-gray-500">
                  <span class="font-semibold">คลิกเพื่ออัปโหลด</span>
                  หรือลากไฟล์มาวาง
                </p>
                <p class="text-xs text-gray-500">PNG, JPG, GIF (สูงสุด 5MB)</p>
              </div>
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleFileUpload"
              />
            </label>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >รายละเอียดสินค้า</label
          >
          <textarea
            v-model="form.description"
            rows="4"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
          ></textarea>
        </div>

        <div class="flex justify-end pt-4">
          <button
            type="submit"
            class="px-8 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            <Save class="w-5 h-5" />
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
