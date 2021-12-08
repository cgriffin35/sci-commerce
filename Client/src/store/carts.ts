import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface userInput {
  cartId?: number,
  userId?: number,
  productId?: number,
  quantity?: number,
  variants?:any | null,
}

// Initial State
const initialState = {
  carts: [],
  loading: true,
  error: false
}

//Action
export const fetchCarts = createAsyncThunk('fetchCarts', async ({userId}:{userId:number}) => {
  try {
    const response = await axios.get(`/api/carts/${userId}`)
    const carts = await response.data;

    return carts
  } catch (error) {
    console.log(error)
  }
})

export const addToCart = createAsyncThunk('addToCart', async ({userId, productId, quantity, variants}:userInput) => {
  try {
    const response = await axios.post('/api/carts/', {userId, productId, quantity, variants})
    const cart = await response.data

    return cart;
  } catch (error) {
    console.log(error)
  }
})

export const removeFromCart = createAsyncThunk('removeFromCart', async ({cartId}:userInput)=>{
  try {
    await axios.delete(`/api/carts/${cartId}`)
    return cartId
  } catch (error) {
    console.log(error)
  }
})

export const updateCart = createAsyncThunk('updateCart', async({cartId, quantity}:userInput) => {
  try {
    const response = await axios.put(`/api/carts/${cartId}`, {quantity})
    const updatedCart = await response.data

    return updatedCart
  } catch (error) {
    console.log(error);
  }
})

export const clearCart = createAsyncThunk('clearCart', async ({userId}:userInput)=>{
  try {
    const response = await axios.delete(`/api/carts/clear/${userId}`);
    const result = await response

    return result;
  } catch (error) {
    console.log(error)
  }
})

// Slice
const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {}, 
  extraReducers: (builder)=>{
    builder.addCase(fetchCarts.pending, (state)=>{
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCarts.fulfilled, (state, action)=>{
      state.carts = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchCarts.rejected, (state)=>{
      state.loading = false;
      state.error = true;
    });

    builder.addCase(addToCart.pending, (state)=>{
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addToCart.fulfilled, (state:any, action:any)=>{
      state.loading = false;
      state.error = false;
    });
    builder.addCase(addToCart.rejected, (state)=>{
      state.loading = false;
      state.error = true;
    });

    builder.addCase(removeFromCart.pending, (state)=>{
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeFromCart.fulfilled, (state:any, action:any)=>{
      state.carts = state.carts.filter((item:any) => item.id !== action.payload[0])
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeFromCart.rejected, (state)=>{
      state.loading = false;
      state.error = true;
    });

    builder.addCase(updateCart.pending, (state)=>{
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateCart.fulfilled, (state:any, action:any)=>{
      if(state.carts){
        const cartIndex = state.carts.findIndex((item:any) => item.id === action.payload[0].id)
        state.carts[cartIndex] = action.payload[0];
      }
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateCart.rejected, (state)=>{
      state.loading = false;
      state.error = true;
    });

    builder.addCase(clearCart.pending, (state)=>{
      state.loading = true;
      state.error = false;
    });
    builder.addCase(clearCart.fulfilled, (state:any)=>{
      state.carts = [];
      state.loading = false;
      state.error = false;
    });
    builder.addCase(clearCart.rejected, (state)=>{
      state.loading = false;
      state.error = true;
    });
  }
})

//Selectors
export const cartsSelector = (state:any) => state.carts

//Exports
export default cartsSlice.reducer;