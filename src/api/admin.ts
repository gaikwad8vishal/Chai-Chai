import axios from "axios";

// Base URL for your backend (env variable ya hardcoded)
const BASE_URL = "http://localhost:3000"

// Axios instance with default headers
const api = axios.create({
  baseURL: `${BASE_URL}/admin`, // Admin prefix yahan set kiya
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request via interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Functions

// ✅ Get Order Stats
export const getOrderStats = async () => {
  const response = await api.get("/order-stats");
  return response.data;
};

// ✅ Block/Unblock User
export const toggleUserBlock = async (userId:string) => {
  const response = await api.patch(`/users/block-unblock/${userId}`, {});
  return response.data;
};

// ✅ Update Order Status
export const updateOrderStatus = async (orderId:string, status:string) => {
  const response = await api.put("/update-status", { orderId, status });
  return response.data;
};

// ✅ Get All Users
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// ✅ Get All Orders
export const getAllOrders = async () => {
  const response = await api.get("/all-orders");
  return response.data.orders; // Assuming backend returns { orders: [...] }
};

// ✅ Get Customer Orders
export const getCustomerOrders = async (userId:string) => {
  const response = await api.get(`/orders/${userId}`);
  return response.data; // Assuming backend returns { userId, orders: [...] }
};

// ✅ Delete User
export const deleteUser = async (userId:string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};