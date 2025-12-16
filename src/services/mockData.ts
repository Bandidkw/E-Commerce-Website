export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  specs: Record<string, string>;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

export const categories = [
  "สารเคมีบำบัดน้ำ",
  "ตัวทำละลายอุตสาหกรรม",
  "สารเจือปนอาหาร",
  "สารเคมีสิ่งทอ",
  "สารเคมีทั่วไป",
];

export const products: Product[] = Array.from({ length: 100 }, (_, i) => {
  const category = categories[i % categories.length] || "สารเคมีทั่วไป";
  return {
    id: i + 1,
    name: `${category} รายการที่ ${i + 1}`,
    category,
    description: `สารเคมี${category}คุณภาพสูงสำหรับโรงงานอุตสาหกรรม ผ่านการรับรองมาตรฐานสากล`,
    price: Math.floor(Math.random() * 1000) + 100,
    image: `https://placehold.co/600x400?text=Chemical+${i + 1}`,
    specs: {
      ความบริสุทธิ์: "99%",
      เกรด: "อุตสาหกรรม",
      บรรจุภัณฑ์: "ถุง 25 กก.",
    },
  };
});

export const articles: Article[] = [
  {
    id: 1,
    title: "วิธีเลือกสารเคมีบำบัดน้ำที่เหมาะสม",
    excerpt:
      "คู่มือที่ครอบคลุมในการเลือกสารเคมีที่ดีที่สุดสำหรับโรงบำบัดน้ำของคุณ",
    content: "เนื้อหาเต็มเกี่ยวกับการบำบัดน้ำ...",
    date: "15 ตุลาคม 2566",
    image: "https://placehold.co/800x400?text=Water+Treatment",
  },
  {
    id: 2,
    title: "แนวทางความปลอดภัยสำหรับตัวทำละลายอุตสาหกรรม",
    excerpt:
      "เคล็ดลับความปลอดภัยที่สำคัญสำหรับการจัดการและการจัดเก็บตัวทำละลายอุตสาหกรรม",
    content: "เนื้อหาเต็มเกี่ยวกับความปลอดภัย...",
    date: "20 ตุลาคม 2566",
    image: "https://placehold.co/800x400?text=Safety",
  },
  {
    id: 3,
    title: "ลดต้นทุนด้วยสารเคมีทางเลือก",
    excerpt:
      "เรียนรู้วิธีลดต้นทุนการผลิตด้วยการเปลี่ยนไปใช้โซลูชันสารเคมีทางเลือก",
    content: "เนื้อหาเต็มเกี่ยวกับการลดต้นทุน...",
    date: "25 ตุลาคม 2566",
    image: "https://placehold.co/800x400?text=Cost+Reduction",
  },
];
