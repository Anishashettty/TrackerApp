import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Snackbar, Alert } from "@mui/material";
import { exportUsers } from "../api/userApi";
import { importUsers } from "../api/userApi";
import {
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  MenuItem,
} from "@mui/material";

import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  togglePermission,
} from "../api/userApi";

const initialState = {
  name: "",
  age: "",
  email: "",
  address: "",
  role: "",
};

export default function Users() {
  const [user, setUser] = useState(initialState);
  const [userData, setUserData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filterRole, setFilterRole] = useState("user");
  const { currentUser } = useContext(AuthContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // ================= FETCH USERS =================

  async function fetchUsers() {
    try {
      const res = await getUsers();
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= HANDLE INPUT =================
  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  // ======== ADD USER =================
  async function handleData() {
    const { name, age, email, address, role } = user;

    if (!name || !age || !email || !address || !role) {
      return;
    }

    try {
      await createUser(user);
      fetchUsers();
      setUser(initialState);

      setOpenSnackbar(true); //  show success
    } catch (err) {
      console.error(err);
    }
  }
  // ================= DELETE ========
  async function handleDelete(id) {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  }

  // ======= EDIT =======
  function handleEdit(user) {
    setUser(user);
    setEditId(user._id);
  }

  // ===== SAVE ===========
  async function handleSave() {
    try {
      await updateUser(editId, user);
      fetchUsers();
      setEditId(null);
      setUser(initialState);
    } catch (err) {
      console.error(err);
    }
  }

  // ============== TOGGLE =========
  async function handleToggle(id, type) {
    try {
      await togglePermission(id, type);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  }

  // handle export
  async function handleExport() {
    try {
      const res = await exportUsers();
      //creating a blob  from response data
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.xlsx");

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
  
    const formdata = new FormData();
    formdata.append("file", file);
  
    try {
      const res = await importUsers(formdata);
  
      fetchUsers();
      alert(res.data.message);
      console.log(res.data.failedUsers);
  
    } catch (err) {
      console.error(err);
      alert("Import failed: " + (err.response?.data?.message || err.message));
      
    } finally {
      e.target.value = null; 
    }
  }
  

  return (
    <Box sx={{ width: "90%", margin: "40px auto" }}>
      {/* ===== FORM SECTION ===== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Age"
            name="age"
            value={user.age}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Role"
            name="role"
            value={user.role}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Button
            variant="contained"
            fullWidth
            sx={{ height: "56px" }}
            onClick={handleData}
          >
            Add
          </Button>
        </Box>
      </Paper>

      {/* ===== FILTER SECTION ===== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <h2 style={{ margin: 0 }}>User Management</h2>

        <input
          type="file"
          accept=".xlsx"
          style={{ display: "none" }}
          id="importFile"
          onChange={handleImport}
        />

        <Button
          variant="contained"
          onClick={() => document.getElementById("importFile").click()}
        >
          Import
        </Button>

        <Button variant="contained" onClick={handleExport}>
          Export
        </Button>
        <TextField
          select
          label="Filter"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          size="small"
          sx={{ width: 150 }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </TextField>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Age</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Address</b>
              </TableCell>
              <TableCell>
                <b>Role</b>
              </TableCell>
              <TableCell>
                <b>Edit</b>
              </TableCell>
              <TableCell>
                <b>Delete</b>
              </TableCell>
              {filterRole !== "admin" && (
                <TableCell>
                  <b>Tracker</b>
                </TableCell>
              )}
              {filterRole !== "admin" && (
                <TableCell>
                  <b>Dashboard</b>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {userData
              .filter((item) => {
                if (item.email === currentUser?.email) return false;
                if (item.role === "super-admin") return false;
                //if (filterRole == "all") return true;
                return item.role === filterRole;
              })
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>

                  <TableCell>
                    {editId === item._id ? (
                      <TextField
                        size="small"
                        value={user.email}
                        name="email"
                        onChange={handleChange}
                      />
                    ) : (
                      item.email
                    )}
                  </TableCell>

                  <TableCell>{item.address}</TableCell>

                  <TableCell>
                    <span
                      style={{ color: item.role === "admin" ? "red" : "green" }}
                    >
                      {item.role}
                    </span>
                  </TableCell>

                  <TableCell>
                    {editId === item._id ? (
                      <Button onClick={handleSave}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEdit(item)}>Edit</Button>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      disabled={
                        !(
                          currentUser?.role === "super-admin" ||
                          (currentUser?.role === "admin" &&
                            item.role === "user")
                        )
                      }
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>

                  {item.role === "user" && (
                    <TableCell>
                      <Checkbox
                        checked={item.permissions?.includes("tracker")}
                        onChange={() => handleToggle(item._id, "tracker")}
                      />
                    </TableCell>
                  )}

                  {item.role == "user" && (
                    <TableCell>
                      <Checkbox
                        checked={item.permissions?.includes("dashboard")}
                        onChange={() => handleToggle(item._id, "dashboard")}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%", fontWeight: "bold" }}
        >
          User added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
