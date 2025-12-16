<script setup lang="ts">
import { FileText, Download } from "lucide-vue-next";

const documents = [
  {
    id: 1,
    name: "Product Catalog 2024",
    type: "PDF",
    size: "5.2 MB",
    date: "2023-11-01",
  },
  {
    id: 2,
    name: "Safety Guidelines Manual",
    type: "PDF",
    size: "2.8 MB",
    date: "2023-10-15",
  },
  {
    id: 3,
    name: "ISO 9001:2015 Certificate",
    type: "PDF",
    size: "1.1 MB",
    date: "2023-01-20",
  },
  {
    id: 4,
    name: "Company Profile",
    type: "PDF",
    size: "3.5 MB",
    date: "2023-09-10",
  },
  {
    id: 5,
    name: "Terms and Conditions",
    type: "PDF",
    size: "0.5 MB",
    date: "2023-01-01",
  },
];
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">Downloads Center</h1>
        <p class="text-gray-600 mb-12">
          Access our latest product catalogs, safety manuals, and
          certifications.
        </p>

        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="divide-y divide-gray-100">
            <div
              v-for="doc in documents"
              :key="doc.id"
              class="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500"
                >
                  <FileText class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900">{{ doc.name }}</h3>
                  <div class="flex items-center gap-3 text-sm text-gray-500">
                    <span>{{ doc.type }}</span>
                    <span>•</span>
                    <span>{{ doc.size }}</span>
                    <span>•</span>
                    <span>Updated {{ doc.date }}</span>
                  </div>
                </div>
              </div>
              <button
                class="p-3 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-all cursor-pointer"
              >
                <Download class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-blue-50 rounded-xl p-8 text-center">
          <h3 class="text-xl font-bold mb-2 text-primary">
            Need specific documentation?
          </h3>
          <p class="text-gray-600 mb-6">
            If you can't find what you're looking for, please contact our
            support team.
          </p>
          <RouterLink
            to="/contact"
            class="inline-block px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
