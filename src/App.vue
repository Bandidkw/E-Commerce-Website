<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowUp } from "lucide-vue-next";

const showBackToTop = ref(false);

const checkScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- Back to Top Button -->
  <button
    @click="scrollToTop"
    :class="[
      'fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 transform cursor-pointer',
      showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
    ]"
  >
    <ArrowUp class="w-6 h-6" />
  </button>
</template>

<style>
/* Enhanced Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}

/* Scroll Animation Utilities */
.fade-up-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* Back to Top Button Animation */
button.fixed {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button.fixed:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(15, 76, 129, 0.4);
}

button.fixed:active {
  transform: translateY(0) scale(0.98);
}
</style>
