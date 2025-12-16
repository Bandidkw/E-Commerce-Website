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
    title: "How to Choose the Right Water Treatment Chemicals",
    excerpt:
      "A comprehensive guide to selecting the best chemicals for your water treatment plant.",
    content: "Full content about water treatment...",
    date: "2023-10-15",
    image: "https://placehold.co/800x400?text=Water+Treatment",
  },
  {
    id: 2,
    title: "Safety Guidelines for Industrial Solvents",
    excerpt:
      "Essential safety tips for handling and storing industrial solvents.",
    content: "Full content about safety...",
    date: "2023-10-20",
    image: "https://placehold.co/800x400?text=Safety",
  },
  {
    id: 3,
    title: "Cost Reduction with Alternative Chemicals",
    excerpt:
      "Learn how to reduce production costs by switching to alternative chemical solutions.",
    content: "Full content about cost reduction...",
    date: "2023-10-25",
    image: "https://placehold.co/800x400?text=Cost+Reduction",
  },
];
