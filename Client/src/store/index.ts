import {configureStore} from '@reduxjs/toolkit';

import productReducer from './products'
import popularsReducer from './populars'
import categoriesReducer from './categories'
import usersReducer from './users'
import favoritesReducer from './favorites'
import cartsReducer from './carts'
import purchasesReducer from './purchases'

const store = configureStore({
  reducer: {
    products: productReducer,
    populars: popularsReducer,
    categories: categoriesReducer,
    user: usersReducer,
    favorites: favoritesReducer,
    carts: cartsReducer,
    purchases: purchasesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
