<script setup lang="ts">
import { computed } from "vue";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-vue-next";
import type { ToastType } from "../../stores/toast";

const props = defineProps<{
  id: number;
  type: ToastType;
  message: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const config = computed(() => {
  switch (props.type) {
    case "success":
      return {
        icon: CheckCircle,
        bg: "bg-green-500",
        text: "text-white",
        border: "border-green-600",
      };
    case "error":
      return {
        icon: XCircle,
        bg: "bg-red-500",
        text: "text-white",
        border: "border-red-600",
      };
    case "warning":
      return {
        icon: AlertTriangle,
        bg: "bg-orange-500",
        text: "text-white",
        border: "border-orange-600",
      };
    case "info":
    default:
      return {
        icon: Info,
        bg: "bg-blue-500",
        text: "text-white",
        border: "border-blue-600",
      };
  }
});
</script>

<template>
  <div
    class="flex items-center gap-3 p-4 rounded-xl shadow-2xl border pointer-events-auto min-w-[300px] max-w-md transform transition-all duration-300"
    :class="[config.bg, config.text, config.border]"
  >
    <component :is="config.icon" class="w-6 h-6 shrink-0" />
    <p class="flex-1 font-medium">{{ message }}</p>
    <button
      @click="emit('close')"
      class="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</template>
