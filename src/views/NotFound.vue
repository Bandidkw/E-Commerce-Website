<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Home } from "lucide-vue-next";
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary opacity-20">404</h1>
      <div class="mt-[-50px] relative z-10">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          <Home class="w-5 h-5" />
          Back to Home
        </RouterLink>
      </div>
    </div>
  </div>
</template>
