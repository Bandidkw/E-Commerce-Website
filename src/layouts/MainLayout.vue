<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import CartDrawer from "../components/CartDrawer.vue";
import LoginModal from "../components/LoginModal.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";

const loginModalRef = ref<InstanceType<typeof LoginModal>>();

const openLoginModal = () => {
  loginModalRef.value?.openModal();
};
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans text-dark">
    <!-- Header -->
    <TheHeader @open-login="openLoginModal" />

    <!-- Main Content -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Footer -->
    <TheFooter />

    <CartDrawer />
    <LoginModal ref="loginModalRef" />
  </div>
</template>
