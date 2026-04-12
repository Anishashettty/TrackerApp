// const { parentPort, workerData } = require("worker_threads");

// const { users, targetCount } = workerData;

// let batchSize = 5000;
// let batch = [];

// for (let i = 0; i < targetCount; i++) {
//   const user = users[i % users.length];

//   batch.push({
//     name: user.name,
//     age: user.age,
//     email: user.email,
//     address: user.address,
//     role: user.role,
//     tracker: user.permissions?.includes("tracker") ? "Yes" : "No",
//     dashboard: user.permissions?.includes("dashboard") ? "Yes" : "No",
//   });

//   // Send batch to main thread
//   if (batch.length === batchSize) {
//     parentPort.postMessage(batch);
//     batch = [];
//   }
// }

// // send remaining
// if (batch.length > 0) {
//   parentPort.postMessage(batch);
// }

// // done signal
// parentPort.postMessage("DONE");



const { parentPort, workerData } = require("worker_threads");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

(async () => {
  try {
    const { users, targetCount } = workerData;

    // create file path
    const filePath = path.join(
      __dirname,
      `users-${Date.now()}.xlsx`
    );

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: filePath,
    });

    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Age", key: "age", width: 10 },
      { header: "Email", key: "email", width: 30 },
      { header: "Address", key: "address", width: 30 },
      { header: "Role", key: "role", width: 15 },
      { header: "Tracker", key: "tracker", width: 15 },
      { header: "Dashboard", key: "dashboard", width: 15 },
    ];

    // 
    for (let i = 0; i < targetCount; i++) {
      const user = users[i % users.length];

      worksheet
        .addRow({
          name: user.name,
          age: user.age,
          email: user.email,
          address: user.address,
          role: user.role,
          tracker: user.permissions?.includes("tracker") ? "Yes" : "No",
          dashboard: user.permissions?.includes("dashboard") ? "Yes" : "No",
        })
        .commit();

      
      if (i % 5000 === 0) {
        await new Promise((resolve) => setImmediate(resolve));
      }
    }

    await workbook.commit();

      
    parentPort.postMessage(filePath);

  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
})();