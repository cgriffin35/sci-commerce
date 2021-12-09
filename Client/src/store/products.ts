import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number,
  name: string,
  description: string,
  price: number,
  category: string,
  pics: string | undefined,
}

interface ProductsState {
  products:Product[],
  product:Product | {},
  loading: boolean,
  error: false,
}

// Initial State
const initialState: ProductsState = {
  products : [],
  product:{},
  loading: true,
  error: false,
};

//Action
export const fetchAllProducts = createAsyncThunk('fetchAllProducts', async ()=> {
  try {
    const response = await axios.get('api/products');
    const products = await response.data;
    return products;
  } catch(error) {
    console.log(error)
  }
})

export const fetchProductsByCategory = createAsyncThunk('fetchProductByCategory', async(category:string)=>{
  try {
    const response = await axios.get(`api/products/category/${category}`)
    const products = await response.data;

    return products;
  } catch (error) {
    console.log(error)
  }
})

export const fetchProductById = createAsyncThunk('fetchProductById', async (id:any)=>{
  try {
    const response = await axios.get(`api/products/${id}`);
    const product = await response.data;

    return product[0];
  } catch (error) {
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

    builder.addCase(fetchProductsByCategory.pending, (state: { loading: boolean; error: boolean; }) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchProductsByCategory.fulfilled, (state: { products: any; loading: boolean; error: boolean; }, action: { payload: any; }) => {
      state.products = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(fetchProductsByCategory.rejected, (state: { loading: boolean; error: boolean; }) => {
      state.loading = false;
      state.error = true;
    })

    builder.addCase(fetchProductById.pending, (state: { loading: boolean; error: boolean; }) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchProductById.fulfilled, (state: { product: any; loading: boolean; error: boolean; }, action: { payload: any; }) => {
      state.product = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(fetchProductById.rejected, (state: { loading: boolean; error: boolean; }) => {
      state.loading = false;
      state.error = true;
    })
  }
})

//Selectors
export const productsSelector = (state: any) => state.products;

//Exports
export default productSlice.reducer;
