import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, getOrder } from './orderAPI';

const initialState ={
  orders:[],
  status:'idle',
  error:null,
  currentOrder: null,
}
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (data) => {
    const response = await createOrder(data);
    return response;
  }
)
export const getOrderAsync = createAsyncThunk(
  'order/getOrder',
  async (id) => {
    const response = await getOrder(id);
    return response;
  }
)

const orderSlice = createSlice({
  name:'order',
  initialState,
  reducers:{
    increment:(state)=>{
      state.value += 1;
    },
  },
  extraReducers:(builder)=>{
    builder
      .addCase(createOrderAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        console.log("action payload:",action.payload);
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected,(state,action)=>{
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(getOrderAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(getOrderAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        console.log("action payload:",action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(getOrderAsync.rejected,(state,action)=>{
        state.status = 'idle';
        state.error = action.error.message;
      })
  }
})

export default orderSlice.reducer;
export const selectOrder = (state) => state.orders;
export const selectOrderStatus = (state) => state.order && state.order.currentOrder;
