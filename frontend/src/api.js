import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export const ping = () => api.get("/transactions"); // simple test hits your route
export const getTransactions = () => api.get("/transactions");
export const createTransaction = (data) => api.post("/transactions", data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export default api;
