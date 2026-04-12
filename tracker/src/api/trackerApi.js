import api from "./axios";

// GET
export const getTracker = () => api.get("/tracker");

// ADD
export const createTracker = (data) => api.post("/tracker", data);

// UPDATE
export const updateTracker = (id, data) =>
  api.put(`/tracker/${id}`, data);

// DELETE
export const deleteTracker = (id) =>
  api.delete(`/tracker/${id}`);