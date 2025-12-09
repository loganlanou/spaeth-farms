export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  weight: string;
  category: 'steaks' | 'roasts' | 'ground' | 'bundles' | 'specialty';
  image: string;
  inStock: boolean;
  featured: boolean;
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
