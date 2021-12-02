import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductsState {
  products:{
    id: number,
    name: string,
    description: string,
    price: number,
    category: string,
    pics: string | undefined,
  } [],
  loading: boolean,
  error: false,
}

// Initial State
const initialState: ProductsState = {
  products : [],
  loading: true,
  error: false,
};

//Action
export const fetchAllProducts = createAsyncThunk('fetchAllProducts', async ()=> {
  try {
    const response = await axios.get('/api/products');
    const products = await response.data;
    return products;
  } catch(error) {
    console.log(error)
  }
})

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(fetchAllProducts.pending, (state: { loading: boolean; error: boolean; }) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchAllProducts.fulfilled, (state: { products: any; loading: boolean; error: boolean; }, action: { payload: any; }) => {
      state.products = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(fetchAllProducts.rejected, (state: { loading: boolean; error: boolean; }) => {
      state.loading = false;
      state.error = true;
    })
  }
})

//Selectors
export const productsSelector = (state: any) => state.products;

//Exports
export default productSlice.reducer;
