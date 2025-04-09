import axios from "axios";

const API = axios.create({
  baseURL: "https://short-link-backend-three.vercel.app",
});

export const createShortLink = async (data) => {
  return await API.post("/link", data);
};

export const getDashboardStats = async () => {
  return await API.get("/dashboard");
};

export const getLinkAnalytics = async (id) => {
  return await API.get(`/dashboard/link/${id}`);
};

export const redirectToLink = async (id) => {
  return await API.get(`/link/${id}`);
};
