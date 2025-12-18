<script setup lang="ts">
import { ref, computed } from "vue";
import {
  FileText,
  Search,
  Filter,
  ChevronDown,
  Download,
  Edit,
  Trash2,
  Plus,
  Send,
  CheckCircle,
  FileEdit,
} from "lucide-vue-next";
import QuotationModal from "../../components/QuotationModal.vue";
import StatusBadge from "../../components/common/StatusBadge.vue";
import ConfirmModal from "../../components/common/ConfirmModal.vue";
import { useToastStore } from "../../stores/toast";

const quotationModalRef = ref<InstanceType<typeof QuotationModal>>();
const toast = useToastStore();

interface QuotationItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Quotation {
  id: string;
  quotationNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "approved" | "rejected";
  validUntil: string;
  createdAt: string;
  sentAt?: string;
  notes: string;
}

// Mock data - ใบเสนอราคาที่แอดมินสร้าง
const quotations = ref<Quotation[]>([
  {
    id: "1",
    quotationNumber: "QT-2025-001",
    customerName: "บริษัท เอบีซี จำกัด",
    customerEmail: "contact@abc.com",
    customerPhone: "02-123-4567",
    customerCompany: "บริษัท เอบีซี จำกัด",
    items: [
      { productName: "สารกรองน้ำ PAC", quantity: 100, unitPrice: 4500 },
      { productName: "โซดาไฟ NaOH", quantity: 50, unitPrice: 3200 },
    ],
    subtotal: 610000,
    discount: 10000,
    tax: 42000,
    total: 642000,
    status: "sent",
    validUntil: "2025-12-31",
    createdAt: "2025-12-10T10:00:00",
    sentAt: "2025-12-10T14:30:00",
    notes: "ราคาพิเศษสำหรับลูกค้าประจำ",
  },
  {
    id: "2",
    quotationNumber: "QT-2025-002",
    customerName: "โรงงาน XYZ",
    customerEmail: "purchase@xyz.com",
    customerPhone: "02-234-5678",
    customerCompany: "โรงงาน XYZ จำกัด",
    items: [
      { productName: "กรดไฮโดรคลอริก HCl", quantity: 200, unitPrice: 2800 },
      { productName: "โพลีอะคริลาไมด์", quantity: 75, unitPrice: 5500 },
    ],
    subtotal: 972500,
    discount: 20000,
    tax: 66675,
    total: 1019175,
    status: "approved",
    validUntil: "2025-12-25",
    createdAt: "2025-12-08T09:00:00",
    sentAt: "2025-12-08T11:00:00",
    notes: "",
  },
  {
    id: "3",
    quotationNumber: "QT-2025-003",
    customerName: "บริษัท DEF จำกัด",
    customerEmail: "admin@def.com",
    customerPhone: "02-345-6789",
    customerCompany: "บริษัท DEF จำกัด",
    items: [{ productName: "สารส้ม Alum", quantity: 150, unitPrice: 2900 }],
    subtotal: 435000,
    discount: 0,
    tax: 30450,
    total: 465450,
    status: "draft",
    validUntil: "2026-01-15",
    createdAt: "2025-12-15T16:00:00",
    notes: "รอการตรวจสอบราคา",
  },
]);

const searchQuery = ref("");
const filterStatus = ref<string>("all");

const isConfirmOpen = ref(false);
const quotationToDelete = ref<string | null>(null);

