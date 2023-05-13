import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
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