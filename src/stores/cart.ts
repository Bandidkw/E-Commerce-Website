import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "./products";
import { useToastStore } from "./toast";

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
  const toast = useToastStore();

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
    toast.success(`เพิ่ม ${product.name} ลงในรถเข็นแล้ว`);
    isOpen.value = true;
  };

  const removeFromCart = (id: number) => {
    const item = items.value.find((item) => item.id === id);
    const index = items.value.findIndex((item) => item.id === id);
    if (index > -1) {
      const name = item?.name;
      items.value.splice(index, 1);
      toast.info(`ลบ ${name} ออกจากรถเข็นแล้ว`);
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
    toast.info("ล้างรถเข็นเรียบร้อยแล้ว");
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
