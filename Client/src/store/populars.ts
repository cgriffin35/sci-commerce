import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {productsSelector} from './products'


interface PopularsState {
  populars: {
    user_id: number,
    product_id: number,
    favorited_date: string,
  }[],
  loading: boolean,
  error: boolean
}

// Initial State
const initialState: PopularsState = {
  populars: [],
  loading: true,
  error: false
}

//Action
export const fetchPopulars = createAsyncThunk("getPopulars", async () => {
  try { 
    const response = await axios.get('/api/favorites/populars')
    const populars = await response.data;

    return populars
  } catch (error) {
    console.log(error);
  }
})

// Slice
const popularSlice = createSlice({
  name: 'populars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopulars.pending, (state)=>{
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchPopulars.fulfilled, (state, action)=>{
      state.populars = action.payload;
      state.loading = false;
      state.error = false
    })
    builder.addCase(fetchPopulars.rejected, (state)=>{
      state.loading = false;
      state.error = true;
    })
  }
})

//Selectors
export const popularsSelector = (state: any) => state.populars;

export const popularProductsSelector = (state: any) => {
  const popularsList = popularsSelector(state).populars;
  const productsList = productsSelector(state).products;

  return popularsList.map((item:any) => {
    const productIndex: number = productsList.findIndex((e:any) => e.id === item.product_id);
    const product = productsList[productIndex]
    const {popularity} = item;
    return {...product, popularity}
  })
}

//Exports
export default popularSlice.reducer