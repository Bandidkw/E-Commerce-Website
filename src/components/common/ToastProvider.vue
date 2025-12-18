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
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-12 opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in position-absolute"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
      move-class="transition duration-300"
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

<style scoped>
.position-absolute {
  position: absolute;
}
</style>
