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
  "Water Treatment Chemicals",
  "Industrial Solvents",
  "Food Additives",
  "Textile Chemicals",
  "General Chemicals"
];

export const products: Product[] = Array.from({ length: 100 }, (_, i) => {
  const category = categories[i % categories.length] || "General Chemicals";
  return {
    id: i + 1,
    name: `${category} Product ${i + 1}`,
    category,
    description: `High quality ${category} for industrial use. Certified standard.`,
    price: Math.floor(Math.random() * 1000) + 100,
    image: `https://placehold.co/600x400?text=Product+${i + 1}`,
    specs: {
      "Purity": "99%",
      "Grade": "Industrial",
      "Packaging": "25kg Bag"
    }
  };
});

export const articles: Article[] = [
  {
    id: 1,
    title: "How to Choose the Right Water Treatment Chemicals",
    excerpt: "A comprehensive guide to selecting the best chemicals for your water treatment plant.",
    content: "Full content about water treatment...",
    date: "2023-10-15",
    image: "https://placehold.co/800x400?text=Water+Treatment"
  },
  {
    id: 2,
    title: "Safety Guidelines for Industrial Solvents",
    excerpt: "Essential safety tips for handling and storing industrial solvents.",
    content: "Full content about safety...",
    date: "2023-10-20",
    image: "https://placehold.co/800x400?text=Safety"
  },
  {
    id: 3,
    title: "Cost Reduction with Alternative Chemicals",
    excerpt: "Learn how to reduce production costs by switching to alternative chemical solutions.",
    content: "Full content about cost reduction...",
    date: "2023-10-25",
    image: "https://placehold.co/800x400?text=Cost+Reduction"
  }
];
