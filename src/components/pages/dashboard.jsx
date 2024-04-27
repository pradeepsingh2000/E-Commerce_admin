import React, { useEffect } from "react";
import Barchart from "./barchart";
import "./dashboard.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import GroupsIcon from "@mui/icons-material/Groups";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { getAllDashboardDetail, getCountOfOrderByMonth } from "../../services/Products/ProductsApi";
import { useState } from "react";


export default function DashBoard() {
const [totalProducts,setTotalProducts] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [totalCustomer, setTotalCustomer] = useState();
  const [totalOrders,setTotalOrders] = useState();
  const [orderdata,setorderdata] = useState([]);

  const getAllInfo = async() =>{
    const data = await getAllDashboardDetail()
    setTotalProducts(data.data.products)
    setTotalRevenue(data.data.totalRevenue)
    setTotalCustomer(data.data.customer)
    setTotalOrders(data.data.order)
  }
  const getsetorderdata = async() =>{
    const data = await getCountOfOrderByMonth()
    console.log(data,'the getCountOfOrderByMonth')
    const resultArray = Array(12).fill(0);
    data.data.forEach(item => {
      const monthIndex = item.month - 1;  // Adjust for zero-based indexing
      resultArray[monthIndex] = item.count;
    });
    console.log(resultArray,'resultArray')
    setorderdata(resultArray)

  }
  useEffect(() =>{
    getAllInfo()
    getsetorderdata()
  },[])

  return (
    <div className="container">
      <div className="row mt-4">
        <div className=" col m-1 card">
          <div className="title">
          
              <LocalMallIcon  color="primary" fontSize="large" />
           
            <p className="title-text">Total Products</p>
            <p className="percent"></p>
          </div>
          <div className="data">
            <p>{totalProducts}</p>
          </div>
        </div>

        <div className=" col m-1 card">
          <div className="title">
           
              <GroupsIcon  color="primary" fontSize="large" />
        
            <p className="title-text">Total Customers</p>
            <p className="percent"></p>
          </div>
          <div className="data">
            <p>{totalCustomer}</p>
          </div>
        </div>
        <div className=" col m-1 card">
          <div className="title">
          
              <BorderColorIcon  color="primary" fontSize="large" />
           
            <p className="title-text">Total Orders</p>
          </div>
          <div className="data">
            <p>{totalOrders}</p>
          </div>
        </div>

        <div className=" col m-1 card ">
          <div className="title">
          
              <CurrencyRupeeIcon color="primary"  fontSize="large"   />
         
            <p className="title-text">Total Revenue</p>
          </div>
          <div className="data">
            <p>{totalRevenue}</p>
          </div>
        </div>
      </div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<h1>Order's</h1>
</div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    
      {
        orderdata.length ? 
        <Barchart orderdatas={orderdata} />
        : <h1>Loading</h1>
      }

    </div>
    
    </div>
  );
}
