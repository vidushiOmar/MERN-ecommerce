import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder } from './ordersAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:null,
  totalOrders:0
};

export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'orders/fetchAllOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'orders/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  
  reducers: {
    clearOrders: (state) => {
      
      state.orders=[];

    },
    resetOrder:(state)=>{
      state.currentOrder=null;
    }
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload)
        state.currentOrder=action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders;
        state.totalOrders=action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.orders.findIndex(order=>order.id===action.payload.id);
        state.orders[index]=action.payload;
      });
  },
});

export const { resetOrder} = ordersSlice.actions;

export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrders = (state) => state.orders.orders;
export const selectTotalOrders = (state) => state.orders.totalOrders;
export default ordersSlice.reducer;
