<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  status: string;
  type?: "order" | "quotation";
}>();

const statusConfig = computed(() => {
  const s = props.status.toLowerCase();

  // Quotation Statuses
  if (s === "draft" || s === "ฉบับร่าง")
    return { bg: "bg-gray-100", text: "text-gray-700", label: "ฉบับร่าง" };
  if (s === "sent" || s === "ส่งแล้ว")
    return { bg: "bg-blue-100", text: "text-blue-700", label: "ส่งแล้ว" };
  if (s === "approved" || s === "อนุมัติ")
    return { bg: "bg-green-100", text: "text-green-700", label: "อนุมัติ" };
  if (s === "rejected" || s === "ปฏิเสธ")
    return { bg: "bg-red-100", text: "text-red-700", label: "ปฏิเสธ" };
  if (s === "expired" || s === "หมดอายุ")
    return { bg: "bg-orange-100", text: "text-orange-700", label: "หมดอายุ" };

  // Order Statuses
  if (s === "pending" || s === "รอดำเนินการ")
    return {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      label: "รอดำเนินการ",
    };
  if (s === "processing" || s === "กำลังเตรียมสินค้า")
    return {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "กำลังเตรียมสินค้า",
    };
  if (s === "shipped" || s === "จัดส่งแล้ว")
    return {
      bg: "bg-purple-100",
      text: "text-purple-700",
      label: "จัดส่งแล้ว",
    };
  if (s === "delivered" || s === "ส่งมอบสำเร็จ")
    return {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "ส่งมอบสำเร็จ",
    };
  if (s === "cancelled" || s === "ยกเลิก")
    return { bg: "bg-red-100", text: "text-red-700", label: "ยกเลิก" };

  return { bg: "bg-gray-100", text: "text-gray-700", label: props.status };
});
</script>

<template>
  <span
    :class="[
      'px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusConfig.bg,
      statusConfig.text,
    ]"
  >
    {{ statusConfig.label }}
  </span>
</template>
