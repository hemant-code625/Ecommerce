import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/ProductSlice.js';
import authReducer from '../features/auth/authSlice.js';
import cartReducer from '../features/cart/CartSlice.js';
import orderReducer from '../features/orders/orderSlice.js';

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    orders:orderReducer,
  },
});

export default store;