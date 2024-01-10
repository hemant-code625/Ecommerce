import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddToCart, FetchCartByUserId, UpdateCart } from './CartAPI';

const initialState = {
  items:[],
  value: 0,
  status: 'idle', // Add the 'status' property and initialize it to 'idle'
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (items) => {
    const response = await AddToCart(items);
    return response;
  }
);
export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (update) => {
    return  UpdateCart(update);
  }
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  'cart/fetchCartByUserId',
    async (userId) => {
      console.log(response)
      const response = await FetchCartByUserId(userId);
    return response.data;
    }
);

export const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
  },
});

export const { increment } = productSlice.actions;

export const selectAllCart = (state) => state.cart.items;
export const selectCartById = (state) => state.cart.value;
export default productSlice.reducer;