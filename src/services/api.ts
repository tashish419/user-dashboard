import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Login failed" };
  }
};


export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/register", { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Registration failed" };
  }
};


export const getUsers = async (page: number = 1) => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  } catch (error: any) {
    console.error("Get Users Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Failed to fetch users" };
  }
};


export const logout = () => {
  localStorage.removeItem("token"); 
};

export default api;
