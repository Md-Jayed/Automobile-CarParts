
import { Product } from './types';

export const CATEGORIES = [
  'Engine', 'Brakes', 'Suspension', 'Drivetrain', 'Electrical', 'Body', 'Interior', 'Maintenance'
];

export const MAKES = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Tesla'];

export const SERIES: Record<string, string[]> = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Supra', 'Tacoma'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'NSX', 'Fit'],
  'Ford': ['F-150', 'Mustang', 'Explorer', 'Focus'],
  'BMW': ['3 Series', '5 Series', 'M3', 'X5'],
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ceramic Brake Pad Set',
    partNumber: 'BP-44521-X',
    brand: 'StopSafe',
    category: 'Brakes',
    subCategory: 'Brake Pads',
    price: 89.99,
    rating: 4.8,
    reviewsCount: 124,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1552069333-5d6683c31672?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'High-performance ceramic brake pads for superior stopping power and low dust.',
    specifications: { 'Material': 'Ceramic', 'Position': 'Front', 'Warranty': '2 Years' },
    compatibility: { make: ['Toyota', 'Honda'], model: ['Camry', 'Civic'], yearRange: [2015, 2024] },
    difficulty: 'Moderate',
    isOEM: false
  },
  {
    id: '2',
    name: 'OEM Synthetic Oil Filter',
    partNumber: 'OF-9901',
    brand: 'Genuine Toyota',
    category: 'Maintenance',
    subCategory: 'Filters',
    price: 12.50,
    rating: 4.9,
    reviewsCount: 850,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1615906659123-516d30208ef0?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Original equipment manufacturer oil filter for maximum engine protection.',
    specifications: { 'Type': 'Spin-on', 'Media': 'Synthetic Blend' },
    compatibility: { make: ['Toyota'], model: ['Camry', 'Corolla', 'RAV4'], yearRange: [2010, 2025] },
    difficulty: 'Easy',
    isOEM: true
  },
  {
    id: '3',
    name: 'Performance Coilovers',
    partNumber: 'CO-772-S',
    brand: 'TrackSpec',
    category: 'Suspension',
    subCategory: 'Coilovers',
    price: 1299.00,
    rating: 4.7,
    reviewsCount: 42,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1598460670068-07e594d6932e?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Adjustable damping and ride height for track and street performance.',
    specifications: { 'Spring Rate': '8k/6k', 'Adjustment': '32-Way' },
    compatibility: { make: ['Honda', 'BMW', 'Audi'], model: ['Civic', '3 Series', 'A4'], yearRange: [2012, 2022] },
    difficulty: 'Pro',
    isOEM: false
  },
  {
    id: '4',
    name: 'LED Headlight Conversion Kit',
    partNumber: 'HK-LED-H11',
    brand: 'LumenPro',
    category: 'Electrical',
    subCategory: 'Lighting',
    price: 159.95,
    rating: 4.5,
    reviewsCount: 230,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://plus.unsplash.com/premium_photo-1661964291917-b20c2648fac6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1562629824-14050c633c0d?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Crystal clear white LED headlights with easy plug-and-play installation.',
    specifications: { 'Lumens': '12,000 LM', 'Color': '6000K' },
    compatibility: { make: ['Toyota', 'Honda', 'Ford', 'Chevrolet'], model: ['Camry', 'Civic', 'F-150', 'Silverado'], yearRange: [2010, 2023] },
    difficulty: 'Moderate',
    isOEM: false
  },
  {
    id: '5',
    name: 'Cold Air Intake System',
    partNumber: 'CAI-V6-TP',
    brand: 'FlowForce',
    category: 'Engine',
    subCategory: 'Intake',
    price: 349.00,
    rating: 4.6,
    reviewsCount: 88,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Increase horsepower and torque with improved airflow to your engine.',
    specifications: { 'Gain': '+12 HP', 'Filter': 'Washable Cotton' },
    compatibility: { make: ['Ford', 'Chevrolet'], model: ['Mustang', 'Camaro'], yearRange: [2015, 2024] },
    difficulty: 'Moderate',
    isOEM: false
  },
  {
    id: '6',
    name: 'Titanium Exhaust Cat-Back',
    partNumber: 'EX-TITAN-S',
    brand: 'Apex Racing',
    category: 'Drivetrain',
    subCategory: 'Exhaust',
    price: 2150.00,
    rating: 4.9,
    reviewsCount: 15,
    condition: 'New',
    availability: 'Special Order',
    images: [
      'https://plus.unsplash.com/premium_photo-1673208484517-deeab27359b4?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Ultra-lightweight titanium exhaust for the ultimate sound and performance.',
    specifications: { 'Weight': '18 lbs', 'Tip': 'Blue Burnt Titanium' },
    compatibility: { make: ['BMW', 'Audi'], model: ['M3', 'RS5'], yearRange: [2018, 2025] },
    difficulty: 'Pro',
    isOEM: false
  },
  {
    id: '7',
    name: 'Heavy Duty Alternator',
    partNumber: 'ALT-200A',
    brand: 'PowerStart',
    category: 'Electrical',
    subCategory: 'Alternators',
    price: 245.50,
    rating: 4.4,
    reviewsCount: 56,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1710130168142-d2ec07ed8434?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1542362567-b05261b60f44?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'High-output alternator for vehicles with heavy electrical loads.',
    specifications: { 'Amperage': '200A', 'Voltage': '14.4V' },
    compatibility: { make: ['Ford', 'Chevrolet'], model: ['F-150', 'Silverado'], yearRange: [2008, 2020] },
    difficulty: 'Moderate',
    isOEM: false
  },
  {
    id: '8',
    name: 'Carbon Fiber Mirror Caps',
    partNumber: 'CF-MC-BMW',
    brand: 'AeroStyle',
    category: 'Body',
    subCategory: 'Exterior Trim',
    price: 189.00,
    rating: 4.7,
    reviewsCount: 102,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://plus.unsplash.com/premium_photo-1664299397754-9e433381039d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Genuine carbon fiber mirror covers for a sporty, aggressive look.',
    specifications: { 'Material': '3K Twill Carbon Fiber', 'Finish': 'UV Gloss' },
    compatibility: { make: ['BMW'], model: ['3 Series', '4 Series', 'M3'], yearRange: [2012, 2023] },
    difficulty: 'Easy',
    isOEM: false
  },
  {
    id: '9',
    name: 'All-Weather Floor Mats',
    partNumber: 'MAT-221',
    brand: 'WeatherArmor',
    category: 'Interior',
    subCategory: 'Floor Mats',
    price: 149.00,
    rating: 4.9,
    reviewsCount: 1240,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1556448851-9359658faa54?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Custom-fit floor protection designed to trap water, dirt, and debris.',
    specifications: { 'Material': 'TPE', 'Color': 'Black' },
    compatibility: { make: ['Tesla', 'Toyota', 'Honda'], model: ['Model 3', 'Camry', 'Civic'], yearRange: [2017, 2025] },
    difficulty: 'Easy',
    isOEM: false
  },
  {
    id: '10',
    name: 'Cross-Drilled Rotors (Pair)',
    partNumber: 'ROT-CDR-350',
    brand: 'StopSafe',
    category: 'Brakes',
    subCategory: 'Rotors',
    price: 210.00,
    rating: 4.8,
    reviewsCount: 44,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1654742967873-0bfb6cd0e719?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Improved cooling and wet weather performance for heavy braking scenarios.',
    specifications: { 'Diameter': '350mm', 'Pattern': 'Cross-Drilled' },
    compatibility: { make: ['Toyota', 'Honda'], model: ['Supra', 'NSX'], yearRange: [1993, 2005] },
    difficulty: 'Moderate',
    isOEM: false
  },
  {
    id: '11',
    name: 'Iridium Spark Plug Set',
    partNumber: 'SPK-IR-8',
    brand: 'NGK Platinum',
    category: 'Maintenance',
    subCategory: 'Ignition',
    price: 64.99,
    rating: 4.9,
    reviewsCount: 340,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1635773102421-912d6ce92e27?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Long-lasting iridium spark plugs for optimal combustion and efficiency.',
    specifications: { 'Core': 'Iridium', 'Gap': '1.1mm' },
    compatibility: { make: ['Toyota', 'Honda', 'Nissan'], model: ['Camry', 'Civic', 'Altima'], yearRange: [2000, 2024] },
    difficulty: 'Moderate',
    isOEM: true
  },
  {
    id: '12',
    name: 'Anti-Roll Bar Kit',
    partNumber: 'ARB-SWAY-ST',
    brand: 'TrackSpec',
    category: 'Suspension',
    subCategory: 'Sway Bars',
    price: 450.00,
    rating: 4.7,
    reviewsCount: 29,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1598460670068-07e594d6932e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Reduce body roll during cornering for a more balanced and predictable ride.',
    specifications: { 'Front': '28mm', 'Rear': '22mm' },
    compatibility: { make: ['BMW', 'Audi'], model: ['3 Series', 'A4'], yearRange: [2015, 2023] },
    difficulty: 'Moderate',
    isOEM: false
  },
  {
    id: '13',
    name: 'Cabin Air Filter (Activated Carbon)',
    partNumber: 'CAF-AC-2022',
    brand: 'Genuine Honda',
    category: 'Maintenance',
    subCategory: 'Filters',
    price: 28.00,
    rating: 4.8,
    reviewsCount: 156,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Eliminates odors and pollutants from your vehicle cabin.',
    specifications: { 'Type': 'Carbon Infused', 'Fitment': 'Direct' },
    compatibility: { make: ['Honda'], model: ['Civic', 'Accord', 'CR-V'], yearRange: [2016, 2024] },
    difficulty: 'Easy',
    isOEM: true
  },
  {
    id: '14',
    name: 'Aluminum Racing Radiator',
    partNumber: 'RAD-ALU-PRO',
    brand: 'KoyoCool',
    category: 'Engine',
    subCategory: 'Cooling',
    price: 495.00,
    rating: 4.9,
    reviewsCount: 38,
    condition: 'New',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1504817342169-4159aa43b097?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'All-aluminum radiator with 30% more cooling capacity than OEM.',
    specifications: { 'Core Thickness': '52mm', 'Material': 'Aircraft Grade Al' },
    compatibility: { make: ['Toyota', 'Nissan'], model: ['Supra', '370Z'], yearRange: [1990, 2022] },
    difficulty: 'Moderate',
    isOEM: false
  }
];
