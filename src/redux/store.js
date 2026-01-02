import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import filterReducer from './slices/filterSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});