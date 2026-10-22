export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "apparel" | "footwear" | "accessories" | "tech" | "living";
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: "BESTSELLER" | "NEW DROP" | "SALE" | "LIMITED";
  description: string;
  features: string[];
  inStock: boolean;
  stockLeft?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Category {
  id: string;
  title: string;
  itemCount: number;
  image: string;
  description: string;
  featured?: boolean;
}
