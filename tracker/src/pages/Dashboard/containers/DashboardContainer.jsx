import React, { useContext } from "react";
import ReactECharts from "echarts-for-react";
import { SalesContext } from "../context/SalesContext";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {DndContext , closestCenter} from "@dnd-kit/core"

import {
  SortableContext,arrayMove,rectSortingStrategy,useSortable
} from "@dnd-kit/sortable"

import {CSS} from "@dnd-kit/utilities"
import DashboardComponent from "../components/Dashboard";

function SortableItem({id,children}){
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,

  }=useSortable({id});

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  cursor: "grab",
};

return (
  <div ref = {setNodeRef} style= {style} {...attributes} {...listeners}>
    {children}
  </div>
)

}

export default function DashboardContainer() {
  const { tableData } = useContext(SalesContext);
  const [cityOrder, setCityOrder] = useState([]);



  const graphData = {};
  const cities = [];
  const companiesSet = new Set();
  tableData.forEach((item) => {
    const { city, company, sales } = item;

    if (!graphData[city]) {
      graphData[city] = {};
      cities.push(city);
    }

    if (graphData[city][company]) {
      graphData[city][company] += Number(sales);
    } else {
      companiesSet.add(company);
      graphData[city][company] = Number(sales);
    }
  });

  // const cities = Object.keys(graphData);
  const companies = [...companiesSet];
  // const companies = [...new Set(tableData.map((item) => item.company))];


  useEffect(()=>{
     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
     const users = JSON.parse(localStorage.getItem("users")) || [];

     if(!currentUser) return ;

      if(currentUser.role =="admin"){
        const adminOrder= JSON.parse(localStorage.getItem("adminCityOrder"))|| cities;
        setCityOrder(adminOrder);

        if(!localStorage.getItem("adminCityOrder")){
          localStorage.setItem(
            "adminCityOrder",
            JSON.stringify(cities)
          );
        }
        return
  
      }

      
     const userIndex = users.findIndex((u)=>u.email === currentUser.email);

     if(userIndex === -1) return ;

     const user = users[userIndex];

     if(!user.cityOrder){
      user.cityOrder = cities;

      users[userIndex] = user;
      localStorage.setItem("users", JSON.stringify(users));
      setCityOrder(cities);
     }
     else if(user.cityOrder.length > 0 ){
      setCityOrder(user.cityOrder);
     }
     else{
      setCityOrder(cities);
     }

  },[tableData]);



const handleDragEnd = (event)=>{
  const {active, over } = event ;

  if(!over) return 

  if(active.id !== over.id ){
    setCityOrder((items)=>{
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser.role === "admin") {
        localStorage.setItem(
          "adminCityOrder",
          JSON.stringify(newOrder)
        );
        return newOrder;
      }else{
        const users = JSON.parse(localStorage.getItem("users")) || [];


      const updatedUsers = users.map((user)=>{
        if(user.email === currentUser.email){
          return {...user, cityOrder: newOrder};
        }
        return user;
      })

      localStorage.setItem("users",JSON.stringify(updatedUsers));


      localStorage.setItem(
        "currentUser",
        JSON.stringify({...currentUser, cityOrder: newOrder
        })
      );
      return newOrder;
      }

      
    })
  }

  
}

  // Series  =>company inside cities
  const series = companies.map((company) => ({
    name: company,
    type: "bar",
    barGap: 0,
    emphasis: {
      focus: "series",
    },
    data: cities.map((city) => graphData[city][company] || 0),
  }));
const displayCities = cityOrder.length?cityOrder:cities;
  const option = {
    title: {
      text: "Sales Report",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: companies,
      bottom: 0,
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: displayCities,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };
 
  return (

     <Dashboard handleDragEnd={handleDragEnd}> </Dashboard>

  );
}





