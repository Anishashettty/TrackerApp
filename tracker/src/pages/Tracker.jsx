// import React, { useContext,useEffect } from "react";
// import { useState } from "react";

// import { SalesContext } from "../context/SalesContext";
// import Button from "@mui/material/Button";
// import { TextField, MenuItem, Box } from "@mui/material";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const initialState = {
//   city: "",
//   company: "",
//   model: "",
//   sales: "",
// };
// import { Pagination, Stack } from "@mui/material";

// export default function Tracker() {
//   // const [city, setCity] = useState("");
//   // const [company, setCompany] = useState("");
//   // const [model, setModel] = useState("");
//   // const [sales, setSales] = useState("");

//   const [data, seTableRowata] = useState({ ...initialState });

//   const { tableData, setTableData } = useContext(SalesContext);

//   const [editId, setEditId] = useState(null);

//   const [page, setPage] = useState(1);
//   const rowsPerPage = 5;

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };
//   useEffect(() => {
//     if ((page - 1) * rowsPerPage >= tableData.length && page > 1) {
//       setPage(page - 1);
//     }
//   }, [tableData]);

  

//   function handleChange(e) {
//     const { name, value } = e.target;

//     seTableRowata({
//       ...data,
//       [name]: value,
//     });
//   }

//   function handleData() {
//     const { city, company, model, sales } = data;

//     if (!city || !company || !model || !sales) {
//       alert("please fill the details...");
//     } else {
//       const existingIndex = tableData.findIndex(
//         (item) =>
//           item.city == city && item.company == company && item.model == model
//       );

//       if (existingIndex !== -1) {
//         const updatedData = [...tableData];
//         updatedData[existingIndex].sales =
//           Number(updatedData[existingIndex].sales) + Number(sales);
//         setTableData(updatedData);
//       } else {
//         const newRow = {
//           id: Date.now(),
//           ...data,
//         };

//         setTableData([...tableData, newRow]);
//       }
//       seTableRowata({ ...initialState });
//       setPage(1);
//     }
//   }
//   function deleteRow(id) {
//     const updatedList = tableData.filter((item) => item.id !== id);
//     setTableData(updatedList);
//   }

//   // edit sales part
//   function handleSave() {
//     const updatedList = tableData.map((item) =>
//       item.id === editId ? { ...item, ...data } : item
//     );
//     setTableData(updatedList);
//     setEditId(null);
//     seTableRowata(initialState);
//   }

//   function editSales(item) {
//     seTableRowata(item);
//     setEditId(item.id);
//   }

//   // total sales

//   const totalSales = tableData.reduce((total, item) => {
//     return total + Number(item.sales);
//   }, 0);

//   return (
//     <Box
//       sx={{
//         width: "80%",
//         margin: "50px auto",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           gap: 2,
//           mb: 2,
//         }}
//       >
//         {/* City */}
//         <TextField
//           select
//           label="Select City"
//           name="city"
//           value={data.city}
//           onChange={handleChange}
//           fullWidth
//         >
//           <MenuItem value="">Select city</MenuItem>
//           <MenuItem value="mangalore">Mangalore</MenuItem>
//           <MenuItem value="udupi">Udupi</MenuItem>
//           <MenuItem value="bengalore">Bangalore</MenuItem>
//           <MenuItem value="chennai">Chennai</MenuItem>
//         </TextField>

//         {/* Company */}
//         <TextField
//           select
//           label="Select Company"
//           name="company"
//           value={data.company}
//           onChange={handleChange}
//           fullWidth
//         >
//           <MenuItem value="">Select company</MenuItem>
//           <MenuItem value="Hyundai">Hyundai</MenuItem>
//           <MenuItem value="Renault">Renault</MenuItem>
//           <MenuItem value="KIA">KIA</MenuItem>
//         </TextField>

//         {/* Model */}
//         <TextField
//           label="Enter Model"
//           name="model"
//           value={data.model}
//           onChange={handleChange}
//           fullWidth
//         />

//         {/* Sales */}
//         <TextField
//           label="Enter Sales"
//           type="number"
//           name="sales"
//           value={data.sales}
//           onChange={handleChange}
//           fullWidth
//         />
//       </Box>
//       {/* <button onClick={handleData}>add</button> */}
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
//         <Button onClick={handleData} variant="contained">
//           ADD
//         </Button>
//       </Box>

//   {/* =========Table=========== */}
//       <TableContainer
//         component={Paper}
//         // sx={{
//         //   mt: 3,
//         //   width: "80%",
//         //   margin: "auto",
//         //   overflowX: "hidden",
//         // }}
//       >
//         <Table >
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#838282" }}>
//               <TableCell sx={{color: "white"}}> <b>City</b> </TableCell>
//               <TableCell sx={{color: "white"}}> <b>Company</b> </TableCell>
//               <TableCell sx={{color: "white"}}> <b>Model</b>  </TableCell>
//               <TableCell sx={{color: "white"}}> <b>Sales</b> </TableCell>
//               <TableCell sx={{color: "white"}}> <b>Remove</b> </TableCell>
//               <TableCell sx={{color: "white"}}> <b>Edit</b>  </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {tableData
//               .slice((page - 1) * rowsPerPage, page * rowsPerPage)
//               .map((item) => (
//                 <TableRow
//                   key={item.id}
//                   sx={{
//                     "&:hover": {
//                       backgroundColor: "#e3f2fd",
//                     },
//                   }}
//                 >
//                   <TableCell>{item.city}</TableCell>
//                   <TableCell>{item.company}</TableCell>
//                   <TableCell>{item.model}</TableCell>

