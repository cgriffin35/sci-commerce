import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserInputs {
  uid?: number
  firstName?: string,
  lastName?: string,
  email: string,
  password: string,
  password2?: string
}
interface UserState {
  user: any,
  loading: boolean,
  error: boolean
}

// Initial State
const initialState:UserState = {
  user: {},
  loading: true,
  error: false,
}

//Action
export const createUser = createAsyncThunk('registerUser', async ({firstName, lastName, email, password, password2}:UserInputs) => {
  try {
    const response = await axios.post('/api/users/register', {
      firstName,
      lastName,
      email,
      password,
      password2
    })
    const user = await response.data;

    return user;
  } catch(err) {
    console.log(err);
  }
});

export const logUserIn = createAsyncThunk('logUserIn', async ({email, password}:UserInputs)=>{
  try {
    const response = await axios.post('/api/users/login', {email, password})
    const user = await response.data

    return user;
  } catch(err) { 
    console.log(err);
  }
});

export const fetchUser = createAsyncThunk('getUser', async ()=>{
  try {
    const response = await axios.get('/api/users/')
    const user = await response.data

    return user;
  } catch (error) {
    console.log(error);
  }
})

export const logUserOut = createAsyncThunk('logUserOut', async ()=>{
  try {
    const response = await axios.get('/api/users/logout');
    const results = await response.data;

    return results
  } catch (error) {
    console.log(error);
  }
})

// Slice
const usersSlice = createSlice({
  name:"users",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state:any) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(createUser.fulfilled, (state:any, action:any) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(createUser.rejected, (state:any) => {
      state.loading = false;
      state.error = true;
    })
    
    builder.addCase(fetchUser.pending, (state:any) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchUser.fulfilled, (state:any, action:any) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(fetchUser.rejected, (state:any) => {
      state.loading = false;
      state.error = true;
    })

    builder.addCase(logUserIn.pending, (state:any) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(logUserIn.fulfilled, (state:any, action:any) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(logUserIn.rejected, (state:any) => {
      state.loading = false;
      state.error = true;
    })

    builder.addCase(logUserOut.pending, (state:any) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(logUserOut.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      state.user ={};
      state.loading = false;
      state.error = false;
    })
    builder.addCase(logUserOut.rejected, (state:any) => {
      state.loading = false;
      state.error = true;
    })
  }
})

//Selectors
export const userSelector = (state:any) => state.user;

//Exports
export default usersSlice.reducer;