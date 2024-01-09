import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddToCart } from './CartAPI';

const initialState = {
  value: 0,
  items:[],
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (items) => {
    const response = await AddToCart(items);
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
  },
});

export const { increment } = productSlice.actions;

export const selectAllCart = (state) => state.cart.items;

export default productSlice.reducer;