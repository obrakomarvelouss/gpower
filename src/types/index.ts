export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  full_description: string;
  price: number;
  category: string;
  image_url: string;
  specifications: Record<string, string>;
  stock: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
