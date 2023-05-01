import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./components/Login/Login";

import SupplierList from "./components/Supplier/SupplierList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewStock from "./components/Purchase/NewStock";
import NewSale from "./components/Sales/Sales";
import NewSupplier from "./components/Supplier/NewSupplier";
import InventoryList from "./components/Purchase/InventoryList";
import SalesList from "./components/Sales/SalesList";
import Signup from "./components/Signup/Signup";
import SideNav from "./components/SideNav/SideNav";

function App() {
  // const [token, setToken] = useState("")
  // var headers = new Headers();
  // headers.append('Content-Type', "Application/json");

  // var t = token;
  // headers.append("Authorization", "Token" + t);
  // var body = JSON.stringify(user);
  // const handleSubmit = () => {
  //   axios.post("http://192.168.4.9:8011/user/login/", {
  //     "email": "admin@gmail.com",
  //     "password": "admin"

  //   }).then(res => {
  //     console.log(res.data);
  //     setToken(res.data.token)
  //   })
  // }
  // const handleLogout = () => {

  //   // axios.get("http://192.168.4.9:8011/user/logout/",
  //   //   {
  //   //     "email":"admin@gmail.com",
  //   //     "password":"admin"
  //   //   }
  //   // )

  //   axios.get("http://192.168.4.9:8011/inventory/stock/",{
  //     "headers": {
  //       "Authorization": 'Token'+'f869b3d3306b2b353eb9dbaf537e818839aefe37',
  //       // f869b3d3306b2b353eb9dbaf537e818839aefe37
  //       'Content-Type': "Application/json"
  //     }
  //   })
  //     .then(res => {
  //       console.log(res.data);
  //     })
  // }
  return (
    <div className="App h-100">
      {/* <button onClick={(e) => handleSubmit(e)}>Login</button>
      <button onClick={(e) => handleLogout(e)}>Logout</button> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/newSupplier" element={<NewSupplier />} />
          <Route path="/supplierList" element={<SupplierList />} />
          <Route path="/newStock" element={<NewStock />} />
          <Route path="/newSale" element={<NewSale />} />
          <Route path="/inventoryList" element={<InventoryList />} />
          <Route path="/salesList" element={<SalesList/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/sidenav" element={<SideNav/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
