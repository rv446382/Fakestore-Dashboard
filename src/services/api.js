import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Products
export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchCategories = () => api.get('/products/categories');