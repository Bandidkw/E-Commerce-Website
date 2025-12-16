<script setup lang="ts">
import { articles } from "../services/mockData";
import { Calendar, User, ArrowRight } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-16">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl font-bold mb-4">ข้อมูลเชิงลึกในอุตสาหกรรม</h1>
        <p class="text-gray-600 text-lg">
          อัพเดททิศทางล่าสุด แนวทางความปลอดภัย
          และบทความทางเทคนิคจากผู้เชี่ยวชาญของเรา
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
        >
          <div class="h-56 overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-8 flex-grow flex flex-col">
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span class="flex items-center gap-1"
                ><Calendar class="w-4 h-4" /> {{ article.date }}</span
              >
              <span class="flex items-center gap-1"
                ><User class="w-4 h-4" /> Admin</span
              >
            </div>
            <h2
              class="text-xl font-bold mb-4 hover:text-primary transition-colors"
            >
              <RouterLink to="#">{{ article.title }}</RouterLink>
            </h2>
            <p class="text-gray-600 mb-6 line-clamp-3 flex-grow">
              {{ article.excerpt }}
            </p>
            <RouterLink
              to="#"
              class="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              อ่านบทความ <ArrowRight class="w-4 h-4" />
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Pagination Placeholder -->
      <div class="flex justify-center mt-16">
        <button
          class="px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
        >
          โหลดบทความเพิ่มเติม
        </button>
      </div>
    </div>
  </div>
</template>
