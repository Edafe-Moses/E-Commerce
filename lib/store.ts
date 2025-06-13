import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/product/productSlice';
import orderSlice from './features/order/orderSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productSlice,
    orders: orderSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;