const filteredQuotations = computed(() => {
  return quotations.value.filter((q) => {
    const matchesSearch =
      q.quotationNumber
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.customerCompany.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      filterStatus.value === "all" || q.status === filterStatus.value;

    return matchesSearch && matchesStatus;
  });
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const createNewQuotation = () => {
  quotationModalRef.value?.openModal();
};

const editQuotation = (id: string) => {
  const quotation = quotations.value.find((q) => q.id === id);
  if (quotation) {
    quotationModalRef.value?.openModal(quotation);
  }
};

const deleteQuotation = (id: string) => {
  quotationToDelete.value = id;
  isConfirmOpen.value = true;
};

const confirmDeleteQuotation = () => {
  if (quotationToDelete.value) {
    const index = quotations.value.findIndex(
      (q) => q.id === quotationToDelete.value
    );
    if (index > -1) {
      quotations.value.splice(index, 1);
      toast.success("ลบใบเสนอราคาเรียบร้อยแล้ว");
    }
    isConfirmOpen.value = false;
    quotationToDelete.value = null;
  }
};

const sendQuotation = (id: string) => {
  const quotation = quotations.value.find((q) => q.id === id);
  if (quotation && quotation.status === "draft") {
    quotation.status = "sent";
    quotation.sentAt = new Date().toISOString();
    toast.success("ส่งใบเสนอราคาเรียบร้อยแล้ว");
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
    >
      <div>
        <h1
          class="text-3xl font-black text-slate-900 mb-1 flex items-center gap-3"
        >
          จัดการ <span class="text-primary">ใบเสนอราคา</span>
        </h1>
        <p class="text-slate-500 font-medium">
          สร้างและบริหารจัดการข้อเสนอราคาของคุณอย่างมืออาชีพ
        </p>
      </div>
      <button
        @click="createNewQuotation"
        class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all font-black shadow-indigo hover:shadow-lg hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
      >
        <Plus class="w-5 h-5" />
        สร้างใบเสนอราคาใหม่
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div
        class="bg-white p-6 rounded-3xl shadow-premium border border-slate-100 hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              ทั้งหมด
            </p>
            <p class="text-3xl font-black text-slate-900 tracking-tight">
              {{ quotations.length }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100"
          >
            <FileText class="w-6 h-6 text-slate-400" />
          </div>
        </div>
      </div>
      <div
        class="bg-white p-6 rounded-3xl shadow-premium border border-slate-100 hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              ฉบับร่าง
            </p>
            <p class="text-3xl font-black text-slate-900 tracking-tight">
              {{ quotations.filter((q) => q.status === "draft").length }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100"
          >
            <FileEdit class="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </div>
      <div
        class="bg-white p-6 rounded-3xl shadow-premium border border-slate-100 hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              ส่งแล้ว
            </p>
            <p class="text-3xl font-black text-primary tracking-tight">
              {{ quotations.filter((q) => q.status === "sent").length }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20"
          >
            <Send class="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
      <div
        class="bg-white p-6 rounded-3xl shadow-premium border border-slate-100 hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              อนุมัติแล้ว
            </p>
            <p class="text-3xl font-black text-emerald-600 tracking-tight">
              {{ quotations.filter((q) => q.status === "approved").length }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100"
          >
            <CheckCircle class="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="bg-white rounded-[2rem] shadow-premium p-8 border border-slate-100"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Search -->
        <div class="relative group">
          <Search
            class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาเลขที่, ชื่อลูกค้า หรือบริษัท..."
            class="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <!-- Status Filter -->
        <div class="relative group">
          <Filter
            class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors"
          />
          <select
            v-model="filterStatus"
            class="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
          >
            <option value="all">สถานะทั้งหมด</option>
            <option value="draft">ร่าง</option>
            <option value="sent">ส่งแล้ว</option>
            <option value="approved">อนุมัติ</option>
            <option value="rejected">ปฏิเสธ</option>
          </select>
          <ChevronDown
            class="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-primary transition-colors"
          />
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div class="text-sm text-gray-600">
      แสดง {{ filteredQuotations.length }} รายการ
    </div>

    <!-- Quotations Table -->
    <div
      class="bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead
            class="bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest border-b border-slate-50"
          >
            <tr>
              <th class="px-8 py-5">เลขที่ใบเสนอราคา</th>
              <th class="px-8 py-5">ลูกค้า</th>
              <th class="px-8 py-5">รายการสินค้า</th>
              <th class="px-8 py-5 text-right">ยอดรวม</th>
              <th class="px-8 py-5 text-center">สถานะ</th>
              <th class="px-8 py-5">กำหนดเวลา</th>
              <th class="px-8 py-5 text-right">การจัดการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr
              v-for="quotation in filteredQuotations"
              :key="quotation.id"
              class="hover:bg-slate-50/50 transition-colors group"
            >
              <!-- Quotation Number -->
              <td class="px-8 py-6 whitespace-nowrap">
                <div
                  class="text-sm font-black text-slate-900 group-hover:text-primary transition-colors"
                >
                  {{ quotation.quotationNumber }}
                </div>
                <div
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1"
                >
                  สร้างเมื่อ: {{ formatDate(quotation.createdAt) }}
                </div>
              </td>

              <!-- Customer -->
              <td class="px-8 py-6">
                <div class="text-sm font-black text-slate-700">
                  {{ quotation.customerName }}
                </div>
                <div class="text-xs font-medium text-slate-400">
                  {{ quotation.customerCompany }}
                </div>
              </td>

              <!-- Items -->
              <td class="px-8 py-6">
                <div class="flex items-center gap-2">
                  <div
                    class="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-600"
                  >
                    {{ quotation.items.length }} รายการ
                  </div>
                  <div
                    class="text-xs font-medium text-slate-500 line-clamp-1 max-w-[150px]"
                  >
                    {{ quotation.items[0]?.productName }}
                    <span
                      v-if="quotation.items.length > 1"
                      class="text-primary font-bold"
                      >...</span
                    >
                  </div>
                </div>
              </td>

              <!-- Total -->
              <td class="px-8 py-6 whitespace-nowrap text-right">
                <div class="text-lg font-black text-slate-900">
                  ฿{{ formatPrice(quotation.total) }}
                </div>
              </td>

              <!-- Status -->
              <td class="px-8 py-6 whitespace-nowrap text-center">
                <StatusBadge :status="quotation.status" />
              </td>

              <!-- Valid Until -->
              <td class="px-8 py-6 whitespace-nowrap">
                <div
                  class="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest"
                >
                  <div
                    v-if="new Date(quotation.validUntil) < new Date()"
                    class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"
                  ></div>
                  {{ formatDate(quotation.validUntil) }}
                </div>
              </td>

              <!-- Actions -->
              <td class="px-8 py-6 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-1">
                  <button
                    v-if="quotation.status === 'draft'"
                    @click="sendQuotation(quotation.id)"
                    class="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer group/btn"
                    title="ส่งใบเสนอราคา"
                  >
                    <Send
                      class="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                    />
                  </button>
                  <button
                    @click="editQuotation(quotation.id)"
                    class="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all cursor-pointer group/btn"
                    title="แก้ไข"
                  >
                    <Edit
                      class="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                    />
                  </button>
                  <button
                    class="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer group/btn"
                    title="ดาวน์โหลด PDF"
                  >
                    <Download
                      class="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                    />
                  </button>
                  <button
                    @click="deleteQuotation(quotation.id)"
                    class="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer group/btn"
                    title="ลบ"
                  >
                    <Trash2
                      class="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredQuotations.length === 0" class="p-12 text-center">
        <FileText class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบใบเสนอราคา</h3>
        <p class="text-gray-500 mb-6">
          ไม่มีใบเสนอราคาที่ตรงกับเงื่อนไขการค้นหา
        </p>
        <button
          @click="createNewQuotation"
          class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2 cursor-pointer"
        >
          <Plus class="w-5 h-5" />
          สร้างใบเสนอราคาใหม่
        </button>
      </div>
    </div>

    <!-- Quotation Modal -->
    <QuotationModal ref="quotationModalRef" />

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="isConfirmOpen"
      title="ยืนยันการลบใบเสนอราคา"
      message="คุณต้องการลบใบเสนอราคานี้ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้"
      confirm-label="ลบใบเสนอราคา"
      type="danger"
      @close="isConfirmOpen = false"
      @confirm="confirmDeleteQuotation"
    />
  </div>
</template>
