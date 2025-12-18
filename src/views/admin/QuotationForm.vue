<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FileText, Save, Send, ArrowLeft } from "lucide-vue-next";
import QuotationItemsTable from "../../components/admin/QuotationItemsTable.vue";

const router = useRouter();
const route = useRoute();

const isEditMode = computed(() => !!route.params.id);

// Form data
const quotationNumber = ref(
  `QT-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}`
);
const customerName = ref("");
const customerEmail = ref("");
const customerPhone = ref("");
const customerCompany = ref("");
const validUntil = ref("");
const notes = ref("");
const discount = ref(0);
const taxRate = ref(7); // 7% VAT

interface QuotationItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

const items = ref<QuotationItem[]>([
  { productName: "", quantity: 1, unitPrice: 0 },
]);

const addItem = () => {
  items.value.push({ productName: "", quantity: 1, unitPrice: 0 });
};

const removeItem = (index: number) => {
  if (items.value.length > 1) {
    items.value.splice(index, 1);
  }
};

const subtotal = computed(() => {
  return items.value.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);
});

const discountAmount = computed(() => discount.value);

const taxAmount = computed(() => {
  return ((subtotal.value - discountAmount.value) * taxRate.value) / 100;
});

const total = computed(() => {
  return subtotal.value - discountAmount.value + taxAmount.value;
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const saveAsDraft = () => {
  // Save logic here
  alert("บันทึกเป็นร่างเรียบร้อยแล้ว");
  router.push("/admin/quotations");
};

const sendQuotation = () => {
  // Validation
  if (!customerName.value || !customerEmail.value || !validUntil.value) {
    alert("กรุณากรอกข้อมูลลูกค้าให้ครบถ้วน");
    return;
  }

  const hasEmptyItems = items.value.some(
    (item) => !item.productName || item.quantity <= 0 || item.unitPrice <= 0
  );

  if (hasEmptyItems) {
    alert("กรุณากรอกข้อมูลสินค้าให้ครบถ้วน");
    return;
  }

  // Send logic here
  alert("ส่งใบเสนอราคาเรียบร้อยแล้ว");
  router.push("/admin/quotations");
};

const goBack = () => {
  router.push("/admin/quotations");
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="goBack"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft class="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText class="w-8 h-8 text-primary" />
            {{ isEditMode ? "แก้ไขใบเสนอราคา" : "สร้างใบเสนอราคาใหม่" }}
          </h1>
          <p class="text-gray-500 mt-1">
            กรอกข้อมูลเพื่อสร้างใบเสนอราคาให้กับลูกค้า
          </p>
        </div>
      </div>

      <div class="flex gap-3">
        <button
          @click="saveAsDraft"
          class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2 cursor-pointer"
        >
          <Save class="w-5 h-5" />
          บันทึกร่าง
        </button>
        <button
          @click="sendQuotation"
          class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Send class="w-5 h-5" />
          ส่งใบเสนอราคา
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Quotation Info -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">ข้อมูลใบเสนอราคา</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                เลขที่ใบเสนอราคา
              </label>
              <input
                v-model="quotationNumber"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="QT-2025-001"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                ใช้ได้ถึงวันที่ <span class="text-red-500">*</span>
              </label>
              <input
                v-model="validUntil"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <!-- Customer Info -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">ข้อมูลลูกค้า</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                ชื่อลูกค้า <span class="text-red-500">*</span>
              </label>
              <input
                v-model="customerName"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="ชื่อ-นามสกุล"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                บริษัท
              </label>
              <input
                v-model="customerCompany"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="ชื่อบริษัท"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                อีเมล <span class="text-red-500">*</span>
              </label>
              <input
                v-model="customerEmail"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทรศัพท์
              </label>
              <input
                v-model="customerPhone"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="02-xxx-xxxx"
              />
            </div>
          </div>
        </div>

        <!-- Items -->
        <QuotationItemsTable
          :items="items"
          @add="addItem"
          @remove="removeItem"
        />

        <!-- Notes -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">หมายเหตุ</h2>
          <textarea
            v-model="notes"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
            placeholder="เงื่อนไขการชำระเงิน เวลาจัดส่ง หรือข้อมูลเพิ่มเติม..."
          ></textarea>
        </div>
      </div>

      <!-- Summary Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-sm p-6 sticky top-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">สรุปยอดรวม</h2>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>ยอดรวมสินค้า</span>
              <span class="font-medium">฿{{ formatPrice(subtotal) }}</span>
            </div>

            <div class="border-t pt-3">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                ส่วนลด (฿)
              </label>
              <input
                v-model.number="discount"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>

            <div class="flex justify-between text-gray-600">
              <span>ภาษี VAT ({{ taxRate }}%)</span>
              <span class="font-medium">฿{{ formatPrice(taxAmount) }}</span>
            </div>
          </div>

          <div class="border-t pt-4">
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-900">ยอดรวมสุทธิ</span>
              <span class="text-2xl font-bold text-primary">
                ฿{{ formatPrice(total) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
