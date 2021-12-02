import {configureStore} from '@reduxjs/toolkit';

import productReducer from './products'
import popularsReducer from './populars'

const store = configureStore({
  reducer: {
    products: productReducer,
    populars: popularsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
