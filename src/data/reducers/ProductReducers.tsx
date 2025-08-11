// reduxStore/reducers/productSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Product, ProductsState, SelectedProductState } from '../../interfaces/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import productsJson from './ProductsList.json';

interface intiProducts {
  productsState: ProductsState;
  selectedProductState: SelectedProductState;
}

const initialState: intiProducts = {
  productsState: {
    products: [],
    status: 'idle',
    error: null,
  },
  selectedProductState: {
    product: null,
    status: 'idle',
    error: null,
  },
};

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (_, thunkAPI) => {
    try {
      return productsJson.products;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById', 
  async ( id: number, thunkAPI) => {
  try {
    const product = productsJson.products.find((product) => product.id === id);
    if(!product){
      return thunkAPI.rejectWithValue(`Product with id ${id} not found`);
    }
    return product;
  }catch (error){
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

export const getCategoryProducts = createAsyncThunk('products/getCategoryProducts',  
  async (cat: string, thunkAPI) => {
    try{
      const products = productsJson.products.filter((product)=>{product.category === cat});
      if(products.length === 0){
        return thunkAPI.rejectWithValue(`Products with category ${cat} are not found`);
      }
      return products;      
    } catch(error){
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }      
    }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
    .addCase(getAllProducts.pending, (state) => {
      state.productsState.status = 'loading';
    })
    .addCase(getAllProducts.rejected, (state, action)=>{
      state.productsState.status = 'failed';
      state.productsState.error = action.error.message;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.productsState.status = 'succeeded';
      state.productsState.products = action.payload;
    })
    .addCase(getProductById.pending, (state) => {
      state.selectedProductState.status = "loading";
    })
    .addCase(getProductById.rejected, (state, action)=>{
      state.selectedProductState.status = 'failed';
      state.selectedProductState.error = action.error.message;
    })
    .addCase(getProductById.fulfilled, (state, action) => {
      state.selectedProductState.status = 'succeeded';
      state.selectedProductState.product = action.payload;
    })
    .addCase(getCategoryProducts.pending, (state)=>{
      state.productsState.status = 'loading';
    })
    .addCase(getCategoryProducts.rejected, (state, action)=>{
      state.productsState.status = 'failed';
      state.productsState.error = action.error.message;
    })
    .addCase(getCategoryProducts.fulfilled, (state, action) => {
      state.productsState.status = 'succeeded';
      state.productsState.products = action.payload;
    })
  },
});

export default productSlice.reducer;
