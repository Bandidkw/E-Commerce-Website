<script setup lang="ts">
import { Award, Users, History, ShieldCheck } from "lucide-vue-next";
</script>

<template>
  <div>
    <!-- Header -->
    <section class="bg-dark text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">เกี่ยวกับ ChemCorp</h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          สร้างความเชื่อมั่นด้วยคุณภาพและนวัตกรรมตั้งแต่ปี 1995
        </p>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="md:w-1/2">
            <img
              src="/images/factory.jpg"
              alt="Factory"
              class="rounded-xl shadow-lg w-full"
            />
          </div>
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold mb-6 text-primary">
              เรื่องราวของเรา
            </h2>
            <p class="text-gray-600 mb-4">
              ก่อตั้งขึ้นในปี 1995 ChemCorp
              เติบโตจากผู้จัดจำหน่ายในท้องถิ่นสู่ผู้นำด้านการจัดจำหน่ายสารเคมีอุตสาหกรรมในเอเชียตะวันออกเฉียงใต้
              เราเชี่ยวชาญในการจัดหาโซลูชั่นเคมีคุณภาพสูงสำหรับการบำบัดน้ำ
              การผลิตสิ่งทอ และอุตสาหกรรมแปรรูปอาหาร
            </p>
            <p class="text-gray-600 mb-4">
              พันธกิจของเราคือการเสริมสร้างศักยภาพให้กับอุตสาหกรรมด้วยโซลูชั่นเคมีที่ยั่งยืนและมีประสิทธิภาพ
              พร้อมรักษามาตรฐานความปลอดภัยและความรับผิดชอบต่อสิ่งแวดล้อมสูงสุด
            </p>
            <div class="grid grid-cols-2 gap-6 mt-8">
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-3xl font-bold text-primary mb-1">25+</div>
                <div class="text-sm text-gray-500">ปีแห่งประสบการณ์</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-3xl font-bold text-primary mb-1">1000+</div>
                <div class="text-sm text-gray-500">ลูกค้าที่พึงพอใจ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">ทำไมต้องเลือกเรา</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-sm text-center">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ShieldCheck class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-4">การประกันคุณภาพ</h3>
            <p class="text-gray-600">
              ผลิตภัณฑ์ทุกชิ้นผ่านการทดสอบอย่างเข้มงวดและมีเอกสารครบถ้วน
              (COA/MSDS)
            </p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm text-center">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Users class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-4">ทีมผู้เชี่ยวชาญ</h3>
            <p class="text-gray-600">
              ทีมวิศวกรเคมีและผู้เชี่ยวชาญทางเทคนิคของเราพร้อมให้ความช่วยเหลือคุณเสมอ
            </p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm text-center">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <History class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-4">บริการที่เชื่อถือได้</h3>
            <p class="text-gray-600">
              เราภูมิใจในการจัดส่งที่ตรงเวลาและการสนับสนุนลูกค้าที่รวดเร็ว
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section class="py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-12">ใบรับรองของเรา</h2>
        <div
          class="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <!-- Placeholders for logos -->
          <div class="flex flex-col items-center">
            <Award class="w-20 h-20 text-gray-400 mb-2" />
            <span class="font-bold text-gray-500">ISO 9001:2015</span>
          </div>
          <div class="flex flex-col items-center">
            <Award class="w-20 h-20 text-gray-400 mb-2" />
            <span class="font-bold text-gray-500">ISO 14001</span>
          </div>
          <div class="flex flex-col items-center">
            <Award class="w-20 h-20 text-gray-400 mb-2" />
            <span class="font-bold text-gray-500">GMP Certified</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
