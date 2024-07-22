import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/product-list/productSlice';
import cartReducer from '../features/cart/cartSlice'
import ordersReducer from '../features/orders/ordersSlice'
import userReducer from '../features/user/userSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product:productReducer,
    auth:authReducer,
    cart:cartReducer,
    orders:ordersReducer,
    user:userReducer,
  },
});
