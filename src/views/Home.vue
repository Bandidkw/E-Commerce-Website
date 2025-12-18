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
    <section
      class="relative bg-slate-950 text-white py-32 lg:py-48 overflow-hidden"
    >
      <!-- Background Mesh Gradient -->
      <div class="absolute inset-0 z-0">
        <div
          class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"
        ></div>
        <div
          class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700"
        ></div>
        <img
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Laboratory"
          class="w-full h-full object-cover opacity-20"
        />
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl">
          <div
            class="flex items-center gap-2 mb-8 reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out"
          >
            <span
              class="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary-light rounded-full text-xs font-black uppercase tracking-widest"
              >Premium Quality</span
            >
            <span class="w-12 h-px bg-slate-800"></span>
            <span
              class="text-slate-400 text-xs font-bold uppercase tracking-widest"
              >Direct Manufacturer</span
            >
          </div>

          <h1
            class="text-5xl md:text-8xl font-black mb-8 leading-[1.05] reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100 ease-out"
          >
            โซลูชั่นเคมี
            <span class="text-gradient">ระดับพรีเมียม</span>
          </h1>
          <p
            class="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out"
          >
            พันธมิตรที่คุณไว้วางใจสำหรับสารเคมีอุตสาหกรรมคุณภาพสูง
            เราจัดหาผลิตภัณฑ์ที่ได้รับการรับรอง ความเชี่ยวชาญทางเทคนิค
            และการจัดส่งที่เชื่อถือได้ทั่วประเทศ
          </p>
          <div
            class="flex flex-col sm:flex-row gap-6 reveal opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-out"
          >
            <RouterLink
              to="/products"
              class="px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-lg transition-all shadow-indigo hover:shadow-lg hover:-translate-y-1 text-center"
            >
              ดูสินค้าทั้งหมด
            </RouterLink>
            <RouterLink
              to="/contact"
              class="px-10 py-5 bg-slate-900/50 backdrop-blur-md border border-slate-800 hover:border-primary/50 text-white rounded-2xl font-black text-lg transition-all hover:bg-slate-800 text-center"
            >
              ขอใบเสนอราคา
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- USP Section -->
    <section class="py-24 bg-white relative">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            class="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-premium transition-all duration-500 reveal opacity-0 translate-y-10 ease-out"
          >
            <div
              class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"
            >
              <CheckCircle class="w-7 h-7 text-primary" />
            </div>
            <h3 class="text-2xl font-black mb-3 text-slate-900">
              สินค้าพร้อมส่ง
            </h3>
            <p class="text-slate-600 leading-relaxed">
              คลังสินค้าขนาดใหญ่พร้อมจัดส่งทันทีเพื่อรองรับการดำเนินงานของคุณอย่างไม่มีสะดุด
            </p>
          </div>
          <div
            class="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-premium transition-all duration-500 reveal opacity-0 translate-y-10 delay-100 ease-out"
          >
            <div
              class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"
            >
              <Truck class="w-7 h-7 text-primary" />
            </div>
            <h3 class="text-2xl font-black mb-3 text-slate-900">
              จัดส่งรวดเร็ว
            </h3>
            <p class="text-slate-600 leading-relaxed">
              เครือข่ายโลจิสติกส์ที่มีประสิทธิภาพรับประกันการจัดส่งทันเวลาทั่วทั้งภูมิภาค
            </p>
          </div>
          <div
            class="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-premium transition-all duration-500 reveal opacity-0 translate-y-10 delay-200 ease-out"
          >
            <div
              class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"
            >
              <Users class="w-7 h-7 text-primary" />
            </div>
            <h3 class="text-2xl font-black mb-3 text-slate-900">
              ผู้เชี่ยวชาญ
            </h3>
            <p class="text-slate-600 leading-relaxed">
              ทีมที่ปรึกษาทางเทคนิคพร้อมให้คำแนะนำและโซลูชั่นที่ตรงจุดสำหรับอุตสาหกรรมของคุณ
            </p>
          </div>
          <div
            class="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-premium transition-all duration-500 reveal opacity-0 translate-y-10 delay-300 ease-out"
          >
            <div
              class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"
            >
              <Shield class="w-7 h-7 text-primary" />
            </div>
            <h3 class="text-2xl font-black mb-3 text-slate-900">มาตรฐานสากล</h3>
            <p class="text-slate-600 leading-relaxed">
              ผลิตภัณฑ์ทุกชิ้นได้รับการตรวจสอบคุณภาพและมีใบรับระดับการันตีความปลอดภัย
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-32 bg-slate-50">
      <div class="container mx-auto px-6">
        <div
          class="flex flex-col md:flex-row justify-between items-end gap-6 mb-16"
        >
          <div class="max-w-2xl">
            <h2
              class="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight"
            >
              สินค้าแนะนำ <span class="text-primary">ยอดนิยม</span>
            </h2>
            <p class="text-slate-600 text-lg">
              ค้นพบโซลูชั่นเคมีอุตสาหกรรมที่ขายดีที่สุดและเป็นที่นิยมของเรา
              ซึ่งได้รับการยอมรับจากทั่วทุกมุมโลก
            </p>
          </div>
          <RouterLink
            to="/products"
            class="group flex items-center gap-2 text-primary font-black hover:text-primary-dark transition-colors"
          >
            ดูสินค้าทั้งหมด
            <div
              class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300"
            >
              <ArrowRight class="w-5 h-5" />
            </div>
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-24 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark z-0"
      ></div>
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] z-0"
      ></div>

      <div class="container mx-auto px-6 relative z-10 text-center">
        <h2
          class="text-4xl md:text-6xl font-black mb-8 text-white leading-tight"
        >
          ต้องการโซลูชั่นเคมี
          <span class="text-primary-light italic">เฉพาะทาง?</span>
        </h2>
        <p
          class="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          ทีมวิศวกรและผู้เชี่ยวชาญของเราพร้อมสนับสนุนคุณในการค้นพบโซลูชั่นเคมีที่สมบูรณ์แบบสำหรับความต้องการเฉพาะทางในธุรกิจของคุณ
        </p>
        <RouterLink
          to="/contact"
          class="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1"
        >
          ติดต่อผู้เชี่ยวชาญ <ArrowRight class="w-6 h-6" />
        </RouterLink>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="py-32 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-black mb-6 text-slate-900">
            ข้อมูลเชิงลึกในอุตสาหกรรม
          </h2>
          <p class="text-slate-600 text-lg">
            ติดตามความเคลื่อนไหวและเทคโนโลยีล่าสุดในวงการเคมีอุตสาหกรรม
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            v-for="article in latestArticles"
            :key="article.id"
            class="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-2"
          >
            <div class="h-64 overflow-hidden relative">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute top-4 left-4">
                <span
                  class="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-black text-primary uppercase"
                  >Insight</span
                >
              </div>
            </div>
            <div class="p-8">
              <div
                class="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2"
              >
                <span class="w-8 h-px bg-slate-200"></span>
                {{ article.date }}
              </div>
              <h3
                class="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight"
              >
                <RouterLink to="/blog">{{ article.title }}</RouterLink>
              </h3>
              <p class="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                {{ article.excerpt }}
              </p>
              <RouterLink
                to="/blog"
                class="inline-flex items-center gap-2 text-primary font-black hover:gap-3 transition-all"
                >อ่านเพิ่มเติม <ArrowRight class="w-4 h-4" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
