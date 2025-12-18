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
              class="relative transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-premium-lg transition-all w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-100"
            >
              <!-- Header -->
              <div class="bg-slate-50/50 px-10 py-8 border-b border-slate-100">
                <div class="flex items-center justify-between">
                  <DialogTitle
                    class="text-2xl font-black text-slate-900 flex items-center gap-4"
                  >
                    <div
                      class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-indigo"
                    >
                      <Package class="w-6 h-6" />
                    </div>
                    {{ isEditing ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่" }}
                  </DialogTitle>
                  <button
                    type="button"
                    class="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all cursor-pointer"
                    @click="emit('close')"
                  >
                    <X class="h-6 w-6" />
                  </button>
                </div>
              </div>

              <!-- Form Content -->
              <div class="flex-1 overflow-y-auto px-6 py-6">
                <form @submit.prevent="handleSave" class="space-y-8">
                  <!-- Name -->
                  <div>
                    <label
                      class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                      >ชื่อสินค้า</label
                    >
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700 transition-all"
                      placeholder="กรอกชื่อสินค้า"
                    />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Category -->
                    <div>
                      <label
                        class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                        >หมวดหมู่</label
                      >
                      <select
                        v-model="form.category"
                        required
                        class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700 bg-white transition-all appearance-none cursor-pointer"
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
                        class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                        >ราคา (บาท)</label
                      >
                      <input
                        v-model.number="form.price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700 transition-all"
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
                    <label
                      class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                      >รายละเอียดสินค้า</label
                    >
                    <textarea
                      v-model="form.description"
                      rows="4"
                      required
                      class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none resize-none font-bold text-slate-600 transition-all placeholder:text-slate-400"
                      placeholder="อธิบายคุณสมบัติและสเปกของสินค้า..."
                    ></textarea>
                  </div>

                  <!-- Footer Actions -->
                  <div class="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      @click="emit('close')"
                      class="px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all font-black cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      class="px-8 py-3.5 bg-primary text-white rounded-2xl hover:bg-primary-dark transition-all font-black flex items-center gap-3 cursor-pointer shadow-indigo hover:shadow-lg hover:-translate-y-1"
                    >
                      <Save class="w-5 h-5" />
                      บันทึกข้อมูลสินค้า
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
