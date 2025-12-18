<script setup lang="ts">
import { useToastStore } from "../../stores/toast";
import ToastItem from "./ToastItem.vue";

const toastStore = useToastStore();
</script>

<template>
  <div
    class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
  >
    <transition-group
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-400 ease-in absolute w-full"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
      move-class="transition duration-500 ease-in-out"
    >
      <ToastItem
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        v-bind="toast"
        @close="toastStore.remove(toast.id)"
      />
    </transition-group>
  </div>
</template>

<style scoped></style>
