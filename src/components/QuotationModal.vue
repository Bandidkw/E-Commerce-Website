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
import { useToastStore } from "../stores/toast";

const toast = useToastStore();

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

const isEdit = ref(false);

const openModal = (data?: any) => {
  isOpen.value = true;
  if (data) {
    isEdit.value = true;
    quotationNumber.value = data.quotationNumber;
    customerName.value = data.customerName;
    customerEmail.value = data.customerEmail;
    customerPhone.value = data.customerPhone;
    customerCompany.value = data.customerCompany;
    validUntil.value = data.validUntil;
    notes.value = data.notes;
    discount.value = data.discount;
    items.value = JSON.parse(JSON.stringify(data.items)); // Deep copy to avoid direct mutation
  } else {
    isEdit.value = false;
    resetForm();
    quotationNumber.value = generateQuotationNumber();
  }
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
  toast.success("บันทึกเป็นร่างเรียบร้อยแล้ว");
  closeModal();
};

const sendQuotation = () => {
  if (!customerName.value || !customerEmail.value || !validUntil.value) {
    toast.error("กรุณากรอกข้อมูลลูกค้าให้ครบถ้วน");
    return;
  }

  const hasEmptyItems = items.value.some(
    (item) => !item.productName || item.quantity <= 0 || item.unitPrice <= 0
  );

  if (hasEmptyItems) {
    toast.error("กรุณากรอกข้อมูลสินค้าให้ครบถ้วน");
    return;
  }

  toast.success("ส่งใบเสนอราคาเรียบร้อยแล้ว");
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
          class="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
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
              class="relative transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-premium-lg transition-all w-full max-w-5xl max-h-[95vh] flex flex-col border border-slate-100"
            >
              <!-- Header -->
              <div class="bg-slate-50/50 px-10 py-8 border-b border-slate-100">
                <div class="flex items-center justify-between">
                  <div>
                    <DialogTitle
                      class="text-3xl font-black text-slate-900 flex items-center gap-4"
                    >
                      <div
                        class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-indigo"
                      >
                        <FileText class="w-6 h-6" />
                      </div>
                      {{ isEdit ? "แก้ไขใบเสนอราคา" : "สร้างใบเสนอราคาใหม่" }}
                    </DialogTitle>
                    <p class="text-slate-500 font-medium mt-2 ml-16">
                      รหัสอ้างอิง: {{ quotationNumber }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all cursor-pointer"
                    @click="closeModal"
                  >
                    <X class="h-6 w-6" />
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 overflow-y-auto px-10 py-10">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <!-- Main Form -->
                  <div class="lg:col-span-2 space-y-10">
                    <!-- Quotation Info -->
                    <div
                      class="bg-slate-50 rounded-3xl p-8 border border-slate-100"
                    >
                      <div class="flex items-center gap-3 mb-6">
                        <div class="w-1.5 h-6 bg-primary rounded-full"></div>
                        <h3 class="text-xl font-black text-slate-900">
                          ข้อมูลพื้นฐาน
                        </h3>
                      </div>
                      <div class="grid grid-cols-2 gap-6">
                        <div>
                          <label
                            class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                          >
                            เลขที่ใบเสนอราคา
                          </label>
                          <input
                            v-model="quotationNumber"
                            type="text"
                            class="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                          >
                            ใช้ได้ถึงวันที่ <span class="text-rose-500">*</span>
                          </label>
                          <input
                            v-model="validUntil"
                            type="date"
                            required
                            class="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Customer Info -->
                    <div
                      class="bg-slate-50 rounded-3xl p-8 border border-slate-100"
                    >
                      <div class="flex items-center gap-3 mb-6">
                        <div class="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                        <h3 class="text-xl font-black text-slate-900">
                          ข้อมูลลูกค้า
                        </h3>
                      </div>
                      <div class="grid grid-cols-2 gap-6">
                        <div>
                          <label
                            class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                          >
                            ชื่อลูกค้า <span class="text-rose-500">*</span>
                          </label>
                          <input
                            v-model="customerName"
                            type="text"
                            required
                            class="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700"
                            placeholder="ชื่อ-นามสกุล"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                          >
                            บริษัท
                          </label>
                          <input
                            v-model="customerCompany"
                            type="text"
                            class="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700"
                            placeholder="ชื่อบริษัท"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                          >
                            อีเมล <span class="text-rose-500">*</span>
                          </label>
                          <input
                            v-model="customerEmail"
                            type="email"
                            required
                            class="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700"
                            placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
                          >
                            เบอร์โทรศัพท์
                          </label>
                          <input
                            v-model="customerPhone"
                            type="tel"
                            class="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700"
                            placeholder="02-xxx-xxxx"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Items -->
                    <div
                      class="bg-slate-50 rounded-3xl p-8 border border-slate-100"
                    >
                      <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-1.5 h-6 bg-emerald-500 rounded-full"
                          ></div>
                          <h3 class="text-xl font-black text-slate-900">
                            รายการสินค้า
                          </h3>
                        </div>
                        <button
                          @click="addItem"
                          class="px-5 py-2.5 bg-white border border-slate-200 text-primary hover:bg-primary/5 rounded-xl text-xs font-black transition-all flex items-center gap-2 group/add cursor-pointer"
                        >
                          <Plus
                            class="w-4 h-4 group-hover/add:rotate-90 transition-transform"
                          />
                          เพิ่มรายการ
                        </button>
                      </div>

                      <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        <div
                          v-for="(item, index) in items"
                          :key="index"
                          class="group/item relative bg-white border border-slate-200 rounded-[1.5rem] p-6 transition-all hover:border-primary/20 hover:shadow-premium"
                        >
                          <div class="grid grid-cols-12 gap-6 items-center">
                            <div class="col-span-12 md:col-span-5">
                              <label
                                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
                                >ชื่อสินค้า</label
                              >
                              <input
                                v-model="item.productName"
                                type="text"
                                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700"
                                placeholder="ค้นหาหรือพิมพ์ชื่อสินค้า..."
                              />
                            </div>
                            <div class="col-span-4 md:col-span-2">
                              <label
                                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
                                >จำนวน</label
                              >
                              <input
                                v-model.number="item.quantity"
                                type="number"
                                min="1"
                                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700"
                              />
                            </div>
                            <div class="col-span-4 md:col-span-2">
                              <label
                                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
                                >ราคา/หน่วย</label
                              >
                              <input
                                v-model.number="item.unitPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-bold text-slate-700"
                              />
                            </div>
                            <div
                              class="col-span-3 md:col-span-2 flex flex-col items-end"
                            >
                              <label
                                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
                                >ยอดรวม</label
                              >
                              <span
                                class="text-base font-black text-slate-900 h-[42px] flex items-center"
                              >
                                ฿{{
                                  formatPrice(item.quantity * item.unitPrice)
                                }}
                              </span>
                            </div>
                            <div
                              class="col-span-1 flex items-center justify-center pt-6"
                            >
                              <button
                                v-if="items.length > 1"
                                @click="removeItem(index)"
                                class="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                              >
                                <Trash2 class="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Notes -->
                    <div
                      class="bg-slate-50 rounded-3xl p-8 border border-slate-100"
                    >
                      <div class="flex items-center gap-3 mb-6">
                        <div class="w-1.5 h-6 bg-slate-400 rounded-full"></div>
                        <h3 class="text-xl font-black text-slate-900">
                          หมายเหตุ และเงื่อนไข
                        </h3>
                      </div>
                      <textarea
                        v-model="notes"
                        rows="4"
                        class="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none resize-none font-medium text-slate-600 placeholder:text-slate-400"
                        placeholder="ระบุเงื่อนไขการชำระเงิน ระยะเวลาจัดส่ง หรือข้อมูลเพิ่มเติม..."
                      ></textarea>
                    </div>
                  </div>

                  <!-- Summary Sidebar -->
                  <div class="lg:col-span-1">
                    <div
                      class="bg-slate-900 rounded-[2rem] p-8 sticky top-0 text-white shadow-premium-lg"
                    >
                      <h3
                        class="text-xl font-black mb-8 border-b border-white/10 pb-4"
                      >
                        สรุปยอดสุทธิ
                      </h3>

                      <div class="space-y-5 mb-8">
                        <div
                          class="flex justify-between items-center text-slate-400"
                        >
                          <span
                            class="text-xs font-black uppercase tracking-widest"
                            >ยอดรวม</span
                          >
                          <span class="font-black text-white"
                            >฿{{ formatPrice(subtotal) }}</span
                          >
                        </div>

                        <div class="space-y-3">
                          <label
                            class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                          >
                            ส่วนลดพิเศษ (฿)
                          </label>
                          <input
                            v-model.number="discount"
                            type="number"
                            min="0"
                            step="0.01"
                            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-bold text-white text-lg"
                          />
                        </div>

                        <div
                          class="flex justify-between items-center text-slate-400"
                        >
                          <span
                            class="text-xs font-black uppercase tracking-widest"
                            >ภาษี ({{ taxRate }}%)</span
                          >
                          <span class="font-black text-white"
                            >฿{{ formatPrice(taxAmount) }}</span
                          >
                        </div>
                      </div>

                      <div class="border-t border-white/10 pt-8 mt-8">
                        <div class="flex justify-between items-end">
                          <div>
                            <p
                              class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                            >
                              ยอดรวมสุทธิ
                            </p>
                            <span
                              class="text-3xl font-black text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                            >
                              ฿{{ formatPrice(total) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer Actions -->
              <div
                class="bg-slate-50/50 px-10 py-8 border-t border-slate-100 flex justify-end gap-4"
              >
                <button
                  @click="closeModal"
                  class="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all font-black cursor-pointer shadow-sm"
                >
                  ยกเลิก
                </button>
                <button
                  @click="saveAsDraft"
                  class="px-8 py-4 bg-slate-200 text-slate-700 rounded-2xl hover:bg-slate-300 transition-all font-black flex items-center gap-3 cursor-pointer"
                >
                  <Save class="w-5 h-5" />
                  บันทึกร่าง
                </button>
                <button
                  @click="sendQuotation"
                  class="px-10 py-4 bg-primary text-white rounded-2xl hover:bg-primary-dark transition-all font-black flex items-center gap-3 cursor-pointer shadow-indigo hover:shadow-lg hover:-translate-y-1"
                >
                  <Send class="w-5 h-5" />
                  ยืนยันและส่งใบเสนอราคา
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
