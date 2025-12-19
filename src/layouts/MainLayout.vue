<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import CartDrawer from "../components/CartDrawer.vue";
import LoginModal from "../components/LoginModal.vue";
import CustomerLoginModal from "../components/CustomerLoginModal.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";

const loginModalRef = ref<InstanceType<typeof LoginModal>>();
const customerLoginModalRef = ref<InstanceType<typeof CustomerLoginModal>>();

const openLoginModal = () => {
  loginModalRef.value?.openModal();
};

const openCustomerLoginModal = (mode: "login" | "register" = "login") => {
  customerLoginModalRef.value?.openModal(mode);
};
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans text-dark">
    <!-- Header -->
    <TheHeader
      @open-login="openLoginModal"
      @open-customer-login="openCustomerLoginModal"
    />

    <!-- Main Content -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Footer -->
    <TheFooter @open-login="openLoginModal" />

    <CartDrawer />
    <LoginModal ref="loginModalRef" />
    <CustomerLoginModal ref="customerLoginModalRef" />
  </div>
</template>
