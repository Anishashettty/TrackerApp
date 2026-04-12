import api from "./axios";

// GET USERS
export const getUsers = () => api.get("/users");

// ADD USER
export const createUser = (data) => api.post("/users", data);

// DELETE USER
export const deleteUser = (id) => api.delete(`/users/${id}`);

// UPDATE USER
export const updateUser = (id, data) =>
  api.put(`/users/${id}`, data);

// TOGGLE PERMISSION
export const togglePermission = (id, type) =>
  api.patch(`/users/${id}/permissions`, { type });


// EXPORT USERS
export const exportUsers = async() => {
  return api.get("/users/export",{
    responseType: "blob",
  })
}

//import users
export const importUsers = (formData)=>
  api.post("/users/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

