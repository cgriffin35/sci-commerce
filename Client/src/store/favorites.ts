import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface FavoritesInputs{
  userId: number,
  productId?: number
}
interface FavoritesState {
  favorites: FavoritesState[],
  loading: boolean,
  error: boolean,
}

//Initial State
let initialState: FavoritesState = {
  favorites: [],
  loading: true,
  error: false,
}

//Action
export const fetchFavorites = createAsyncThunk("fetchFavorites", async ({userId}: FavoritesInputs) => {
  try {
    const response = await axios.get('/api/favorites/', {
      data: {userId}
    })
    const favorites = await response.data

  return favorites
  } catch (error) {
    console.error(error)
  }
})

export const addFavorite = createAsyncThunk("addFavorite", async ({userId, productId}: FavoritesInputs) => {
  try {
    const response = await axios.get('/api/favorites/', {
      data: {userId, productId}
    })
    const favorites = await response.data

  return favorites
  } catch (error) {
    console.error(error)
  }
})

export const removeFavorite = createAsyncThunk("createFavorite", async({userId, productId}: FavoritesInputs) => {
  try {
    await axios.delete(`/api/favorites/`, {
      data: {userId, productId}
    })

    return productId;
  } catch (error) {
    console.log(error)
  }
})
//Slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state)=>{
      state.loading = true;
      state.error = false
    })
    builder.addCase(fetchFavorites.fulfilled, (state:any, action:any)=>{
      state.loading = false;
      state.error = false;
      state.favorites = action.payload;
    })
    builder.addCase(fetchFavorites.rejected, (state:any)=>{
      state.loading = false;
      state.error = true;
    })

    builder.addCase(addFavorite.pending, (state)=>{
      state.loading = true;
      state.error = false
    })
    builder.addCase(addFavorite.fulfilled, (state:any, action:any)=>{
      state.loading = false;
      state.error = false;
      state.favorites = state.favorites.push(action.payload);
    })
    builder.addCase(addFavorite.rejected, (state:any)=>{
      state.loading = false;
      state.error = true;
    })

    builder.addCase(removeFavorite.pending, (state)=>{
      state.loading = true;
      state.error = false
    })
    builder.addCase(removeFavorite.fulfilled, (state:any, action:any)=>{
      state.loading = false;
      state.error = false;
      state.favorites = state.favorites.filter((fav:any) => fav.productId !== action.payload)
    })
    builder.addCase(removeFavorite.rejected, (state:any)=>{
      state.loading = false;
      state.error = true;
    })
  }
})

//Selectors
export const favoritesSelector = (state:any) => state.favorites;

//Exports
export default favoritesSlice.reducer