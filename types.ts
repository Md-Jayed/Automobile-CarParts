
export interface Product {
  id: string;
  name: string;
  partNumber: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  rating: number;
  reviewsCount: number;
  condition: 'New' | 'Refurbished' | 'Used';
  availability: 'In Stock' | 'Pre-order' | 'Special Order';
  images: string[];
  description: string;
  specifications: Record<string, string>;
  compatibility: {
    make: string[];
    model: string[];
    yearRange: [number, number];
  };
  difficulty: 'Easy' | 'Moderate' | 'Pro';
  isOEM: boolean;
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  engine?: string;
  trim?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  make?: string;
  model?: string;
  year?: number;
  category?: string;
  condition?: string[];
  priceRange?: [number, number];
  isOEM?: boolean;
}
