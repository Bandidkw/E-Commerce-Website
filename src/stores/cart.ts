import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "./products";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);
  const isOpen = ref(false);

  const cartTotal = computed(() => {
    return items.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  const itemCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0);
  });

  const toggleCart = () => {
    isOpen.value = !isOpen.value;
  };

  const addToCart = (product: Product) => {
    const existingItem = items.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1,
      });
    }
    isOpen.value = true;
  };

  const removeFromCart = (id: number) => {
    const index = items.value.findIndex((item) => item.id === id);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(id);
      }
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    isOpen,
    cartTotal,
    itemCount,
    toggleCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
