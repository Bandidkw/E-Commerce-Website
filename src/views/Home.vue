<script setup lang="ts">
import { ArrowRight, CheckCircle, Shield, Truck, Users } from "lucide-vue-next";
import { products, articles } from "../services/mockData";
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import ProductCard from "../components/ProductCard.vue";

const featuredProducts = products.slice(0, 4);
const latestArticles = articles.slice(0, 3);

// Scroll Animation Logic
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("translate-y-0", "opacity-100");
          entry.target.classList.remove("translate-y-10", "opacity-0");
          observer.value?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.value?.observe(el);
  });
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-dark text-white py-24 lg:py-32 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Laboratory"
          class="w-full h-full object-cover opacity-20"
        />
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl">
          <h1
            class="text-4xl md:text-6xl font-bold mb-6 leading-tight reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out"
          >
            โซลูชั่นเคมีอุตสาหกรรม
            <span class="text-secondary">ระดับพรีเมียม</span>
          </h1>
          <p
            class="text-xl text-gray-300 mb-8 max-w-2xl reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out"
          >
            พันธมิตรที่คุณไว้วางใจสำหรับสารเคมีอุตสาหกรรมคุณภาพสูง
            เราจัดหาผลิตภัณฑ์ที่ได้รับการรับรอง ความเชี่ยวชาญทางเทคนิค
            และการจัดส่งที่เชื่อถือได้สำหรับความต้องการทางธุรกิจของคุณ
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 reveal opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-out"
          >
            <RouterLink
              to="/products"
              class="px-8 py-4 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors text-center"
            >
              ดูสินค้าทั้งหมด
            </RouterLink>
            <RouterLink
              to="/contact"
              class="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-dark text-white rounded-lg font-bold text-lg transition-colors text-center"
            >
              ขอใบเสนอราคา
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- USP Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            class="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow reveal opacity-0 translate-y-10 transition-all duration-700 ease-out"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
            >
              <CheckCircle class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">สินค้าพร้อมส่ง</h3>
            <p class="text-gray-600">
              คลังสินค้าขนาดใหญ่พร้อมจัดส่งทันทีเพื่อรองรับการดำเนินงานของคุณ
            </p>
          </div>
          <div
            class="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow reveal opacity-0 translate-y-10 transition-all duration-700 delay-100 ease-out"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
            >
              <Truck class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">จัดส่งรวดเร็ว</h3>
            <p class="text-gray-600">
              เครือข่ายโลจิสติกส์ที่มีประสิทธิภาพรับประกันการจัดส่งทันเวลาทั่วประเทศ
            </p>
          </div>
          <div
            class="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow reveal opacity-0 translate-y-10 transition-all duration-700 delay-200 ease-out"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
            >
              <Users class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">บริการสนับสนุนทางเทคนิค</h3>
            <p class="text-gray-600">
              ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษาทางเทคนิคและแนวทางแก้ไขปัญหา
            </p>
          </div>
          <div
            class="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow reveal opacity-0 translate-y-10 transition-all duration-700 delay-300 ease-out"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
            >
              <Shield class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">คุณภาพที่ได้รับการรับรอง</h3>
            <p class="text-gray-600">
              ผลิตภัณฑ์ทุกชิ้นมีใบรับรอง COA/MSDS และได้มาตรฐานสากล
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl font-bold mb-2">สินค้าแนะนำ</h2>
            <p class="text-gray-600">
              ค้นพบโซลูชั่นอุตสาหกรรมที่ขายดีที่สุดของเรา
            </p>
          </div>
          <RouterLink
            to="/products"
            class="hidden md:flex items-center text-primary font-medium hover:underline"
          >
            ดูสินค้าทั้งหมด <ArrowRight class="w-4 h-4 ml-1" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="mt-8 text-center md:hidden">
          <RouterLink
            to="/products"
            class="inline-flex items-center text-primary font-medium hover:underline"
          >
            ดูสินค้าทั้งหมด <ArrowRight class="w-4 h-4 ml-1" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-primary text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          ต้องการโซลูชั่นเฉพาะทาง?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          ทีมผู้เชี่ยวชาญของเราพร้อมช่วยคุณค้นหาโซลูชั่นเคมีที่สมบูรณ์แบบสำหรับความต้องการเฉพาะของคุณ
        </p>
        <RouterLink
          to="/contact"
          class="inline-block px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
        >
          ติดต่อผู้เชี่ยวชาญของเรา
        </RouterLink>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">
          ข้อมูลเชิงลึกในอุตสาหกรรม
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="article in latestArticles"
            :key="article.id"
            class="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="h-48 overflow-hidden">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <div class="text-sm text-gray-500 mb-2">{{ article.date }}</div>
              <h3
                class="text-xl font-bold mb-3 hover:text-primary transition-colors"
              >
                <RouterLink to="/blog">{{ article.title }}</RouterLink>
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ article.excerpt }}
              </p>
              <RouterLink
                to="/blog"
                class="text-primary font-medium hover:underline text-sm"
                >อ่านเพิ่มเติม</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
