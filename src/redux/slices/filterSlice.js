import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  category: 'all',
  sortBy: 'default',
  categories: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.category = 'all';
      state.sortBy = 'default';
    },
  },
});

export const { setSearchQuery, setCategory, setSortBy, setCategories, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;

// Selectors
export const selectFilters = (state) => state.filters;