import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/ProductSlice.js';
import authReducer from '../features/auth/authSlice.js';
import cartReducer from '../features/cart/CartSlice.js';

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;