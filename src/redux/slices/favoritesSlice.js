import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const saveFavoritesToStorage = (favorites) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

const initialState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;
      if (!state.items.find(item => item.id === product.id)) {
        state.items.push(product);
        saveFavoritesToStorage(state.items);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveFavoritesToStorage(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage(state.items);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// Selectors
export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (state, productId) => 
  state.favorites.items.some(item => item.id === productId);