import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//Initial State
let initialState = {
  favorites: [],
  loading: true,
  error: false,
}

//Action
export const fetchFavorites = createAsyncThunk("fetchFavorites", async (userId) => {})

//Slice

//Selectors

//Exports
