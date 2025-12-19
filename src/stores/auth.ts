import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const orderHistory = ref<Order[]>([]);

  // Load from localStorage on init
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }

  const savedHistory = localStorage.getItem("order_history");
  if (savedHistory) {
    orderHistory.value = JSON.parse(savedHistory);
  }

  const isLoggedIn = computed(() => user.value !== null);
  const isAdmin = computed(() => user.value?.role === "admin");

  const login = async (
    email: string,
    password: string,
    role: "customer" | "admin" = "customer"
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock login logic
    if (role === "admin") {
      if (email === "admin" && password === "123456") {
        const adminUser: User = {
          id: "admin-1",
          name: "Super Admin",
          email: "admin@chemcorp.com",
          role: "admin",
        };
        user.value = adminUser;
        localStorage.setItem("user", JSON.stringify(adminUser));
        localStorage.setItem("admin_token", "true");
        return true;
      }
    } else {
      // Customer login (accept any non-empty password for simulation)
      if (password.length >= 4) {
        const customerUser: User = {
          id: `u-${Date.now()}`,
          name: email.split("@")[0] || email,
          email: email,
          role: "customer",
        };
        user.value = customerUser;
        localStorage.setItem("user", JSON.stringify(customerUser));
        return true;
      }
    }
    return false;
  };

  const register = async (name: string, email: string, _password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `u-${Date.now()}`,
      name: name,
      email: email,
      role: "customer",
    };
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("admin_token");
  };

  const addOrderToHistory = (order: Order) => {
    orderHistory.value.unshift(order);
    localStorage.setItem("order_history", JSON.stringify(orderHistory.value));
  };

  return {
    user,
    orderHistory,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout,
    addOrderToHistory,
  };
});
