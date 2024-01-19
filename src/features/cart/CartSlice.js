import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddToCart, DeleteCart, FetchCartByUserId, UpdateCart, resetCart } from './CartAPI';

const initialState = {
  cartItems:[],
  value: 0,
  status: 'idle', // Add the 'status' property and initialize it to 'idle'
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await AddToCart(item);
    return response;
  }
);
export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (update) => {
    return  UpdateCart(update);
  }
);

export const deleteCartItemAsync = createAsyncThunk('cart/deleteCartItem', async (id) => {
  const response = await DeleteCart(id);
  return response;
});

export const fetchCartByUserIdAsync = createAsyncThunk(
  'cart/fetchCartByUserId',
    async (userId) => {
      const response = await FetchCartByUserId(userId);
    return response;
    }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    return response;
  }
)

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
        if (state.cartItems) {
          state.cartItems.push(action.payload);
        } else {
          state.cartItems = [action.payload];
        }
      })   
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = action.payload;
      })
      .addCase(fetchCartByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.cartItems.findIndex(item => item.id === action.payload.id);
        state.cartItems[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        const index = state.cartItems.findIndex(item => item.id === action.payload.id);
        state.cartItems.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.cartItems = [];
      })
  },
});

export const { increment } = productSlice.actions;

export const selectAllCart = (state) => state.cart.cartItems;
export const selectCartById = (state) => state.cart.value;
export default productSlice.reducer;