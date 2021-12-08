import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface UserInputs{
  products: any,
  userId: number,
  total: number,
}

// Initial State
const initialState = {
  purchases: [],
  loading: true,
  error: false,
}

//Action
export const fetchPurchases = createAsyncThunk('fetchPurchases', async (userId) => {
  try {
    const response = await axios.get('/api/purchases', {data:{userId}});
    const purchases = await response.data

    return purchases
  } catch (error) {
    console.log(error)
  }
})


export const newPurchase = createAsyncThunk('newPurchase', async ({products, userId, total}:UserInputs) => {
  try {
    const response = await axios.post('/api/purchases', {products, userId, total});
    const purchase = await response.data;

    return purchase;
  } catch (error) {
    console.log(error)
  }
})
// Slice
const purchasesSlice = createSlice({
  name:'purchases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPurchases.pending, (state:any)=>{
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchPurchases.fulfilled, (state:any, action:any)=>{
      state.purchases=action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(fetchPurchases.rejected, (state:any)=>{
      state.loading = false;
      state.error = true;
    })

    builder.addCase(newPurchase.pending, (state:any)=>{
      state.loading = true;
      state.error = false;
    })
    builder.addCase(newPurchase.fulfilled, (state:any, action:any)=>{
      state.purchases=state.purchases.push(action.payload)
      state.loading = false;
      state.error = false;
    })
    builder.addCase(newPurchase.rejected, (state:any)=>{
      state.loading = false;
      state.error = true;
    })

  }
})
//Selectors
export const purchasesSelector = (state:any) => state.purchases

//Exports
export default purchasesSlice.reducer