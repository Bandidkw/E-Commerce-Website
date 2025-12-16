<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../../stores/products";
import { ArrowLeft, Save } from "lucide-vue-next";
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
        {{ isEditing ? "Edit Product" : "Add New Product" }}
      </h1>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-8">
      <form @submit.prevent="saveProduct" class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Product Name</label
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
              >Category</label
            >
            <select
              v-model="form.category"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white"
            >
              <option value="" disabled>Select a category</option>
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
              >Price ($)</label
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

        <!-- Image URL -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Image URL</label
          >
          <input
            v-model="form.image"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
          <p class="text-xs text-gray-500 mt-1">Enter a valid image URL.</p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
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
            Save Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
