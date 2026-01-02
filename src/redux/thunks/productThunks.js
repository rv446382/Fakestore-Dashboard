import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { setCategories } from '../slices/filterSlice';
import { setSelectedProduct } from '../slices/productSlice';

// Fetch all products
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.get(`/products/${id}`);
            dispatch(setSelectedProduct(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.get('/products/categories');
            dispatch(setCategories(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);