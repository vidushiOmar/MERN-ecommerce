import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItem, fetchItemsByUserId ,resetCart,updateItem} from './cartAPI';

const initialState = {
  value: 0,
  items:[],
  state:'idle'
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (items) => {
    const response = await addToCart(items);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (update) => {
    const response = await updateItem(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItem',
  async (itemId) => {
    const response = await deleteItem(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  
  reducers: {
    clearCart: (state) => {
      
      state.value = 0;
      state.items=[];
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
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[];
      });
  },
});

export const { clearCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartStatus=(state)=>state.cart.status;
export default cartSlice.reducer;
