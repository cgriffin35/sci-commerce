import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface CategoriesState {
  categories: {
    category: string;
  },
  loading: boolean,
  error: boolean
}

// Initial State
const initialState = {
  categories: [],
  loading: true,
  error: true
}

//Action
export const fetchCategories = createAsyncThunk('fetchCategories', async ()=> {
  try {
    const response = await axios.get('/api/categories')
    const categories = await response.data

    return categories;
  } catch (error) {
    console.log(error)
  }
})

// Slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
  }
})

//Selectors

//Exports
