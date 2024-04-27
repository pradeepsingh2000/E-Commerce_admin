import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Products from "./components/pages/products";
import DashBoard from "./components/pages/dashboard";
import Orders from "./components/pages/orders";
import OrderDetail from "./components/pages/orderDetail";

function App() {
  return (
    <>
   
    
    <Header/>
      <Routes>
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/orderDetail/:id" element={<OrderDetail/>}/>
      </Routes>
    
    </>
  );
}

export default App;
