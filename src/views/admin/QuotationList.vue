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
  XCircle,
  FileEdit,
} from "lucide-vue-next";
import QuotationModal from "../../components/QuotationModal.vue";

const quotationModalRef = ref<InstanceType<typeof QuotationModal>>();

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

const statusConfig = {
  draft: {
    label: "ร่าง",
    class: "bg-gray-100 text-gray-800",
    icon: FileEdit,
  },
  sent: {
    label: "ส่งแล้ว",
    class: "bg-blue-100 text-blue-800",
    icon: Send,
  },
  approved: {
    label: "อนุมัติ",
    class: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  rejected: {
    label: "ปฏิเสธ",
    class: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

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

const editQuotation = (_id: string) => {
  // For now, just open the modal - can be enhanced to load existing data
  quotationModalRef.value?.openModal();
};

const deleteQuotation = (id: string) => {
  if (confirm("คุณต้องการลบใบเสนอราคานี้ใช่หรือไม่?")) {
    const index = quotations.value.findIndex((q) => q.id === id);
    if (index > -1) {
      quotations.value.splice(index, 1);
    }
  }
};

const sendQuotation = (id: string) => {
  const quotation = quotations.value.find((q) => q.id === id);
  if (quotation && quotation.status === "draft") {
    quotation.status = "sent";
    quotation.sentAt = new Date().toISOString();
    alert("ส่งใบเสนอราคาเรียบร้อยแล้ว");
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FileText class="w-8 h-8 text-primary" />
          จัดการใบเสนอราคา
        </h1>
        <p class="text-gray-500 mt-1">สร้างและจัดการใบเสนอราคาให้กับลูกค้า</p>
      </div>
      <button
        @click="createNewQuotation"
        class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
      >
        <Plus class="w-5 h-5" />
        สร้างใบเสนอราคาใหม่
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">ทั้งหมด</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ quotations.length }}
            </p>
          </div>
          <FileText class="w-10 h-10 text-gray-400" />
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">ร่าง</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ quotations.filter((q) => q.status === "draft").length }}
            </p>
          </div>
          <FileEdit class="w-10 h-10 text-gray-400" />
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">ส่งแล้ว</p>
            <p class="text-2xl font-bold text-blue-600">
              {{ quotations.filter((q) => q.status === "sent").length }}
            </p>
          </div>
          <Send class="w-10 h-10 text-blue-400" />
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">อนุมัติ</p>
            <p class="text-2xl font-bold text-green-600">
              {{ quotations.filter((q) => q.status === "approved").length }}
            </p>
          </div>
          <CheckCircle class="w-10 h-10 text-green-400" />
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Search -->
        <div class="relative">
          <Search
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาด้วยเลขที่ใบเสนอราคา, ชื่อลูกค้า หรือบริษัท..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <Filter
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          />
          <select
            v-model="filterStatus"
            class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="all">ทุกสถานะ</option>
            <option value="draft">ร่าง</option>
            <option value="sent">ส่งแล้ว</option>
            <option value="approved">อนุมัติ</option>
            <option value="rejected">ปฏิเสธ</option>
          </select>
          <ChevronDown
            class="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div class="text-sm text-gray-600">
      แสดง {{ filteredQuotations.length }} รายการ
    </div>

    <!-- Quotations Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                เลขที่
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ลูกค้า
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                รายการสินค้า
              </th>
              <th
                class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ยอดรวม
              </th>
              <th
                class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                สถานะ
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ใช้ได้ถึง
              </th>
              <th
                class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="quotation in filteredQuotations"
              :key="quotation.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- Quotation Number -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ quotation.quotationNumber }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ formatDate(quotation.createdAt) }}
                </div>
              </td>

              <!-- Customer -->
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ quotation.customerName }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ quotation.customerCompany }}
                </div>
              </td>

              <!-- Items -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ quotation.items.length }} รายการ
                </div>
                <div class="text-xs text-gray-500">
                  {{ quotation.items[0]?.productName }}
                  <span v-if="quotation.items.length > 1">และอื่นๆ</span>
                </div>
              </td>

              <!-- Total -->
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="text-sm font-bold text-primary">
                  ฿{{ formatPrice(quotation.total) }}
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span
                  :class="[
                    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                    statusConfig[quotation.status].class,
                  ]"
                >
                  <component
                    :is="statusConfig[quotation.status].icon"
                    class="w-3.5 h-3.5"
                  />
                  {{ statusConfig[quotation.status].label }}
                </span>
              </td>

              <!-- Valid Until -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(quotation.validUntil) }}
                </div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                    v-if="quotation.status === 'draft'"
                    @click="sendQuotation(quotation.id)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="ส่งใบเสนอราคา"
                  >
                    <Send class="w-4 h-4" />
                  </button>
                  <button
                    @click="editQuotation(quotation.id)"
                    class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    title="แก้ไข"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    title="ดาวน์โหลด PDF"
                  >
                    <Download class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteQuotation(quotation.id)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="ลบ"
                  >
                    <Trash2 class="w-4 h-4" />
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
  </div>
</template>
