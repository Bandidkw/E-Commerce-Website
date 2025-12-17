<script setup lang="ts">
import { ref, computed } from "vue";
import { FileText, Plus, Trash2, Save, Send, X } from "lucide-vue-next";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

interface QuotationItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

const isOpen = ref(false);
const quotationNumber = ref("");
const customerName = ref("");
const customerEmail = ref("");
const customerPhone = ref("");
const customerCompany = ref("");
const validUntil = ref("");
const notes = ref("");
const discount = ref(0);
const taxRate = ref(7);

const items = ref<QuotationItem[]>([
  { productName: "", quantity: 1, unitPrice: 0 },
]);

const generateQuotationNumber = () => {
  const year = new Date().getFullYear();
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `QT-${year}-${random}`;
};

const openModal = () => {
  isOpen.value = true;
  resetForm();
  quotationNumber.value = generateQuotationNumber();
};

const closeModal = () => {
  isOpen.value = false;
  setTimeout(() => {
    resetForm();
  }, 300);
};

const resetForm = () => {
  quotationNumber.value = "";
  customerName.value = "";
  customerEmail.value = "";
  customerPhone.value = "";
  customerCompany.value = "";
  validUntil.value = "";
  notes.value = "";
  discount.value = 0;
  items.value = [{ productName: "", quantity: 1, unitPrice: 0 }];
};

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
  alert("บันทึกเป็นร่างเรียบร้อยแล้ว");
  closeModal();
};

const sendQuotation = () => {
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

  alert("ส่งใบเสนอราคาเรียบร้อยแล้ว");
  closeModal();
};

defineExpose({
  openModal,
});
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-[100]" @close="closeModal">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <!-- Modal Panel -->
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all w-full max-w-5xl max-h-[90vh] flex flex-col"
            >
              <!-- Header -->
              <div class="bg-white px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <DialogTitle
                    class="text-2xl font-bold text-gray-900 flex items-center gap-3"
                  >
                    <FileText class="w-7 h-7 text-primary" />
                    สร้างใบเสนอราคาใหม่
                  </DialogTitle>
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
                    @click="closeModal"
                  >
                    <X class="h-6 w-6" />
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 overflow-y-auto px-6 py-6">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <!-- Main Form -->
                  <div class="lg:col-span-2 space-y-6">
                    <!-- Quotation Info -->
                    <div class="bg-gray-50 rounded-lg p-4">
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">
                        ข้อมูลใบเสนอราคา
                      </h3>
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            เลขที่ใบเสนอราคา
                          </label>
                          <input
                            v-model="quotationNumber"
                            type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            ใช้ได้ถึงวันที่ <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model="validUntil"
                            type="date"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Customer Info -->
                    <div class="bg-gray-50 rounded-lg p-4">
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">
                        ข้อมูลลูกค้า
                      </h3>
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            ชื่อลูกค้า <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model="customerName"
                            type="text"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                            placeholder="ชื่อ-นามสกุล"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            บริษัท
                          </label>
                          <input
                            v-model="customerCompany"
                            type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                            placeholder="ชื่อบริษัท"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            อีเมล <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model="customerEmail"
                            type="email"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                            placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            เบอร์โทรศัพท์
                          </label>
                          <input
                            v-model="customerPhone"
                            type="tel"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                            placeholder="02-xxx-xxxx"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Items -->
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-3">
                        <h3 class="text-lg font-semibold text-gray-900">
                          รายการสินค้า
                        </h3>
                        <button
                          @click="addItem"
                          class="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1 cursor-pointer"
                        >
                          <Plus class="w-4 h-4" />
                          เพิ่ม
                        </button>
                      </div>

                      <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
                        <div
                          v-for="(item, index) in items"
                          :key="index"
                          class="border border-gray-300 rounded-lg p-3 bg-white"
                        >
                          <div class="grid grid-cols-12 gap-2">
                            <div class="col-span-12 md:col-span-5">
                              <input
                                v-model="item.productName"
                                type="text"
                                class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                                placeholder="ชื่อสินค้า"
                              />
                            </div>
                            <div class="col-span-4 md:col-span-2">
                              <input
                                v-model.number="item.quantity"
                                type="number"
                                min="1"
                                class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                                placeholder="จำนวน"
                              />
                            </div>
                            <div class="col-span-4 md:col-span-2">
                              <input
                                v-model.number="item.unitPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                                placeholder="ราคา"
                              />
                            </div>
                            <div
                              class="col-span-3 md:col-span-2 flex items-center justify-end"
                            >
                              <span class="text-sm font-semibold text-gray-900">
                                {{
                                  formatPrice(item.quantity * item.unitPrice)
                                }}
                              </span>
                            </div>
                            <div
                              class="col-span-1 flex items-center justify-center"
                            >
                              <button
                                v-if="items.length > 1"
                                @click="removeItem(index)"
                                class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 class="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Notes -->
                    <div class="bg-gray-50 rounded-lg p-4">
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">
                        หมายเหตุ
                      </h3>
                      <textarea
                        v-model="notes"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none text-sm"
                        placeholder="เงื่อนไขการชำระเงิน..."
                      ></textarea>
                    </div>
                  </div>

                  <!-- Summary Sidebar -->
                  <div class="lg:col-span-1">
                    <div
                      class="bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg p-4 sticky top-0"
                    >
                      <h3 class="text-lg font-semibold text-gray-900 mb-4">
                        สรุปยอดรวม
                      </h3>

                      <div class="space-y-3 mb-4">
                        <div class="flex justify-between text-sm text-gray-600">
                          <span>ยอดรวมสินค้า</span>
                          <span class="font-medium"
                            >฿{{ formatPrice(subtotal) }}</span
                          >
                        </div>

                        <div class="border-t pt-3">
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                          >
                            ส่วนลด (฿)
                          </label>
                          <input
                            v-model.number="discount"
                            type="number"
                            min="0"
                            step="0.01"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                          />
                        </div>

                        <div class="flex justify-between text-sm text-gray-600">
                          <span>ภาษี VAT ({{ taxRate }}%)</span>
                          <span class="font-medium"
                            >฿{{ formatPrice(taxAmount) }}</span
                          >
                        </div>
                      </div>

                      <div class="border-t pt-4">
                        <div class="flex justify-between items-center">
                          <span class="text-base font-semibold text-gray-900"
                            >ยอดรวมสุทธิ</span
                          >
                          <span class="text-xl font-bold text-primary">
                            ฿{{ formatPrice(total) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer Actions -->
              <div
                class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3"
              >
                <button
                  @click="closeModal"
                  class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  @click="saveAsDraft"
                  class="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Save class="w-4 h-4" />
                  บันทึกร่าง
                </button>
                <button
                  @click="sendQuotation"
                  class="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Send class="w-4 h-4" />
                  ส่งใบเสนอราคา
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
