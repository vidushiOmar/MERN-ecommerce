import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchProductById, fetchProductsByFilters, updateProduct } from './productAPI';

const initialState = {
  value:0,
  products:[],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product-list/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product-list/fetchProductsByFilters',
  async ({filter,sort,pagination,admin}) => {
    // console.log("filter:",filter,"sort:",sort);
    const response = await fetchProductsByFilters({filter,sort,pagination,admin});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product-list/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product-list/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product-list/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product-list/createProduct',
  async (p) => {
    const response = await createProduct(p);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product-list/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: 'product-list',
  initialState,
  
  reducers: {
    clearProducts: (state) => {
      state.value=0;
      state.products=[];
      state.selectedProduct=null;
      state.brands=[];
      state.categories=[];
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload;
        
          
        
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems=action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
        // console.log(state.selectedProduct)
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
        
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // const index=state.products.findIndex(item=>item.id===action.payload.id)
        state.products=action.payload;
        state.selectedProduct=action.payload;
      });
  },
});
 
export const { clearProducts } = ProductSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectProductById=(state)=>state.product.selectedProduct;
export const selectCategories=(state)=>state.product.categories;
export const selectBrands=(state)=>state.product.brands;
export const selectProductListStatus=(state)=>state.product.status;
export const selectTotalItems = (state) => state.product.totalItems;
export default ProductSlice.reducer;
