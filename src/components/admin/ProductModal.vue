<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { X, Save, Upload, Trash2, Package } from "lucide-vue-next";
import { useProductStore } from "../../stores/products";
import { useToastStore } from "../../stores/toast";
import { categories } from "../../services/mockData";
import type { Product } from "../../stores/products";

const props = defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save"): void;
}>();

const productStore = useProductStore();
const toast = useToastStore();

const isEditing = computed(() => !!props.product);

const form = ref({
  name: "",
  category: "",
  price: 0,
  image: "https://placehold.co/400",
  description: "",
});

const resetForm = () => {
  form.value = {
    name: "",
    category: "",
    price: 0,
    image: "https://placehold.co/400",
    description: "",
  };
};

// Watch for product changes to populate the form
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      form.value = { ...newProduct };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

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

const handleSave = () => {
  if (isEditing.value && props.product) {
    productStore.updateProduct(props.product.id, form.value);
    toast.success("อัปเดตข้อมูลสินค้าเรียบร้อยแล้ว");
  } else {
    productStore.addProduct(form.value);
    toast.success("เพิ่มสินค้าใหม่เรียบร้อยแล้ว");
  }
  emit("save");
  emit("close");
};
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-[100]" @close="emit('close')">
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
        <div class="flex min-h-full items-center justify-center p-4">
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
              class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all w-full max-w-2xl flex flex-col"
            >
              <!-- Header -->
              <div class="bg-white px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <DialogTitle
                    class="text-xl font-bold text-gray-900 flex items-center gap-2"
                  >
                    <Package class="w-6 h-6 text-primary" />
                    {{ isEditing ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่" }}
                  </DialogTitle>
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
                    @click="emit('close')"
                  >
                    <X class="h-6 w-6" />
                  </button>
                </div>
              </div>

              <!-- Form Content -->
              <div class="flex-1 overflow-y-auto px-6 py-6">
                <form @submit.prevent="handleSave" class="space-y-6">
                  <!-- Name -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >ชื่อสินค้า</label
                    >
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                      placeholder="กรอกชื่อสินค้า"
                    />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Category -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >หมวดหมู่</label
                      >
                      <select
                        v-model="form.category"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white text-sm"
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
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >ราคา (บาท)</label
                      >
                      <input
                        v-model.number="form.price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                      />
                    </div>
                  </div>

                  <!-- Image Upload -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >รูปภาพสินค้า</label
                    >
                    <div
                      v-if="form.image"
                      class="mb-4 relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden group"
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
                          class="p-2 bg-white text-red-500 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <Trash2 class="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div v-else>
                      <label
                        class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div
                          class="flex flex-col items-center justify-center pt-5 pb-6"
                        >
                          <Upload class="w-8 h-8 text-gray-400 mb-2" />
                          <p
                            class="text-sm text-gray-500 font-semibold text-center px-4"
                          >
                            คลิกเพื่ออัปโหลด หรือลากไฟล์มาวาง
                          </p>
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
                      rows="3"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none text-sm"
                      placeholder="กรอกรายละเอียดสินค้า..."
                    ></textarea>
                  </div>

                  <!-- Footer Actions -->
                  <div class="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      @click="emit('close')"
                      class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      class="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Save class="w-4 h-4" />
                      บันทึกข้อมูล
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
