import React from "react";
import "../styles/styles.css"

export default function DashboardComponent ({handleDragEnd}){
    return (

        <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
   
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
           <ReactECharts option={option} style={{ height: "400px" }} />
         </Paper>
   
         {/* ----2nd graph logic ------- */}
         {/* <Grid container spacing={3}> */}
         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
           <SortableContext items={cityOrder} strategy={rectSortingStrategy}>
             <Grid container spacing={3}>
             {cityOrder.map((city) => {
             const companies = Object.keys(graphData[city]);
   
             const cityOption = {
               title: {
                 text: `${city} Sales`,
                 left: "center",
               },
               tooltip: {
                 trigger: "axis",
               },
               xAxis: {
                 type: "category",
                 data: companies,
               },
               yAxis: {
                 type: "value",
               },
               series: [
                 {
                   name: "Sales",
                   type: "bar",
                   data: companies.map(
                     (company) => graphData[city][company]
                   ),
                 },
               ],
             };
   
             return (
               <Grid size={6} key={city}>
                 <SortableItem id={city}>
                 <Paper elevation={3} sx={{ p: 2 }}>
                   
                   <ReactECharts option={cityOption} style={{ height: "300px",width: "100%" }} />
                 </Paper>
                 </SortableItem>
              </Grid>
             );
           })}
             </Grid>
           </SortableContext>
         </DndContext>
         
        
       </Box>
   
     );
   
}