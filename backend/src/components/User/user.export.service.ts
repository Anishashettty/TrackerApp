// const ExcelJS = require('exceljs');

// exports.generateUserExcel = async (users) => {
// 	const workbook = new ExcelJS.Workbook();
// 	const worksheet = workbook.addWorksheet('Users');
// 	// Define columns
// 	worksheet.columns = [
// 		{header: "Name", key: "name" , width: 20},
// 		{header: "Age", key: "age" , width: 10},
// 		{header: "Email", key: "email" , width: 30},
// 		{header: "Address", key: "address" , width: 30},
// 		{header: "Role", key: "role" , width: 15},
// 		{header: "Tracker", key: "tracker" , width: 15},
// 		{header: "Dashboard", key: "dashboard" , width: 15},
// 	];

// 	// Add rows
// 	(users || []).forEach((user)=>{
// 		worksheet.addRow({
// 			name: user.name,
// 			age: user.age,
// 			email: user.email,
// 			address: user.address,
// 			role: user.role,
// 			tracker: user.permissions?.includes("tracker") ? "Yes" : "No",
// 			dashboard: user.permissions?.includes("dashboard") ? "Yes" : "No",
// 		});
// 	});
// 	return workbook;
// }


import ExcelJS from "exceljs";

//  Define user type for export
interface ExportUser {
  name: string;
  age: number;
  email: string;
  address: string;
  role: string;
  permissions?: string[];
}

// Return type is Workbook
export const generateUserExcel = async (
  users: ExportUser[]
): Promise<ExcelJS.Workbook> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Users");

  // Define columns
  worksheet.columns = [
    { header: "Name", key: "name", width: 20 },
    { header: "Age", key: "age", width: 10 },
    { header: "Email", key: "email", width: 30 },
    { header: "Address", key: "address", width: 30 },
    { header: "Role", key: "role", width: 15 },
    { header: "Tracker", key: "tracker", width: 15 },
    { header: "Dashboard", key: "dashboard", width: 15 },
  ];

  // Add rows
  (users || []).forEach((user) => {
    worksheet.addRow({
      name: user.name,
      age: user.age,
      email: user.email,
      address: user.address,
      role: user.role,
      tracker: user.permissions?.includes("tracker") ? "Yes" : "No",
      dashboard: user.permissions?.includes("dashboard") ? "Yes" : "No",
    });
  });

  return workbook;
};