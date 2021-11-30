import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductsState {
  id: number,
  name: string,
  description: string,
  price: number,
  category: string,
  pics: string,
}

// Initial State
const initialState: ProductsState[] | null = [];

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts (state, action) {
      
    }
  }
})
//Selectors

