import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrder, updateOrder } from './orderAPI';

const initialState ={
  orders:[],
  status:'idle',
  error:null,
  currentOrder: null,
  totalOrders:0,
}
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (data) => {
    const response = await createOrder(data);
    return response;
  }
)

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async () => {
    const response = await fetchAllOrder();
    return response;
  }
)
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async(update)=>{
    const response = await updateOrder(update);
    const obj = await response.json();
    return obj;
  }
)
const orderSlice = createSlice({
  name:'order',
  initialState,
  reducers:{
    resetOrder: (state)=>{
      state.currentOrder = null;
    }
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
      .addCase(fetchAllOrdersAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.orders = action.payload;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchAllOrdersAsync.rejected,(state,action)=>{
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(updateOrderAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.currentOrder = action.payload;
      })
      .addCase(updateOrderAsync.rejected,(state,action)=>{
        state.status = 'idle';
        state.error = action.error.message;
      })
  }
})

export default orderSlice.reducer;
export const selectOrders = (state) => state.orders;
export const selectOrderStatus = (state) => state.order && state.order.currentOrder;
export const resetOrder = orderSlice.actions.resetOrder;
export const selectTotalOrders = (state) => state.orders.totalOrders;