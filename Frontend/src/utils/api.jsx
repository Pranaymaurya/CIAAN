import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

export const postsAPI = {
  createPost: (postData) => api.post('/posts', postData),
  getAllPosts: () => api.get('/posts'),
  getUserPosts: (userId) => api.get(`/posts/user/${userId}`),
};

export const usersAPI = {
  getUser: (userId) => api.get(`/users/${userId}`),
};

export default api;