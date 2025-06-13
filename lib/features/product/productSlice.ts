import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  b2bPrice?: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
  specifications?: Record<string, string>;
}

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCategory: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.featuredProducts = action.payload.filter((p: Product) => p.featured);
        state.categories = [...new Set(action.payload.map((p: Product) => p.category))];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedCategory, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;