import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';


const initialState = {
  loggedInUserToken:null,
  status:'idle',
  error:null,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (logInInfo,{rejectWithValue}) => {
    try{
      const response = await checkUser(logInInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    }catch(err){
      
      return rejectWithValue(err);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async (userData) => {
    const response = await signOut(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  
  reducers: {
    clearUser: (state) => {
      
      state.loggedInUserToken=null;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken= action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken= action.payload;
      })
      .addCase(checkUserAsync.rejected, (state,action) => {
        state.status='idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken= null;
      });
      
  },
});

export const {clearUser } = authSlice.actions;

export const selectloggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError=(state)=>state.auth.error;
export default authSlice.reducer;
