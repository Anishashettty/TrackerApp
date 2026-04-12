const userService = require("./user.services");
const { generateUserExcel } = require("./user.export.service");
const ExcelJS = require("exceljs");
const path = require("path");
const { Worker } = require("worker_threads");
const fs = require("fs");
// Add user
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get users
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Toggle permission
exports.togglePermission = async (req, res) => {
  try {
    const { type } = req.body;
    const user = await userService.togglePermission(req.params.id, type);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// // Export users logic

// exports.exportUsers = async (req, res) => {
//   try {
//     const users = await userService.getUsers();

//     if(!users.length){
//       return res.status(400).json({ message: "No users to export" });
//     }

//     const TARGET_COUNT = 100000;

//     //const workbook = await generateUserExcel(users);

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );

//     res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
//     res.flushHeaders(); 

//     const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res });
    
//     const worksheet = workbook.addWorksheet("Users");
//     worksheet.columns = [
//       { header: "Name", key: "name", width: 20 },
//       { header: "Age", key: "age", width: 10 },
//       { header: "Email", key: "email", width: 30 },
//       { header: "Address", key: "address", width: 30 },
//       { header: "Role", key: "role", width: 15 },
//       { header: "Tracker", key: "tracker", width: 15 },
//       { header: "Dashboard", key: "dashboard", width: 15 },
//     ];

//     //generate 1 lakh roes by repaeting users 
//     for(let i =0; i<TARGET_COUNT; i++){
//       const user = users[i % users.length];
//       worksheet.addRow({
//         name: user.name,
//         age: user.age,
//         email: user.email,
//         address: user.address,
//         role: user.role,
//         tracker: user.permissions?.includes("tracker") ? "Yes" : "No",
//         dashboard: user.permissions?.includes("dashboard") ? "Yes" : "No",
//       }).commit();
//     }

//     worksheet.commit(); // Finalize the workbook and send the response
//     await workbook.commit();


   
//   } catch (err) {
//     console.error("EXPORT ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };




// exports.exportUsers = async (req, res) => {
//   try {
//     const users = await userService.getUsers();

//     if (!users.length) {
//       return res.status(400).json({ message: "No users to export" });
//     }

//     const TARGET_COUNT = 100000; // 10 lakh

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );

//     res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
//     res.flushHeaders();

//     const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
//       stream: res,
//     });

//     const worksheet = workbook.addWorksheet("Users");

//     worksheet.columns = [
//       { header: "Name", key: "name", width: 20 },
//       { header: "Age", key: "age", width: 10 },
//       { header: "Email", key: "email", width: 30 },
//       { header: "Address", key: "address", width: 30 },
//       { header: "Role", key: "role", width: 15 },
//       { header: "Tracker", key: "tracker", width: 15 },
//       { header: "Dashboard", key: "dashboard", width: 15 },
//     ];

//     //  Create worker
//     const worker = new Worker(
//       path.join(__dirname, "worker.js"),
//       {
//         workerData: {
//           users,
//           targetCount: TARGET_COUNT,
//         },
//       }
//     );

//     // Receive data from worker
//     worker.on("message", async (data) => {
//       if (data === "DONE") {
//         worksheet.commit();
//         await workbook.commit();
//         return;
//       }

//       // write batch
//       data.forEach((row) => {
//         worksheet.addRow(row).commit();
//       });
//     });

//     worker.on("error", (err) => {
//       console.error("Worker Error:", err);
//       res.status(500).json({ message: err.message });
//     });

//     worker.on("exit", (code) => {
//       console.log("Worker exited:", code);
//     });

//   } catch (err) {
//     console.error("EXPORT ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };




//export users logic using worker thread
exports.exportUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    if (!users.length) {
      return res.status(400).json({ message: "No users to export" });
    }

    const worker = new Worker(
      path.join(__dirname, "worker.js"), 
      {
        workerData: {
          users,
          targetCount: 10,
        },
      }
    );

    worker.on("message", (data) => {
      // if worker sends error
      if (data?.error) {
        return res.status(500).json({ message: data.error });
      }

      const filePath = data;

      res.download(filePath, "users.xlsx", (err) => {
        if (err) {
          console.error("Download error:", err);
        }

        // delete file after download
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("File delete error:", unlinkErr);
          }
        });
      });
    });

    worker.on("error", (err) => {
      console.error("Worker Error:", err);
      res.status(500).json({ message: err.message });
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });

  } catch (err) {
    console.error("EXPORT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// Import users logic 
exports.importUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      return res.status(400).json({ message: "Invalid file format" });
    }

    const header = worksheet.getRow(1).values;

    if (
      header[1] !== "Name" ||
      header[2] !== "Age" ||
      header[3] !== "Email" ||
      header[4] !== "Address" ||
      header[5] !== "Role"
    ) {
      return res.status(400).json({
        message: "Invalid Excel format. Please use correct template.",
      });
    }

    const users = [];
    const failedUsers = [];

    const getCellValue = (cell) => {
      if (!cell) return "";

      if (typeof cell === "object") {
        return cell.text || cell.result || "";
      }

      return cell.toString().trim();
    };
    // ===== READ EXCEL =====
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const name = getCellValue(row.getCell(1).value);
      const age = Number(row.getCell(2).value);
      const email = getCellValue(row.getCell(3).value);
      const address = getCellValue(row.getCell(4).value);
      const role = getCellValue(row.getCell(5).value);
      const tracker = getCellValue(row.getCell(6).value);
const dashboard = getCellValue(row.getCell(7).value);
const permissions = [];

if (tracker.toLowerCase() === "yes") {
  permissions.push("tracker");
}

if (dashboard.toLowerCase() === "yes") {
  permissions.push("dashboard");
}
      // Basic validation
      if (!name || !email || !role || !address || !age) {
        failedUsers.push({
          email: email || `Row ${rowNumber}`,
          error: "Missing required fields",
        });
        return;
      }

      users.push({ name, age, email, address, role, permissions });
    });

    // ===== FAST INSERT (parallel) =====
    const results = await Promise.allSettled(
      users.map((user) => userService.createUser(user))
    );

    // ===== HANDLE RESULTS =====
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        failedUsers.push({
          email: users[index].email,
          error: result.reason.message,
        });
      }
    });

    // ===== FINAL RESPONSE =====
    return res.json({
      message:
        failedUsers.length > 0
          ? "Import completed with some failures"
          : "Users imported successfully",
      total: users.length,
      success: users.length - failedUsers.length,
      failed: failedUsers.length,
      failedUsers,
    });
  } catch (err) {
    console.error("IMPORT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
