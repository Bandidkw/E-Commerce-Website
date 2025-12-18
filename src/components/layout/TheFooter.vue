<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Phone, Mail, MapPin } from "lucide-vue-next";
</script>

<template>
  <footer class="bg-slate-950 text-white pt-20 pb-10">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <!-- Company Info -->
        <div>
          <div
            class="text-2xl font-black text-white mb-6 flex items-center gap-3"
          >
            <div
              class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-indigo"
            >
              C
            </div>
            ChemCorp
          </div>
          <p class="text-slate-400 mb-8 leading-relaxed">
            ผู้นำด้านการจัดจำหน่ายสารเคมีอุตสาหกรรมและโซลูชั่น มุ่งมั่นในคุณภาพ
            ความปลอดภัย และนวัตกรรมเพื่ออนาคตที่ยั่งยืน
          </p>
          <div class="flex gap-4">
            <!-- Social Icons Placeholder -->
            <div
              class="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-primary transition-smooth hover-lift cursor-pointer group"
            >
              <span class="font-bold group-hover:scale-110 transition-transform"
                >F</span
              >
            </div>
            <div
              class="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-primary transition-smooth hover-lift cursor-pointer group"
            >
              <span class="font-bold group-hover:scale-110 transition-transform"
                >L</span
              >
            </div>
            <div
              class="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-primary transition-smooth hover-lift cursor-pointer group"
            >
              <span class="font-bold group-hover:scale-110 transition-transform"
                >X</span
              >
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3
            class="text-base font-black text-white uppercase tracking-widest mb-8"
          >
            ลิงก์ด่วน
          </h3>
          <ul class="space-y-4">
            <li>
              <RouterLink
                to="/"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                หน้าแรก
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                เกี่ยวกับเรา
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                สินค้า
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/downloads"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                ดาวน์โหลด
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/blog"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                บทความ
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Products -->
        <div>
          <h3
            class="text-base font-black text-white uppercase tracking-widest mb-8"
          >
            สินค้า
          </h3>
          <ul class="space-y-4">
            <li>
              <RouterLink
                to="/products"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                การบำบัดน้ำ
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                ตัวทำละลายอุตสาหกรรม
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                สารเจือปนอาหาร
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-slate-400 hover:text-white transition-smooth flex items-center gap-2 group"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:w-3 transition-all"
                ></div>
                เคมีสิ่งทอ
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3
            class="text-base font-black text-white uppercase tracking-widest mb-8"
          >
            ติดต่อเรา
          </h3>
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0"
              >
                <MapPin class="w-5 h-5 text-primary" />
              </div>
              <span class="text-slate-400 text-sm leading-relaxed"
                >123 นิคมอุตสาหกรรม บางนา กรุงเทพฯ 10260 ประเทศไทย</span
              >
            </li>
            <li class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0"
              >
                <Phone class="w-5 h-5 text-primary" />
              </div>
              <span class="text-slate-400 text-sm">+66 2 123 4567</span>
            </li>
            <li class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0"
              >
                <Mail class="w-5 h-5 text-primary" />
              </div>
              <span
                class="text-slate-400 text-sm font-medium hover:text-white transition-colors cursor-pointer"
                >sales@chemcorp.com</span
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-slate-800/50 pt-10 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <p class="font-medium">
          &copy; {{ new Date().getFullYear() }}
          <span class="text-slate-300">ChemCorp.</span> All rights reserved.
        </p>
        <div class="flex items-center gap-8">
          <div class="flex gap-6 font-medium">
            <span class="hover:text-slate-300 transition-colors cursor-pointer"
              >Privacy Policy</span
            >
            <span class="hover:text-slate-300 transition-colors cursor-pointer"
              >Terms of Service</span
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
