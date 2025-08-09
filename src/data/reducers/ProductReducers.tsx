// reduxStore/reducers/productSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../interfaces/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import productsJson from './ProductsList.json';

interface intiProducts {
  staticData: Product[];
  selectedProduct: Product | null; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: intiProducts = {
  staticData: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
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

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
    .addCase(getAllProducts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getAllProducts.rejected, (state, action)=>{
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.staticData = action.payload;
    })
    .addCase(getProductById.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getProductById.rejected, (state, action)=>{
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(getProductById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.selectedProduct = action.payload;
    })
  },
});

export default productSlice.reducer;
