// import React, { createContext, useState ,useEffect} from 'react'

// export const SalesContext=createContext();

// export const  Salesprovider=({children})=>{
//     const [tableData, setTableData] = useState(() => {
//         const storedData = localStorage.getItem("salesData");
//         return storedData ? JSON.parse(storedData) : [];
//       });
    
//       useEffect(() => {
//         localStorage.setItem("salesData", JSON.stringify(tableData));
//       }, [tableData]);



//     return (
//         <SalesContext.Provider value={{tableData,setTableData}}>
//             {children}
//         </SalesContext.Provider>
//     )
// }