//                   {/* Sales */}
//                   <TableCell>
//                     {editId === item.id ? (
//                       <TextField
//                         type="number"
//                         name="sales"
//                         value={data.sales}
//                         onChange={handleChange}
//                         size="small"
//                       />
//                     ) : (
//                       item.sales
//                     )}
//                   </TableCell>

//                   {/* Delete */}
//                   <TableCell>
//                     <Button
//                       color="error"
//                       variant="outlined"
//                       onClick={() => deleteRow(item.id)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>

//                   {/* Edit / Save */}
//                   <TableCell>
//                     {editId === item.id ? (
//                       <Button
//                         variant="contained"
//                         color="success"
//                         onClick={handleSave}
//                       >
//                         Save
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="outlined"
//                         onClick={() => editSales(item)}
//                       >
//                         Edit
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}

//             {/* Total Row */}
//             <TableRow>
//               <TableCell colSpan={3}>
//                 <b>Total Sales</b>
//               </TableCell>
//               <TableCell>
//                 <b>{totalSales}</b>
//               </TableCell>
//               <TableCell />
//               <TableCell />
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <Pagination
//             count={Math.ceil(tableData.length / rowsPerPage)}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//           />
//         </Box>
//     </Box>
//   );
// }



import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { TextField, MenuItem, Box } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Pagination } from "@mui/material";

import {
  getTracker,
  createTracker,
  updateTracker,
  deleteTracker,
} from "../api/trackerApi";

const initialState = {
  city: "",
  company: "",
  model: "",
  sales: "",
};

export default function Tracker() {
  const [data, setData] = useState(initialState);
  const [tableData, setTableData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // ================= FETCH =================
  useEffect(() => {
    fetchTracker();
  }, []);

  async function fetchTracker() {
    try {
      const res = await getTracker();
      setTableData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // ======== PAGINATION Fix ===========
  useEffect(() => {
    if ((page - 1) * rowsPerPage >= tableData.length && page > 1) {
      setPage(page - 1);
    }
  }, [tableData]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // ========== Input ==========
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  // ================= ADD =================
  async function handleData() {
    const { city, company, model, sales } = data;

    if (!city || !company || !model || !sales) {
      alert("Fill all fields");
      return;
    }

    try {
      await createTracker(data);
      fetchTracker();
      setData(initialState);
      setPage(1);
    } catch (err) {
      console.error(err);
    }
  }

  // ================= DELETE =================
  async function handleDelete(id) {
    try {
      await deleteTracker(id);
      fetchTracker();
    } catch (err) {
      console.error(err);
    }
  }

  // ================= EDIT =================
  function handleEdit(item) {
    setData(item);
    setEditId(item._id);
  }

  // ================= SAVE =================
  async function handleSave() {
    try {
      await updateTracker(editId, data);
      fetchTracker();
      setEditId(null);
      setData(initialState);
    } catch (err) {
      console.error(err);
    }
  }

  // ================= TOTAL =================
  const totalSales = tableData.reduce((total, item) => {
    return total + Number(item.sales);
  }, 0);

  return (
    <Box sx={{ width: "80%", margin: "50px auto" }}>
      
      {/* FORM */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField select label="City" name="city" value={data.city} onChange={handleChange} fullWidth>
          <MenuItem value="">Select city</MenuItem>
          <MenuItem value="mangalore">Mangalore</MenuItem>
          <MenuItem value="udupi">Udupi</MenuItem>
          <MenuItem value="bengalore">Bangalore</MenuItem>
          <MenuItem value="chennai">Chennai</MenuItem>
        </TextField>

        <TextField select label="Company" name="company" value={data.company} onChange={handleChange} fullWidth>
          <MenuItem value="">Select company</MenuItem>
          <MenuItem value="Hyundai">Hyundai</MenuItem>
          <MenuItem value="Renault">Renault</MenuItem>
          <MenuItem value="KIA">KIA</MenuItem>
        </TextField>

        <TextField label="Model" name="model" value={data.model} onChange={handleChange} fullWidth />

        <TextField label="Sales" type="number" name="sales" value={data.sales} onChange={handleChange} fullWidth />
      </Box>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button variant="contained" onClick={handleData}>
          ADD
        </Button>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Sales</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.model}</TableCell>

                  <TableCell>
                    {editId === item._id ? (
                      <TextField
                        type="number"
                        name="sales"
                        value={data.sales}
                        onChange={handleChange}
                        size="small"
                      />
                    ) : (
                      item.sales
                    )}
                  </TableCell>

                  <TableCell>
                    <Button color="error" onClick={() => handleDelete(item._id)}>
                      Delete
                    </Button>
                  </TableCell>

                  <TableCell>
                    {editId === item._id ? (
                      <Button onClick={handleSave}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEdit(item)}>Edit</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}

            {/* TOTAL */}
            <TableRow>
              <TableCell colSpan={3}><b>Total</b></TableCell>
              <TableCell><b>{totalSales}</b></TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(tableData.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>

    </Box>
  );
}
