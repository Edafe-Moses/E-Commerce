import { Product } from './features/product/productSlice';
import { Order } from './features/order/orderSlice';
import { User } from './features/auth/authSlice';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Laptop',
    description: 'High-performance laptop perfect for business and development work.',
    price: 1299.99,
    b2bPrice: 1099.99,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 50,
    featured: true,
    rating: 4.8,
    reviews: 124,
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Display': '15.6" Full HD',
    },
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with superior sound quality.',
    price: 299.99,
    b2bPrice: 249.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 100,
    featured: true,
    rating: 4.6,
    reviews: 89,
    specifications: {
      'Battery Life': '30 hours',
      'Noise Cancellation': 'Active',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
    },
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Advanced fitness and health tracking smartwatch with GPS.',
    price: 399.99,
    b2bPrice: 339.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 75,
    featured: false,
    rating: 4.5,
    reviews: 156,
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'GPS': 'Built-in',
      'Water Resistance': '50m',
    },
  },
  {
    id: '4',
    name: 'Office Chair',
    description: 'Ergonomic office chair designed for comfort during long work sessions.',
    price: 449.99,
    b2bPrice: 379.99,
    image: 'https://images.pexels.com/photos/586999/pexels-photo-586999.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Furniture',
    stock: 30,
    featured: true,
    rating: 4.7,
    reviews: 67,
    specifications: {
      'Material': 'Mesh back, fabric seat',
      'Adjustability': 'Height, armrests, tilt',
      'Weight Capacity': '300 lbs',
      'Warranty': '5 years',
    },
  },
  {
    id: '5',
    name: 'Standing Desk',
    description: 'Height-adjustable standing desk for a healthier work environment.',
    price: 699.99,
    b2bPrice: 599.99,
    image: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Furniture',
    stock: 25,
    featured: false,
    rating: 4.4,
    reviews: 43,
    specifications: {
      'Height Range': '28" - 47"',
      'Desktop Size': '60" x 30"',
      'Weight Capacity': '200 lbs',
      'Motor': 'Dual motor system',
    },
  },
  {
    id: '6',
    name: 'Coffee Maker',
    description: 'Premium automatic coffee maker with built-in grinder.',
    price: 249.99,
    b2bPrice: 199.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Kitchen',
    stock: 60,
    featured: false,
    rating: 4.3,
    reviews: 91,
    specifications: {
      'Capacity': '12 cups',
      'Grinder': 'Built-in burr grinder',
      'Programming': '24-hour programmable',
      'Auto-shutoff': '2 hours',
    },
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    accountType: 'B2C',
    isOnboarded: true,
  },
  {
    id: '2',
    email: 'customer@example.com',
    name: 'John Doe',
    role: 'customer',
    accountType: 'B2C',
    isOnboarded: true,
  },
  {
    id: '3',
    email: 'business@company.com',
    name: 'Jane Smith',
    role: 'customer',
    accountType: 'B2B',
    company: 'Tech Corp',
    isOnboarded: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      {
        id: '1',
        name: 'Professional Laptop',
        price: 1299.99,
        image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500',
        quantity: 1,
        category: 'Electronics',
      },
    ],
    total: 1299.99,
    status: 'delivered',
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
  },
  {
    id: '2',
    userId: '2',
    items: [
      {
        id: '2',
        name: 'Wireless Headphones',
        price: 299.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        quantity: 1,
        category: 'Electronics',
      },
      {
        id: '4',
        name: 'Office Chair',
        price: 449.99,
        image: 'https://images.pexels.com/photos/586999/pexels-photo-586999.jpeg?auto=compress&cs=tinysrgb&w=500',
        quantity: 1,
        category: 'Furniture',
      },
    ],
    total: 749.98,
    status: 'shipped',
    createdAt: '2024-01-20T14:15:00Z',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    trackingNumber: 'TRK987654321',
  },
];