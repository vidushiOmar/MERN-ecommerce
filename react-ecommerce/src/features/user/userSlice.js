import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchLoggedInUserOrders,fetchLoggedInUser,updateUser } from './userAPI';

const initialState = {
  userInfo: null,
  orders:[],
  status: 'idle',
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  
  reducers: {
    clearUser: (state) => {
      
      state.userInfo= null;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo=action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
        
      })
      .addCase(updateUserAsync.fulfilled, (state,action) => {
        state.status='idle';
        state.userInfo=action.payload;
        
      });
  },
});

export const {clearUser } = userSlice.actions;

export const selectUserOrders = (state) => state.user.orders;
export const selectUserInfo=(state)=> state.user.userInfo;
export default userSlice.reducer;
