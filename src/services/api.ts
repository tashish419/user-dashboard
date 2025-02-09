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
  const response = await api.post("/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); 
  }
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post("/register", { email, password });
  return response.data;
};


export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};


export const logout = () => {
  localStorage.removeItem("token"); 
};

export default api;
