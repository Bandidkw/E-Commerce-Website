import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { products as initialProducts } from "../services/mockData";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  specs?: Record<string, string>;
}

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([...initialProducts]);

  const getAllProducts = computed(() => products.value);

  const getProductById = (id: number) => {
    return products.value.find((p) => p.id === id);
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newId = Math.max(...products.value.map((p) => p.id), 0) + 1;
    products.value.push({ ...product, id: newId });
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value[index] = {
        ...products.value[index],
        ...updatedProduct,
        id,
      } as Product;
    }
  };

  const deleteProduct = (id: number) => {
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
  };

  return {
    products,
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});
