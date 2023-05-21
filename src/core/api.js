import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  console.log("APIerror", error.message);
  toast.error(error.message);
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export const auth = {
  login: async (username, password) => {
    console.log("username, password", username, password)
    const response = await api.post("/login/", {username, password});
    return response.data;
  }
}

export const boardsAPI = {
  getAll: async () => {
    const response = await api.get("/v1/projects");
    return response.data;
  },
  create: async (data) => {
    // remove tasks key in columns
    data.columns = data.columns.map(({name, id}) => ({name, id}));
    const response = await api.post("/v1/projects", data);
    return response.data;
  },
  update: async (id, data) => {
    // remove tasks key in columns
    data.columns = data.columns.map(({name, id}) => ({name, id}));
    const response = await api.patch(`/v1/projects/${id}`, data);
    console.log("response", response)
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/v1/projects/${id}`);
  },
  getLeaderboard: async (id) => {
    const response = await api.get(`/v1/leaderboard/${id}`);
    return response.data;
  },
};

export const tasksAPI = {
  create: async (data) => {
    const response = await api.post("/v1/tasks", data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.patch(`/v1/tasks/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/v1/tasks/${id}`);
  },
};

export const subtasksAPI = {
  update: async (id, data) => {
    const response = await api.patch(`/v1/subtasks/${id}`, data);
    return response.data;
  },
};

export const userApi = {
  getAll: async () => {
    const response = await api.get("/v1/users");
    return response.data;
  },
};